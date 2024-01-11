import { useEffect, useState } from "react";

const getViewportSize = () => {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  return {
    vw,
    vh,
  };
};

export const useViewport = () => {
  const [size, setSize] = useState<{ vw: number; vh: number }>(getViewportSize);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const resize = () => {
      clearTimeout(timerId);

      timerId = setTimeout(() => setSize(getViewportSize()), 250);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return {
    vw: size.vw,
    vh: size.vh,
  };
};
