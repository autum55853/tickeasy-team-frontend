import { useState, useEffect } from "react";
import axios from "axios";

interface LocationTag {
  locationTagId: string;
  locationTagName: string;
  subLabel: string;
}

interface LocationTagsResponse {
  status: string;
  message: string;
  data: LocationTag[];
}

export const useLocationTags = () => {
  const [locationTags, setLocationTags] = useState<LocationTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLocationTags = async () => {
      try {
        const response = await axios.get<LocationTagsResponse>("http://localhost:3000/api/v1/concerts/location-tags");
        if (response.data.status === "success") {
          setLocationTags(response.data.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch location tags"));
      } finally {
        setLoading(false);
      }
    };

    fetchLocationTags();
  }, []);

  return { locationTags, loading, error };
};
