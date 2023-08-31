import { Skeleton } from 'antd'
import React from 'react'
import ProductCard from '../../components/ProductCard'

const ProductsList = ({ products, isLoading, isError }) => {
  if ((!isLoading && products?.length < 1) || isError) {
    return (
      <div className='products mb-3'>
        <div className='row justify-content-center'>
          There are no products here!
        </div>
      </div>
    )
  }
  return (
    <div className='products mb-3'>
      <div className='row justify-content-center'>
        {isLoading
          ? new Array(6).fill('').map((_, index) => {
              return (
                <div className='col-6 col-md-4 col-lg-4' key={index}>
                  <Skeleton active style={{ height: 297 }}></Skeleton>
                </div>
              )
            })
          : products?.map((product, index) => {
              return (
                <div
                  className='col-6 col-md-4 col-lg-4'
                  key={product?.id || index}
                >
                  <ProductCard product={product} />
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default ProductsList
