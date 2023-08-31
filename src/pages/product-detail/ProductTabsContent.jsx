import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import moment from 'moment/moment'
import React from 'react'
import DETAIL_TABS from '../../constants/detailTabs'
import { localTime } from '../../utils/localTime'

const ProductTabsContent = ({ renderTab, shippingReturn, renderReviews }) => {
  const cleanHTML = DOMPurify.sanitize(shippingReturn, {
    USE_PROFILES: { html: true }
  })

  return (
    <div
      className='tab-pane fade show active'
      //   id="product-desc-tab"
      //   role="tabpanel"
      //   aria-labelledby="product-desc-link"
    >
      {renderTab === DETAIL_TABS.desc ? (
        <Desc />
      ) : renderTab === DETAIL_TABS.shipping ? (
        parse(cleanHTML)
      ) : (
        renderReviews?.length > 0 && (
          <div className='reviews'>
            <h3>Reviews ({renderReviews.length})</h3>
            {renderReviews?.map((item, index) => {
              const modTime = moment(
                localTime(item?.createdAt).split('/').reverse().join(''),
                'YYYYMMDD'
              ).fromNow()

              return (
                <div className='review' key={index}>
                  <div className='row no-gutters'>
                    <div className='col-auto'>
                      <h4
                        style={{
                          maxWidth: '88px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        <a href='#'>{item?.id || ''}</a>
                      </h4>
                      <div className='ratings-container'>
                        <div className='ratings'>
                          <div
                            className='ratings-val'
                            style={{
                              width: `${((item?.rate || 2.5) / 5) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                      {/* <span className="review-date">6 days ago</span> */}
                      <span className='review-date'>{modTime}</span>
                    </div>
                    <div className='col'>
                      <h4>{item?.title || ''}</h4>
                      <div className='review-content'>
                        <p>{item?.description || ''}</p>
                      </div>
                      {/* <div className="review-action">
                  <a href="#">
                    <i className="icon-thumbs-up" />
                    Helpful (2){" "}
                  </a>
                  <a href="#">
                    <i className="icon-thumbs-down" />
                    Unhelpful (0){" "}
                  </a>
                </div> */}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      )}
    </div>
  )
}

export default ProductTabsContent

const Desc = () => {
  return (
    <div className='product-desc-content'>
      <h3>Product Information</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
        Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
        Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec
        nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit
        amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla
        quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem
        tristique cursus.{' '}
      </p>
      <ul>
        <li>
          Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit.{' '}
        </li>
        <li>Vivamus finibus vel mauris ut vehicula.</li>
        <li>Nullam a magna porttitor, dictum risus nec, faucibus sapien.</li>
      </ul>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
        Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
        Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec
        nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit
        amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla
        quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem
        tristique cursus.{' '}
      </p>
    </div>
  )
}
