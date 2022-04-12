import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function GetLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        location(null);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      if (location) {
        const { latitude, longitude } = location.coords;

        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        for (let item of response) {
          setLocation(item.city);
        }
      }
    })();
  }, []);

  return { location };
}
