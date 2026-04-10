import { TickerItemData } from "@/lib/data-types";
import HoverChart from "./HoverChart";


const TickerBarItem = ({ data }: { data: TickerItemData }) => {
    const { name, crypto, prices } = data
    const current_price = prices[prices.length - 1].price
  const start_price = prices[0].price
  const change_percent = (((current_price - start_price) / start_price) * 100);

    return (
        <div className="relative ticker-bar-item">
            <div className="flex items-center gap-2.5 px-8 py-4 whitespace-nowrap shrink-0 cursor-pointer">
                <span className="text-white/50 text-xs font-bold tracking-widest uppercase">
                    {crypto}
                </span>
                <span className="text-white font-bold text-sm">${current_price.toLocaleString()}</span>
                <div className={"flex items-center gap-0.5 text-xs font-semibold" + (change_percent > 0 ? ' text-green-400' : ' text-red-400')}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className={"lucide lucide-trending-down w-3 h-3" + (change_percent > 0 ? ' transform -scale-y-100' : '')}
                    >
                        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                        <polyline points="16 17 22 17 22 11"></polyline>
                    </svg>
                    {change_percent.toFixed(2)}%
                </div>
                <div className="w-px h-4 bg-white/10 ml-1"></div>
            </div>
            <HoverChart data={data} />
        </div>
    );
};

export default TickerBarItem;
