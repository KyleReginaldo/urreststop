import { ToastContainer } from "react-toastify";
import Explore from "../components/Explore";
import FeaturedProducts from "../components/FeaturedProducts";
import NavBar from "../components/NavBar";
import SendMessage from "../components/SendMessage";
import UrsInfo from "../components/UrsInfo";
import UrStory from "../components/UrStory";

const Home = () => {
  return (
    <div className="scroll-smooth ">
      <ToastContainer />

      <NavBar index={0} />
      <Explore />
      <UrStory />
      <FeaturedProducts />
      <SendMessage />
      <UrsInfo />
    </div>
  );
};

export default Home;
