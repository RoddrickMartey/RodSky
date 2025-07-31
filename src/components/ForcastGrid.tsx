import ForecastItem from "./ForcastItem";

function ForcastGrid({
  forcast,
}: {
  forcast: {
    date: string;
    weekday: string;
    code: number;
    temp_min: number;
    temp_max: number;
  }[];
}) {
  const heading = `This week's Forecast (${forcast[0].date})`;

  return (
    <section className="flex flex-col h-full rounded-lg bg-card p-6 shadow-sm border border-border space-y-4">
      {/* Heading */}
      <div>
        <h2 className="text-lg font-semibold text-muted-foreground">
          {heading}
        </h2>
      </div>

      {/* Forecast Items */}
      <div className="grid grid-cols-4 sm:grid-cols-2  gap-4 flex-1">
        {forcast.map((item, idx) => (
          <ForecastItem item={item} key={idx} />
        ))}
      </div>
    </section>
  );
}

export default ForcastGrid;
