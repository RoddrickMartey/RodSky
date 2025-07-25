// src/lib/getWeatherIcon.tsx

import {
  WiDaySunny,
  WiDayCloudy,
  WiCloudy,
  WiFog,
  WiSprinkle,
  WiShowers,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import type { IconType } from "react-icons";
import clsx from "clsx";

export type WeatherIconProps = {
  code: number;
  className?: string;
};

export default function GetWeatherIcon({
  code,
  className = "",
}: WeatherIconProps) {
  let icon: IconType = WiDaySunny;
  let animationClass = "";
  let colorClass = "";

  switch (code) {
    case 0:
      icon = WiDaySunny;
      animationClass = "animate-spin-slow";
      colorClass = "text-yellow-400";
      break;
    case 1:
    case 2:
      icon = WiDayCloudy;
      animationClass = "animate-spin-slow";
      colorClass = "text-yellow-300";
      break;
    case 3:
      icon = WiCloudy;
      colorClass = "text-gray-400";
      break;
    case 45:
    case 48:
      icon = WiFog;
      colorClass = "text-gray-500";
      break;
    case 51:
    case 53:
      icon = WiSprinkle;
      colorClass = "text-blue-300";
      break;
    case 55:
    case 61:
    case 80:
      icon = WiShowers;
      colorClass = "text-blue-400";
      break;
    case 63:
    case 65:
      icon = WiRain;
      colorClass = "text-blue-500";
      break;
    case 71:
    case 73:
    case 75:
      icon = WiSnow;
      colorClass = "text-sky-200";
      break;
    case 95:
    case 99:
      icon = WiThunderstorm;
      animationClass = "animate-pulse";
      colorClass = "text-yellow-100";
      break;
    default:
      icon = WiDaySunny;
      colorClass = "text-yellow-400";
  }

  const Icon = icon;
  return (
    <Icon className={clsx("text-5xl", animationClass, colorClass, className)} />
  );
}
