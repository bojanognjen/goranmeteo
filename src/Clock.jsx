import { useEffect } from "react";

export default function Clock24 ( {setTime}) {

    useEffect(()=> {
      const interval = setInterval(()=> {
        setTime(new Date());
      }, 1000)

      return () => clearInterval(interval);
    }, [])
  }