import { useState, useEffect } from 'react';
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";
import Products from "./Products/Products";
import TopProducts from "./TopProducts/TopProducts";
import Banner from "./Banner/Banner";
import Testimonials from "./Testimonials/Testimonials";
import Footer from "./Footer/Footer";
import Logo from "../assets/features/logo1.png";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <img src={Logo} alt="Loading..." className="h-60 w-60 animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
      <TopProducts />
      <Testimonials />
      <Banner />
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;