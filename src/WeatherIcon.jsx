import { wmoCodes } from "../wmo";

export default function WeatherIcon({ className,code }) {
  const iconName = wmoCodes[code]?.icon || "not-available";

  return (
    <>
      <img className={className} src={`src/assets/icons/${iconName}.svg`} alt={iconName == "not-available" ? `not-available ${code}` : iconName} />
    </>
  );
}
