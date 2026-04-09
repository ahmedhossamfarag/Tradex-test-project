import { TickerItemData } from "@/lib/data-types";
import "./TickerBar.css";
import TickerBarItem from "./TickerBarItem";


const generateDumyData = () => {
    return Array(10).fill(null).map((_, index) => {
        return {
            name: `Crypto ${index}`,
            crypto: "BTC",
            traditional: "USD",
            prices: [
                { time: 1, price: Math.random() * 10000 },
                { time: 2, price: Math.random() * 10000 },
                { time: 3, price: Math.random() * 10000 },
                { time: 4, price: Math.random() * 10000 },
                { time: 5, price: Math.random() * 10000 },
                { time: 6, price: Math.random() * 10000 },
                { time: 7, price: Math.random() * 10000 },
                { time: 8, price: Math.random() * 10000 },
                { time: 9, price: Math.random() * 10000 },
                { time: 10, price: Math.random() * 10000 },
                { time: 11, price: Math.random() * 10000 },
            ],
        }
    }
    )
}



const TickerBar = () => {
    const data: TickerItemData[] = generateDumyData()

    return (
        <div className="bg-[#0d1120] border-y border-white/[0.06] relative">
            <div className="flex animate-ticker">
                {data.map((item, index) => (
                    <TickerBarItem key={index} data={item} />
                ))}
            </div>
        </div>
    );
};

export default TickerBar;
