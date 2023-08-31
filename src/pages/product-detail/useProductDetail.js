import { message } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import DETAIL_TABS from '../../constants/detailTabs'
import { LOCAL_STORAGE } from '../../constants/localStorage'
import useQuery from '../../hooks/useQuery'
import { productService } from '../../services/productSevice'

export const useProductDetail = () => {
  // Get Profile Info
  const { profile } = useSelector((state) => state.auth)
  const { whiteList } = profile || {}

  // Get Product Detail
  const [renderProduct, setRenderProduct] = useState({})

  // Get Product Reviews
  const [renderReviews, setRenderReviews] = useState({})
  const [avrReviews, setAvrReviews] = useState(0)

  // Product Top Section
  const [renderColor, setRenderColor] = useState(0)
  const [quantityPruduct, setQuantityPruduct] = useState(1)
  const [imgActive, setImgActive] = useState(0)

  const productTopProps = {
    setQuantityPruduct,
    quantityPruduct,
    setRenderColor,
    renderColor,
    avrReviews,
    setImgActive,
    imgActive,
    whiteList
  }

  // Product Tabs
  const [renderTab, setRenderTab] = useState(DETAIL_TABS.desc)

  const productTabsProps = {
    renderReviews,
    setRenderTab,
    renderTab
  }
  return {
    profile,
    whiteList,
    setRenderProduct,
    renderProduct,
    setRenderReviews,
    renderReviews,
    productTopProps,
    productTabsProps,
    setAvrReviews
  }
}
