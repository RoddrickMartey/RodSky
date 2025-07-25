import GetWeatherIcon from "./getWeatherIcon";

type ForecastItemProps = {
  item: {
    date: string;
    weekday: string;
    code: number;
    temp_min: number;
    temp_max: number;
  };
};

function ForecastItem({ item }: ForecastItemProps) {
  const shortDate = item.date.slice(8, 10) + "-" + item.date.slice(5, 7);

  return (
    <div className="bg-accent text-card-foreground border border-border rounded-lg shadow-sm p-4 flex flex-col items-center gap-2 w-38">
      <div className="font-semibold text-sm">{item.weekday}</div>

      <div className="text-2xl">
        <GetWeatherIcon code={item.code} />
      </div>

      <div className="font-semibold text-center text-chart-1">
        <span>{item.temp_min}&deg;C</span> - <span>{item.temp_max}&deg;C</span>
      </div>

      <div className="text-[0.65rem] opacity-70">{shortDate}</div>
    </div>
  );
}

export default ForecastItem;
