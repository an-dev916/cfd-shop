import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { PATHS } from "./constants/pathnames";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/about";
import Blog from "./pages/blog";
import BlogSingle from "./pages/blog-single";
import Cart from "./pages/cart/index,";
import Checkout from "./pages/checkout";
import CheckoutSuccess from "./pages/checkout-success";
import Contact from "./pages/contact";
import MyAddresses from "./pages/dashboard/MyAddresses";
import MyInfo from "./pages/dashboard/MyInfo";
import MyOrders from "./pages/dashboard/MyOrders";
import MyWishlist from "./pages/dashboard/MyWishlist";
import Faq from "./pages/faq";
import HomePage from "./pages/home";
import Page404 from "./pages/page404";
import PaymentMethods from "./pages/payment-methods";
import PrivacyPolicy from "./pages/privacy-policy";
import Product from "./pages/product";
import ProductDetail from "./pages/product-detail";
import Returns from "./pages/returns";
import Shipping from "./pages/shipping";

function App() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={PATHS.ABOUT} element={<About />} />
        <Route path={PATHS.BLOG} element={<Blog />} />
        <Route path={PATHS.BLOG_SINGLE} element={<BlogSingle />} />
        <Route path={PATHS.CART} element={<Cart />} />
        <Route path={PATHS.CHECKOUT} element={<Checkout />} />
        <Route path={PATHS.CHECKOUT_SUCCESS} element={<CheckoutSuccess />} />
        <Route path={PATHS.CONTACT} element={<Contact />} />
        <Route path={PATHS.FAQ} element={<Faq />} />
        <Route path={PATHS.PAYMENT_METHODS} element={<PaymentMethods />} />
        <Route path={PATHS.PRIVACY_POLICY} element={<PrivacyPolicy />} />
        <Route path={PATHS.PRODUCT} element={<Product />} />
        <Route path={PATHS.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={PATHS.RETURNS} element={<Returns />} />
        <Route path={PATHS.SHIPPING} element={<Shipping />} />
        {/* PROFILE INFO - DASHBOARD*/}
        <Route element={<PrivateRoute redirectPath={PATHS.PRIVACY_POLICY} />}>
          <Route path={PATHS.DASHBOARD.INDEX} element={<DashboardLayout />}>
            <Route index element={<MyInfo />} />
            <Route path={"/dashboard/my-orders"} element={<MyOrders />} />
            <Route path={PATHS.DASHBOARD.ADDRESSES} element={<MyAddresses />} />
            <Route path={PATHS.DASHBOARD.WISHLIST} element={<MyWishlist />} />
          </Route>
        </Route>
        {/* Page 404 */}
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
