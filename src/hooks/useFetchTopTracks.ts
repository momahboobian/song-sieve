import {
  usePopularPlaylistsStore,
  TrackData,
} from "@/app/lib/popularPlaylistsStore";
import { checkTokenTime } from "@/utils/checkTokenTime";
import { useCallback } from "react";

const useFetchTopTracks = () => {
  const { setTopTracks } = usePopularPlaylistsStore();

  const fetchWebApi = async (endpoint: string, method: string, body?: any) => {
    const accessToken = localStorage.getItem("access_token");
    console.log("Access token:", accessToken);

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method,
      body: body ? JSON.stringify(body) : undefined,
    });
    console.log("Response:", res);
    return await res.json();
  };

  const getTopTracks = useCallback(async () => {
    const tokenRefreshSuccess = await checkTokenTime();
    if (!tokenRefreshSuccess) {
      console.error("Token refresh failed. Cannot fetch top tracks.");
      return;
    }
    try {
      const items: TrackData[] = (
        await fetchWebApi(
          "v1/me/top/tracks?time_range=long_term&limit=5",
          "GET"
        )
      ).items;
      setTopTracks(items);
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    }
  }, [setTopTracks]);

  return { getTopTracks };
};

export default useFetchTopTracks;
