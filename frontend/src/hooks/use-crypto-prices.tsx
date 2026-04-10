import { TickerItemData } from "@/lib/data-types";
import { useEffect, useState } from "react";

const API_CRYPTO_PRICES_URL = 'http://localhost:3001/api/crypto-prices';
const INTERVAL = 30000;

function mapPrices(cryptoAsset) {
    const prices = cryptoAsset.crypto_prices;
    const startTime = new Date(prices[0].time);
    const mappedPrices = prices.map((p) => ({
        ...p,
        time: Math.floor(((new Date(p.time)).getTime() - startTime.getTime()) / 1000)
    }));
    return {
        ...cryptoAsset,
        prices: mappedPrices
    }
}


async function createWSSClient(onMessage: (data) => void) {
    console.log('Creating WSS client...');
    const ws = new WebSocket('ws://localhost:3001');
    console.log('WSS connecting...');

    ws.addEventListener('error', console.error);

    ws.onopen = () => {
        console.log('connected');
    };

    ws.onclose = () => {
        console.log('disconnected');
    };

    ws.onmessage = function message(event) {
        const payload = event.data;
        const data = JSON.parse(payload)
        onMessage(data);
    };
}


export function useCryptoPrices() {
    const [prices, setPrices] = useState<TickerItemData[]>([]);

    const updatePrices = (data) => {
        const prices = data.cryptoPrices.map((asset) => mapPrices(asset));
        setPrices(prices);
    }

    const fetchCryptoPrices = async function () {
        const response = await fetch(API_CRYPTO_PRICES_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch crypto prices');
        }

        const data = await response.json();

        updatePrices(data);
    }

    useEffect(() => {
        createWSSClient(updatePrices);

        fetchCryptoPrices();

        const interval = setInterval(fetchCryptoPrices, INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return { prices };
}