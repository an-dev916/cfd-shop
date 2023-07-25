import { Route, Routes } from "react-router-dom";
import { PATHS } from "./constants/pathnames";
import "./assets/css/index.css";
import { lazy, Suspense } from "react";
import PageLoading from "./components/PageLoading";

const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const About = lazy(() => import("./pages/about"));
const Blog = lazy(() => import("./pages/blog"));
const BlogSingle = lazy(() => import("./pages/blog-single"));
const Cart = lazy(() => import("./pages/cart/index,"));
const Checkout = lazy(() => import("./pages/checkout"));
const CheckoutSuccess = lazy(() => import("./pages/checkout-success"));
const Contact = lazy(() => import("./pages/contact"));
const MyAddresses = lazy(() => import("./pages/dashboard/MyAddresses"));
const MyInfo = lazy(() => import("./pages/dashboard/MyInfo"));
const MyOrders = lazy(() => import("./pages/dashboard/MyOrders"));
const MyWishlist = lazy(() => import("./pages/dashboard/MyWishlist"));
const Faq = lazy(() => import("./pages/faq"));
const HomePage = lazy(() => import("./pages/home"));
const Page404 = lazy(() => import("./pages/page404"));
const PaymentMethods = lazy(() => import("./pages/payment-methods"));
const PrivacyPolicy = lazy(() => import("./pages/privacy-policy"));
const Product = lazy(() => import("./pages/product"));
const ProductDetail = lazy(() => import("./pages/product-detail"));
const Returns = lazy(() => import("./pages/returns"));
const Shipping = lazy(() => import("./pages/shipping"));

function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.ABOUT} element={<About />} />
          <Route path={PATHS.BLOG} element={<Blog />} />
          <Route path={PATHS.BLOG_SINGLE} element={<BlogSingle />} />
          <Route path={PATHS.CART} element={<Cart />} />
          {/* <Route path={PATHS.CHECKOUT} element={<Checkout />} />
          <Route path={PATHS.CHECKOUT_SUCCESS} element={<CheckoutSuccess />} /> */}
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
              <Route
                path={PATHS.DASHBOARD.ADDRESSES}
                element={<MyAddresses />}
              />
              <Route path={PATHS.DASHBOARD.WISHLIST} element={<MyWishlist />} />
            </Route>
            <Route path={PATHS.CHECKOUT} element={<Checkout />} />
            <Route
              path={PATHS.CHECKOUT_SUCCESS}
              element={<CheckoutSuccess />}
            />
          </Route>
          {/* Page 404 */}
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
