import { useEffect, useState } from "react";

const useIsPWA = (): [boolean] => {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const checkStandalone = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone !== undefined;

      setIsPWA(standalone);
    };

    checkStandalone();
    window.addEventListener("resize", checkStandalone); // Update on resize (optional)

    return () => {
      window.removeEventListener("resize", checkStandalone);
    };
  }, []);

  return [isPWA]; // Returns true if app is running as PWA
};

export default useIsPWA;
