"use client";

import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";

import { usePopularPlaylistsStore } from "@/app/lib/popularPlaylistsStore";
import useFetchTopTracks from "@/hooks/useFetchTopTracks";
import useFetchPlaylists from "@/hooks/useFetchPlaylists";
import PlaylistCover from "./components/PlaylistCover/PlaylistCover";

import "./PopularPlaylist.css";

const PopularPlaylist = () => {
  const { popularPlaylists, topTracks } = usePopularPlaylistsStore();
  const { getTopTracks } = useFetchTopTracks();
  const { getFeaturedPlaylists } = useFetchPlaylists();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([getTopTracks(), getFeaturedPlaylists()]);
      setIsLoading(false);
    };
    fetchData();
  }, [getTopTracks, getFeaturedPlaylists]);

  console.log("popularPlaylists", popularPlaylists);
  console.log("topTracks", topTracks);

  if (isLoading) {
    return (
      <div className="popular-playlists-loader">
        <Bars
          height="70"
          width="70"
          color="var(--trans-white)"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <>
      {popularPlaylists && topTracks ? (
        <div className="popular-playlist-section">
          <h1 className="popular-playlist-header">
            Popular Playlists & Tracks
          </h1>
          <div className="popular-playlist-row">
            {/* {popularPlaylists.map((playlist, index) => (
              <PlaylistCover key={index} popularPlaylist={playlist} />
            ))} */}
          </div>
          <h2 className="popular-playlist-header">Top Tracks</h2>
          <div className="popular-playlist-row">
            {topTracks.map((track, index) => (
              <div key={index}>
                <p>{`${track.name} by ${track.artists
                  .map((artist) => artist.name)
                  .join(", ")}`}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="popular-playlists-loader">
          <Bars
            height="70"
            width="70"
            color="var(--trans-white)"
            ariaLabel="loading"
          />
        </div>
      )}
    </>
  );
};
export default PopularPlaylist;
