import { TickerItemData } from "@/lib/data-types";
import { useEffect, useState } from "react";

const API_CRYPTO_PRICES_URL = 'http://localhost:3001/api/crypto-prices';
const INTERVAL = 5000;

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


export function useCryptoPrices() {
    const [prices, setPrices] = useState<TickerItemData[]>([]);

    const fetchCryptoPrices = async function () {
        const response = await fetch(API_CRYPTO_PRICES_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch crypto prices');
        }

        const data = await response.json();

        const prices = data.cryptoPrices.map((asset) => mapPrices(asset));

        setPrices(prices);
    }

    useEffect(() => {
        fetchCryptoPrices();

        const interval = setInterval(fetchCryptoPrices, INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return { prices };
}