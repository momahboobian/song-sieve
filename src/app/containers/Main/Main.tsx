import "./Main.css";
import CheckPlaylist from "../../components/CheckPlaylist/CheckPlaylist";
import PopularPlaylist from "../../components/PopularPlaylist/PopularPlaylist";

const Main = () => {
  return (
    <main className="main-section">
      <PopularPlaylist />
      <CheckPlaylist />
    </main>
  );
};

export default Main;
