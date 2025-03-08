import {
  usePopularPlaylistsStore,
  PlaylistData,
} from "@/app/lib/popularPlaylistsStore";
import { checkTokenTime } from "@/utils/checkTokenTime";
import { useCallback } from "react";

const useFetchPlaylists = () => {
  const { setPopularPlaylists } = usePopularPlaylistsStore();

  const fetchWebApi = async (endpoint: string, method: string, body?: any) => {
    const accessToken = localStorage.getItem("access_token");
    console.log("Access token:", accessToken);

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      // `https://api.spotify.com/v1/browse/featured-playlists?limit=5`,
      // https://api.spotify.com/v1/browse/featured-playlists
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method,
      body: body ? JSON.stringify(body) : undefined,
    });
    console.log("Response:", res);
    return await res.json();
  };

  const getFeaturedPlaylists = useCallback(async () => {
    const tokenRefreshSuccess = await checkTokenTime();
    if (!tokenRefreshSuccess) {
      console.error("Token refresh failed. Cannot fetch playlists.");
      return;
    }
    try {
      const data = await fetchWebApi(
        "v1/browse/featured-playlists?limit=5",
        "GET"
      );
      console.log("Featured Playlists Data:", data);
      const featuredPlaylists: PlaylistData[] = data.playlists.items;
      setPopularPlaylists(featuredPlaylists);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  }, [setPopularPlaylists]);

  return { getFeaturedPlaylists };
};

export default useFetchPlaylists;
