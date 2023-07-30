import React from "react";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productSevice";

const ProductFilter = ({ cates, onFilterChange, activeCate, isLoading }) => {
  console.log("cates :>> ", cates);

  const onCateChange = (id, isChecked) => {
    if (isChecked) {
      onFilterChange(id);
    } else {
      onFilterChange("");
    }
  };
  return (
    <aside className="col-lg-3 order-lg-first">
      <div className="sidebar sidebar-shop">
        <div className="widget widget-clean">
          <label>Filters:</label>
          <a
            className="sidebar-filter-clear"
            onClick={() => onFilterChange("")}
          >
            Clean All
          </a>
        </div>
        <div className="widget widget-collapsible">
          <h3 className="widget-title">
            <a
              data-toggle="collapse"
              href="#widget-1"
              role="button"
              aria-expanded="true"
              aria-controls="widget-1"
            >
              {" "}
              Category{" "}
            </a>
          </h3>
          <div className="collapse show" id="widget-1">
            <div className="widget-body">
              <div className="filter-items filter-items-count">
                {cates?.length > 0 &&
                  cates?.map((cate, index) => {
                    const { name, id } = cate || {};
                    const { data: cateAmount } = useQuery(() =>
                      productService.getProducts(`?category=${id}`)
                    );
                    const { products: productsAmount } = cateAmount || {};
                    return (
                      <div className="filter-item" key={id || index}>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={`${id || "checkbox"}`}
                            checked={activeCate === id}
                            onChange={(value) =>
                              onCateChange(id, value.target.checked)
                            }
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={`${id || "checkbox"}`}
                          >
                            {name || ""}
                          </label>
                        </div>
                        <span className="item-count">
                          {productsAmount?.length || ""}
                        </span>
                      </div>
                    );
                  })}
                {/* <div className="filter-item">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="cat-1"
                    />
                    <label className="custom-control-label" htmlFor="cat-1">
                      TV
                    </label>
                  </div>
                  <span className="item-count">3</span>
                </div>

                <div className="filter-item">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="cat-2"
                    />
                    <label className="custom-control-label" htmlFor="cat-2">
                      Computers
                    </label>
                  </div>
                  <span className="item-count">0</span>
                </div>

                <div className="filter-item">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="cat-3"
                    />
                    <label className="custom-control-label" htmlFor="cat-3">
                      Tablets &amp; Cell Phones
                    </label>
                  </div>
                  <span className="item-count">4</span>
                </div>

                <div className="filter-item">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="cat-4"
                    />
                    <label className="custom-control-label" htmlFor="cat-4">
                      Smartwatches
                    </label>
                  </div>
                  <span className="item-count">2</span>
                </div>

                <div className="filter-item">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="cat-5"
                    />
                    <label className="custom-control-label" htmlFor="cat-5">
                      Accessories
                    </label>
                  </div>
                  <span className="item-count">2</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="widget widget-collapsible">
          <h3 className="widget-title">
            <a
              data-toggle="collapse"
              href="#widget-2"
              role="button"
              aria-expanded="true"
              aria-controls="widget-5"
            >
              {" "}
              Price{" "}
            </a>
          </h3>
          <div className="collapse show" id="widget-2">
            <div className="widget-body">
              <div className="filter-price">
                <div className="filter-price-text">
                  {" "}
                  Price Range: <span id="filter-price-range" />
                </div>
                <div id="price-slider" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProductFilter;
