import { wmoCodes } from "../wmo";


export default function WeatherIcon({ className,code }) {
  const iconName = wmoCodes[code]?.icon || "not-available";
  const iconUrl = new URL(`../assets/icons/${iconName}.svg`, import.meta.url).href;

  return (
    <>
      <img className={className} src={iconUrl} alt={iconName == "not-available" ? `not-available ${code}` : iconName} />
    </>
  );
}
