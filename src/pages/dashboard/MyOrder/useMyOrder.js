import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuthen } from '../../../components/MainContext'
import { LOCAL_STORAGE } from '../../../constants/localStorage'
import { orderService } from '../../../services/orderService'
import { authActions } from '../../../store/reducers/authenReducer'

const useMyOrder = () => {
  const [reviewRate, setReviewRate] = useState(3)
  const [renderListOrders, setRenderListOrders] = useState({})
  const { showReviewModal, setCheckReview } = useAuthen()

  const listOrders = useSelector((state) => state.auth.listOrders)
  const onReviewSubmit = (reviewPayload) => {
    //
  }

  const handleShowMore = () => {
    if (!renderListOrders?.expanded) {
      setRenderListOrders({
        ...renderListOrders,
        expanded: true,
        itemsToShow: listOrders?.orders?.length
      })
    } else {
      setRenderListOrders({
        ...renderListOrders,
        expanded: false,
        itemsToShow: 3
      })
    }
  }
  const orderProps = {
    listOrders,
    renderListOrders,
    onReviewSubmit,
    setReviewRate,
    reviewRate,
    showReviewModal,
    setCheckReview
  }
  const reviewProps = {
    onReviewSubmit,
    setReviewRate,
    reviewRate
  }

  useEffect(() => {
    setRenderListOrders({
      listOrders,
      itemsToShow: 3,
      expanded: false
    })
  }, [JSON.stringify(listOrders)])

  return {
    reviewProps,
    orderProps,
    renderListOrders,
    handleShowMore
  }
}

export default useMyOrder
