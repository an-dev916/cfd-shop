import { Empty } from 'antd'
import cn from 'classnames'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import React from 'react'
import { Link } from 'react-router-dom'
import QuantityInput from '../../components/QuantityInput'
import { PATHS } from '../../constants/pathnames'
import { formatCurrency } from '../../utils/format'

const ProductTop = ({
  images,
  color,
  price,
  rating,
  stock,
  title,
  category,
  id: productID,
  slug,
  productTopProps,
  onAddToCart,
  renderReviews,
  description,
  handleWishList
}) => {
  const {
    setRenderColor,
    renderColor,
    setQuantityPruduct,
    avrReviews,
    setImgActive,
    imgActive,
    whiteList
  } = productTopProps || {}

  const cleanHTML = DOMPurify.sanitize(description, {
    USE_PROFILES: { html: true }
  })

  const productAddedWhiteList = whiteList?.findIndex(
    (item) => item.id === productID
  )

  return (
    <div className='product-details-top'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='product-gallery product-gallery-vertical'>
            <div className='row'>
              <figure className='product-main-image'>
                <img
                  id='product-zoom'
                  // src="/assets/images/products/single/1.jpg"
                  src={images?.[imgActive]}
                  // data-zoom-image="assets/images/products/single/1-big.jpg"
                  alt={slug}
                />
                <div id='btn-product-gallery' className='btn-product-gallery'>
                  <i className='icon-arrows' />
                </div>
              </figure>
              <div id='product-zoom-gallery' className='product-image-gallery'>
                {images?.length > 3
                  ? images?.map((img, index) => {
                      {
                        /* if (index === 0) {
                        return;
                      } */
                      }
                      return (
                        <a
                          key={index}
                          // className="product-gallery-item active"
                          className={cn('product-gallery-item', {
                            active: imgActive === index
                          })}
                          onClick={() => setImgActive(index)}
                          // data-image="assets/images/products/single/1.jpg"
                          // data-zoom-image="assets/images/products/single/1-big.jpg"
                        >
                          <img
                            // src="/assets/images/products/single/1-small.jpg"
                            src={img}
                            alt={slug}
                          />
                        </a>
                      )
                    })
                  : Array(4)
                      .fill('')
                      .map((_, index) => {
                        {
                          /* if (index === 0) {
                          return;
                        } */
                        }
                        return (
                          <a
                            key={index}
                            className={cn('product-gallery-item', {
                              active: imgActive === index
                            })}
                            onClick={() => setImgActive(index)}
                            // data-image="assets/images/products/single/1.jpg"
                            // data-zoom-image="assets/images/products/single/1-big.jpg"
                          >
                            {images?.[index] ? (
                              <img src={images?.[index]} alt={slug} />
                            ) : (
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                          </a>
                        )
                      })}
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='product-details'>
            <h1 className='product-title'>{title || 'Empty title'}</h1>
            <div className='ratings-container'>
              <div className='ratings'>
                <div
                  className='ratings-val'
                  style={{ width: `${(avrReviews / 5) * 100}%` }}
                />
              </div>
              <a
                className='ratings-text'
                href='#product-review-link'
                id='review-link'
              >
                {`${
                  renderReviews?.length > 0
                    ? renderReviews.length + ' Reviews'
                    : '0 Reviews'
                }`}
              </a>
            </div>
            <div className='product-price'> ${formatCurrency(price)} </div>
            <div
              className='product-content'
              // dangerouslySetInnerHTML={{ __html: description }}
            >
              {parse(cleanHTML)}
              {/* <p>
                Sed egestas, ante et vulputate volutpat, eros pede semper est,
                vitae luctus metus libero eu augue. Morbi purus libero, faucibus
                adipiscing. Sed lectus.{" "}
              </p> */}
            </div>
            <div className='details-filter-row details-row-size'>
              <label>Color:</label>
              <div className='product-nav product-nav-dots'>
                {color?.length > 0 &&
                  color?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={cn('product-nav-item', {
                          active: renderColor === index
                        })}
                        onClick={() => {
                          setRenderColor(index)
                        }}
                        style={{ background: item }}
                      >
                        <span className='sr-only'>Color name</span>
                      </div>
                    )
                  })}
                {/* <div
                  className="product-nav-item active"
                  style={{ background: "#e2e2e2" }}
                >
                  <span className="sr-only">Color name</span>
                </div>
                <div
                  className="product-nav-item"
                  style={{ background: "#333333" }}
                >
                  <span className="sr-only">Color name</span>
                </div>
                <div
                  className="product-nav-item"
                  style={{ background: "#f2bc9e" }}
                >
                  <span className="sr-only">Color name</span>
                </div> */}
              </div>
            </div>
            <div className='details-filter-row details-row-size'>
              <label htmlFor='qty'>Qty:</label>
              <div className='product-details-quantity'>
                {/* <input
                  type="number"
                  id="qty"
                  className="form-control"
                  defaultValue={1}
                  min={1}
                  max={10}
                  step={1}
                  data-decimals={0}
                  required
                /> */}
                <QuantityInput
                  className='cart-product-quantity'
                  max={stock > 10 ? 10 : stock}
                  onChange={(value) => setQuantityPruduct?.(value)}
                />
              </div>
            </div>
            <div className='product-details-action'>
              <a
                onClick={() => onAddToCart(productID)}
                className='btn-product btn-cart'
              >
                <span>add to cart</span>
              </a>
              <div className='details-action-wrapper'>
                <a
                  onClick={() => handleWishList(productID)}
                  className={cn('btn-product btn-wishlist', {
                    active: productAddedWhiteList > -1
                  })}
                  title='Wishlist'
                >
                  <span>
                    {productAddedWhiteList > -1
                      ? 'Remove from Wishlist'
                      : 'Add to Wishlist'}
                  </span>
                </a>
              </div>
            </div>
            <div className='product-details-footer'>
              <div className='product-cat'>
                <span>Category:</span>
                {/* <a href="#">Women</a>, <a href="#">Dresses</a>,{" "}
                <a href="#">Yellow</a> */}
                <Link
                  to={`${PATHS.PRODUCT}?category=${category?.id}&limit=6&page=1`}
                >
                  {category?.name}
                </Link>
              </div>
              <div className='social-icons social-icons-sm'>
                <span className='social-label'>Share:</span>
                <a
                  href='#'
                  className='social-icon'
                  title='Facebook'
                  target='_blank'
                >
                  <i className='icon-facebook-f' />
                </a>
                <a
                  href='#'
                  className='social-icon'
                  title='Twitter'
                  target='_blank'
                >
                  <i className='icon-twitter' />
                </a>
                <a
                  href='#'
                  className='social-icon'
                  title='Instagram'
                  target='_blank'
                >
                  <i className='icon-instagram' />
                </a>
                <a
                  href='#'
                  className='social-icon'
                  title='Pinterest'
                  target='_blank'
                >
                  <i className='icon-pinterest' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTop
