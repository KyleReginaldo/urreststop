import { ToastContainer } from "react-toastify";
import Explore from "../../components/Explore";
import FeaturedProducts from "../../components/FeaturedProducts";
import SendMessage from "../../components/SendMessage";
import UrsInfo from "../../components/UrsInfo";
import UrStory from "../../components/UrStory";

const Home = () => {
  return (
    <div className="scroll-smooth ">
      <ToastContainer theme="colored" />
      <Explore />
      <UrStory />
      <FeaturedProducts />
      <SendMessage />
      <UrsInfo />
    </div>
  );
};

export default Home;
