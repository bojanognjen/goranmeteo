import { wmoCodes } from "../wmo";

export default function WeatherIcon({ code }) {
  const iconName = wmoCodes[code]?.icon || "not-available";

  return (
    <>
      <img className="icon" src={`src/assets/icons/${iconName}.svg`} alt={iconName == "not-available" ? `not-available ${code}` : iconName} />
      <p>{wmoCodes[code]?.sr || `${code} not-available`}</p>
    </>
  );
}
