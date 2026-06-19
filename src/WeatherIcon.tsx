import { wmoCodes } from "../wmo";

interface WeatherIconProps {
  className?: string;
  code: number | undefined;
}

export default function WeatherIcon({ className, code }: WeatherIconProps) {
  const iconName = (code !== undefined ? wmoCodes[code]?.icon : undefined) ?? "not-available";
  const iconUrl = new URL(`./assets/icons/${iconName}.svg`, import.meta.url).href;

  return (
    <img
      className={className}
      src={iconUrl}
      alt={iconName === "not-available" ? `not-available ${code ?? ""}` : iconName}
    />
  );
}
