import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

interface Clock24Props {
  setTime: Dispatch<SetStateAction<Date>>;
}

export default function Clock24({ setTime }: Clock24Props): null {
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [setTime]);

  return null;
}