import { wmoCodes } from "../wmo";

export default function WeatherIcon({ code }) {
  const iconName = wmoCodes[code].icon || "not-available";

  return <img src={`/icons/${iconName}.svg`} alt={code} />;
}