import { useWeather } from "@/hooks/useWeather";
import { ThemeToggle } from "./components/ThemeToggle";
import ForcastGrid from "./components/ForcastGrid";
import {
  WiDaySunny,
  WiHumidity,
  WiThermometer,
  WiStrongWind,
  WiThermometerExterior,
} from "react-icons/wi";

export default function App() {
  const { data, isLoading, isError } = useWeather();

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-muted-foreground space-y-2">
        <WiDaySunny className="text-6xl animate-spin-slow text-yellow-400" />
        <p className="text-lg">Loading weather...</p>
      </div>
    );

  if (isError || !data)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500 space-y-2">
        <WiDaySunny className="text-6xl animate-spin-slow" />
        <p className="text-lg">Failed to load weather.</p>
      </div>
    );

  const { city, region, country, timezone, current, forecast } = data;

  return (
    <main className="h-full w-full bg-background text-foreground px-4 py-6 space-y-6">
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

      {/* Responsive Section for Current + Forecast */}
      <section className="flex flex-col lg:flex-row gap-6">
        {/* Current Weather */}
        <div className="flex-1 bg-card text-card-foreground rounded-xl p-6 shadow-sm space-y-6 border">
          <h2 className="text-lg font-semibold text-muted-foreground">
            Current Weather
          </h2>
          <div className="flex flex-col items-center text-center space-y-4">
            <WiDaySunny className="text-7xl text-yellow-400" />
            <div className="text-4xl font-bold">{current.temp}&deg;C</div>
            <p className="text-base capitalize text-muted-foreground">
              {current.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <WiThermometer className="text-xl" />
                Feels: {current.feels_like}&deg;
              </div>
              <div className="flex items-center gap-2">
                <WiHumidity className="text-xl" />
                {current.humidity}%
              </div>
              <div className="flex items-center gap-2">
                <WiStrongWind className="text-xl" />
                {current.wind_kph} km/h
              </div>
              <div className="flex items-center gap-2">
                <WiThermometerExterior className="text-xl" />
                Real: {current.temp}&deg;
              </div>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="flex-1">
          <ForcastGrid forcast={forecast} />
        </div>
      </section>
    </main>
  );
}
