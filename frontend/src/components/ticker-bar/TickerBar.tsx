import { TickerItemData } from "@/lib/data-types";
import "./TickerBar.css";
import TickerBarItem from "./TickerBarItem";
import { useCryptoPrices } from "@/hooks/use-crypto-prices";



const TickerBar = () => {
    const { prices: data } = useCryptoPrices();

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
