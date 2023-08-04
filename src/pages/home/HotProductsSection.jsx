import cn from "classnames";
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { NavLink } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import HOT_TABS from "../../constants/hotTabs";
import { PATHS } from "../../constants/pathnames/index";

const HotProductsSection = ({
  hotProducts,
  selectedHotTab,
  onSelectHotTab,
}) => {
  const [renderProducts, setRenderProducts] = useState([]);

  console.log("ddd renderProducts :>> ", renderProducts);
  console.log("ddd hotProducts :>> ", hotProducts);
  const onChangTab = (tab) => {
    if (tab !== selectedHotTab) {
      setRenderProducts([]);
    }
    setTimeout(() => onSelectHotTab?.(tab), 300);
    // onSelectHotTab?.(tab);
  };

  useEffect(() => {
    setRenderProducts(hotProducts);
  }, [hotProducts]);

  return (
    <div className="container featured" style={{ minHeight: "584px" }}>
      <ul
        className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className={`nav-link ${
              selectedHotTab === HOT_TABS.featured ? "active" : ""
            }`}
            id="products-featured-link"
            onClick={() => onChangTab(HOT_TABS.featured)}
            data-toggle="tab"
            // href="#products-featured-tab"
            role="tab"
            aria-controls="products-featured-tab"
            aria-selected="true"
          >
            Featured
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              selectedHotTab === HOT_TABS.onSale ? "active" : ""
            }`}
            id="products-sale-link"
            onClick={() => onChangTab(HOT_TABS.onSale)}
            data-toggle="tab"
            // href="#products-sale-tab"
            role="tab"
            aria-controls="products-sale-tab"
            aria-selected="false"
          >
            On Sale
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              selectedHotTab === HOT_TABS.topRated ? "active" : ""
            }`}
            id="products-top-link"
            onClick={() => onChangTab(HOT_TABS.topRated)}
            data-toggle="tab"
            // href="#products-top-tab"
            role="tab"
            aria-controls="products-top-tab"
            aria-selected="false"
          >
            Top Rated
          </a>
        </li>
      </ul>
      <div className="tab-content tab-content-carousel">
        <div
          // className={`tab-pane p-0 fade ${
          //   renderProducts.length > 0 ? "show active" : ""
          // }`}
          className={cn("tab-pane p-0 fade", {
            "show active": renderProducts.length > 0,
          })}
          id="products-featured-tab"
          role="tabpanel"
          aria-labelledby="products-featured-link"
        >
          {renderProducts?.length > 0 && (
            <OwlCarousel
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              nav
              margin={20}
              responsive={{
                0: {
                  items: 1,
                },
                480: {
                  items: 2,
                },
                992: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              }}
            >
              {renderProducts?.map((product, index) => {
                return (
                  <ProductCard key={product?.id || index} product={product} />
                );
              })}
            </OwlCarousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotProductsSection;
