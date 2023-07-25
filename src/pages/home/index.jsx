import React from "react";
import Brands from "./Brands";
import DealsOutletSection from "./DealsOutletSection";
import FeatureProductsSection from "./FeatureProductsSection";
import GetDealsSection from "./GetDealsSection";
import HotProductsSection from "./HotProductsSection";
import IntroSection from "./IntroSection";
import ServicesSection from "./ServicesSection";
import useHome from "./useHome";

const HomePage = () => {
  const {
    hotProductProps,
    featuredProps,
    getDealsProps,
    brandsProps,
    servicesProps,
  } = useHome();
  return (
    <main className="main">
      {/* INTRO */}
      <IntroSection />
      {/* HOT PRODUCTS */}
      <HotProductsSection {...hotProductProps} />
      {/* ============= line Segment ============== */}
      <div className="mb-7 mb-lg-11" />
      {/* DEALS & OUTLET */}
      <DealsOutletSection />
      {/* BRAND PARTNETS */}
      <Brands {...brandsProps} />
      {/* ============= line Segment ============== */}
      <div className="container">
        <hr className="mt-3 mb-6" />
      </div>
      <div className="container">
        <hr className="mt-5 mb-6" />
      </div>
      {/* FEATURED PRODUCTS */}
      <FeatureProductsSection {...featuredProps} />
      {/* ============= line Segment ============== */}
      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      {/* SERVICES SECTION */}
      <ServicesSection {...servicesProps} />
      {/* GET DEALS SECTION */}
      <GetDealsSection {...getDealsProps} />
    </main>
  );
};

export default HomePage;
