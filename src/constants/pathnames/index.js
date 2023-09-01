const PRODUCT_PATH = '/products'
const BLOG_PATH = '/blogs'
const DASHBOARD_PATH = '/dashboard'

export const PATHS = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  DASHBOARD: {
    INDEX: DASHBOARD_PATH,
    ORDERS: DASHBOARD_PATH + '/my-orders',
    ADDRESSES: DASHBOARD_PATH + '/my-addresses',
    WISHLIST: DASHBOARD_PATH + '/my-wishlist'
  },
  PAYMENT_METHODS: '/payment-methods',
  PRIVACY_POLICY: '/privacy-policy',
  PRODUCT: PRODUCT_PATH,
  PRODUCT_DETAIL: PRODUCT_PATH + '/:slug',
  BLOG: BLOG_PATH,
  BLOG_SINGLE: BLOG_PATH + '/:slug',
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout-success',
  FAQ: '/faq',
  RETURNS: '/returns',
  SHIPPING: '/shipping'
}
