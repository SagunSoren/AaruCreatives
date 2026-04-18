import Carousel from "@/myComponents/Carousel";
import Explore from "@/myComponents/Explore";
import Footer from "@/myComponents/Footer";
import Hero from "@/myComponents/Hero";
import Navbar from "@/myComponents/Navbar";

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Carousel />
      <Explore />
      <Footer />
    </div>
  );
};
export default page;
