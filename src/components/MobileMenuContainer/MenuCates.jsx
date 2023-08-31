import cn from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../constants/pathnames'
import { PRODUCTS_LIMIT } from '../../constants/productsLimit'

const MenuCates = ({
  catesList,
  cates,
  search,
  onHideMenu,
  handleHideMenu
}) => {
  return (
    <div
      className='tab-pane fade'
      id='mobile-cats-tab'
      role='tabpanel'
      aria-labelledby='mobile-cats-link'
    >
      <nav className='mobile-cats-nav'>
        <ul className='mobile-cats-menu'>
          {catesList?.length > 0 &&
            catesList?.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    to={`${PATHS.PRODUCT}?category=${cates[index]?.id}&limit=${PRODUCTS_LIMIT}&page=1`}
                    onClick={handleHideMenu}
                    className={cn({
                      'mobile-cats-lead': search?.includes(
                        `${cates[index]?.id}`
                      )
                    })}
                  >
                    {item || ''}
                  </Link>
                </li>
              )
            })}
          {/* <li>
            <a className="mobile-cats-lead" href="#">
              TV
            </a>
          </li>
          <li>
            <a href="#">Computers</a>
          </li>
          <li>
            <a href="#">Tablets &amp; Cell Phones</a>
          </li>
          <li>
            <a href="#">Smartwatches</a>
          </li>
          <li>
            <a href="#">Accessories</a>
          </li> */}
        </ul>
      </nav>
    </div>
  )
}

export default MenuCates
