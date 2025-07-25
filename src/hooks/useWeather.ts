// src/hooks/useWeather.ts
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/fetch-weather";

export function useWeather() {
  return useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    refetchInterval: 60 * 1000, // refresh every 60 seconds
    staleTime: 60 * 1000, // keep fresh for 60 seconds
  });
}
