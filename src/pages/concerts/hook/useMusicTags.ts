import { useState, useEffect } from "react";
import axios from "axios";

interface MusicTag {
  musicTagId: string;
  musicTagName: string;
  subLabel: string;
}

interface MusicTagsResponse {
  status: string;
  message: string;
  data: MusicTag[];
}

export const useMusicTags = () => {
  const [musicTags, setMusicTags] = useState<MusicTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMusicTags = async () => {
      try {
        const response = await axios.get<MusicTagsResponse>("http://localhost:3000/api/v1/concerts/music-tags");
        if (response.data.status === "success") {
          setMusicTags(response.data.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch music tags"));
      } finally {
        setLoading(false);
      }
    };

    fetchMusicTags();
  }, []);

  return { musicTags, loading, error };
};
