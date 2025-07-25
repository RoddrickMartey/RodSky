// ForecastGrid.tsx
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
    <section className="space-y-4 rounded-lg bg-card p-6 shadow-sm border-border border">
      <div className=" pb-2">
        <h2 className="text-lg font-semibold text-muted-foreground">
          {heading}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {forcast.map((item, idx) => (
          <ForecastItem item={item} key={idx} />
        ))}
      </div>
    </section>
  );
}

export default ForcastGrid;
