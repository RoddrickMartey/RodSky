// src/lib/fetch-weather.ts

type ForecastDay = {
  date: string;
  weekday: string;
  code: number;
  temp_min: number;
  temp_max: number;
};

// types/weather.ts
export type WeatherData = {
  city: string;
  region: string;
  country: string;
  timezone: {
    id: string;
    abbr: string;
    is_dst: boolean;
    offset: number;
    utc: string;
    current_time: string;
  };
  current: {
    code: number;
    description: string;
    temp: number;
    feels_like: number;
    humidity: number;
    wind_kph: number;
  };
  forecast: {
    date: string;
    weekday: string;
    code: number;
    temp_min: number;
    temp_max: number;
  }[];
};

import { weatherCodeMap } from "@/lib/weather-codes";

export async function fetchWeather(): Promise<WeatherData> {
  // Step 1: Get user's city, region, country, lat/lon
  const locationRes = await fetch("https://ipwho.is/");
  const location = await locationRes.json();

  if (!location.success) throw new Error("Failed to get location");

  const { city, region, country, latitude, longitude, timezone } = location;

  // Step 2: Get weather from Open-Meteo
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_min,temperature_2m_max,weathercode&timezone=auto`
  );
  const weather = await weatherRes.json();

  // Step 3: Format forecast
  const forecast: ForecastDay[] = weather.daily.time.map(
    (date: string, i: number) => {
      const weekday = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
      });

      return {
        date,
        weekday,
        code: weather.daily.weathercode[i],
        temp_min: weather.daily.temperature_2m_min[i],
        temp_max: weather.daily.temperature_2m_max[i],
      };
    }
  );

  const currentCode = weather.current.weathercode;
  const description = weatherCodeMap[currentCode]?.label ?? "Unknown";

  return {
    city,
    region,
    country,
    timezone,
    current: {
      code: currentCode,
      description,
      temp: weather.current.temperature_2m,
      feels_like: weather.current.temperature_2m, // no feels_like from Open-Meteo
      humidity: weather.current.relative_humidity_2m,
      wind_kph: weather.current.wind_speed_10m,
    },
    forecast,
  };
}
