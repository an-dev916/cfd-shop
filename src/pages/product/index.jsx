import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Pagination from "../../components/Pagination";
import { PATHS } from "../../constants/pathnames";
import ProductFilter from "./ProductFilter";
import ProductsList from "./ProductsList";
import ToolsBox from "./ToolsBox";
import { useProduct } from "./useProduct";

const ProductsPage = () => {
  const { productsListProps, pagiProps, filterProps, toolboxProps } =
    useProduct();

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Product</h1>
        </div>
      </div>
      <Breadcrumb className="mb-2">
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Product</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <ToolsBox {...toolboxProps} />
              <ProductsList {...productsListProps} />
              <Pagination {...pagiProps} />
            </div>
            <ProductFilter {...filterProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
