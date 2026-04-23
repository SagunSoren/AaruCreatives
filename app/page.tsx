import Carousel from "@/myComponents/Carousel";
import Explore from "@/myComponents/Explore";
import Footer from "@/myComponents/Footer";
import Hero from "@/myComponents/Hero";
import Navbar from "@/myComponents/Navbar";
import ScrollToTop from "@/myComponents/ScrolltoTop";
import WhatsAppButton from "@/myComponents/Whatsapp";

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Carousel />
      <Explore />
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
};
export default page;
