// src/App.tsx
import { useWeather } from "@/hooks/useWeather";
import { ThemeToggle } from "./components/ThemeToggle";
import ForcastGrid from "./components/ForcastGrid";

export default function App() {
  const { data, isLoading, isError } = useWeather();

  if (isLoading)
    return <div className="p-6 text-muted-foreground">Loading weather...</div>;
  if (isError || !data)
    return <div className="p-6 text-red-500">Failed to load weather</div>;

  const { city, region, country, timezone, current, forecast } = data;

  return (
    <main className="h-screen w-full bg-background text-foreground px-4 py-6 space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold">
            {city}, {region}
          </h1>
          <p className="text-sm text-muted-foreground">
            {country} — {timezone.abbr} ({timezone.utc})
          </p>
          <p className="text-xs text-muted-foreground">
            Local Time: {new Date(timezone.current_time).toLocaleString()}
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* Current Weather */}
      <section className="bg-card text-card-foreground rounded-xl p-6 shadow-sm space-y-4 border">
        <h2 className="text-lg font-semibold text-muted-foreground">
          Current Weather
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <p>
            <strong>Condition:</strong> {current.description}
          </p>
          <p>
            <strong>Temperature:</strong> {current.temp}&deg;C
          </p>
          <p>
            <strong>Feels Like:</strong> {current.feels_like}&deg;C
          </p>
          <p>
            <strong>Humidity:</strong> {current.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {current.wind_kph} km/h
          </p>
        </div>
      </section>

      {/* Forecast Grid */}
      <ForcastGrid forcast={forecast} />
    </main>
  );
}
