import { TickerItemData } from "@/lib/data-types";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';


const HoverChart = ({ data }: {data: TickerItemData}) => {
  const { name, crypto, traditional, prices } = data
  const prices_values = prices.map(p => p.price)
  const current_price = prices_values[prices_values.length - 1]
  const start_price = prices_values[0]
  const change_percent = (((current_price - start_price) / start_price) * 100);
  const min_price = Math.min(...prices_values).toFixed(2);
  const max_price = Math.max(...prices_values).toFixed(2);

  return (
    <div
      className="absolute z-[9999] pointer-events-none bottom-[4rem] hover-chart"
    >
      <div className="w-72 bg-[#0d1120] border border-white/[0.10] rounded-2xl shadow-2xl overflow-hidden">
        <div
          className="h-[2px]"
          style={{background: `linear-gradient(90deg, transparent, ${change_percent > 0 ? 'rgb(18, 191, 100)' : 'rgb(239, 68, 68)'}, transparent)`}}
        ></div>
        <div className="px-4 pt-3 pb-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-black text-bsase">{name}</p>
              <p className="text-white/30 text-xs font-bold tracking-widest">
                {crypto}/{traditional}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white font-black text-lg">${current_price.toLocaleString()}</p>
              <div className={"flex items-center justify-end gap-0.5 text-xs font-bold" + (change_percent > 0 ? ' text-green-400' : ' text-red-400')}>
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
                {change_percent.toFixed(2)}% 24h
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 pb-3 pt-1 h-28">
          <div
            className="recharts-responsive-container"
            style={{width: '100%', height: '100%', minWidth: '0px'}}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={prices}>
                <defs>
                  <clipPath id="recharts1007-clip">
                    <rect x="0" y="4" height="92" width="266"></rect>
                  </clipPath>
                </defs>
                <defs>
                  <linearGradient id="cg-DOGE" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stop-color={change_percent > 0 ? '#22c55e' : '#ef4444'}
                      stop-opacity="0.3"
                    ></stop>
                    <stop
                      offset="95%"
                      stop-color={change_percent > 0 ? '#22c55e' : '#ef4444'}
                      stop-opacity="0"
                    ></stop>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis domain={['auto', 'auto']} hide />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={change_percent > 0 ? '#22c55e' : '#ef4444'}
                  fill="url(#cg-DOGE)"
                  strokeWidth={1.5}
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="px-4 pb-3 flex justify-between text-[10px] text-white/25 font-medium">
          <span>
            24h Low: <span className="text-white/50">${min_price.toLocaleString()}</span>
          </span>
          <span>
            24h High: <span className="text-white/50">${max_price.toLocaleString()}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HoverChart;
