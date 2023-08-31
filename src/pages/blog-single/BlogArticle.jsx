import DOMPurify from 'dompurify'
import moment from 'moment'
import React from 'react'
import parse from 'html-react-parser'

const BlogArticle = ({ articleData, isloading, isError, allTags }) => {
  const { image, name, description, createdAt, author, tags, slug } =
    articleData || {}
  const cleanHTML = DOMPurify.sanitize(description, {
    USE_PROFILES: { html: true }
  })
  const postedDate = moment(createdAt).format('MMM DD, YYYY')
  const filterTags = allTags?.filter((item) => tags?.includes(item.id))
  return (
    <article className='entry single-entry'>
      <div className='entry-body'>
        <figure className='entry-media'>
          <img src={image || ''} alt={slug || ''} />
        </figure>
        <h1 className='entry-title entry-title-big'> {name} </h1>
        <div className='entry-meta'>
          <span>{postedDate}</span>
          <span className='meta-separator'>|</span>
          <span className='entry-author'>
            {' '}
            by{' '}
            <a href='https://www.facebook.com/an.peter.735/' target='_blank'>
              {author}
            </a>
          </span>
        </div>
        <div className='entry-content editor-content'>
          {parse(cleanHTML)}
          {/* <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
            hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque,
            aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula
            sollicitudin laoreet viverra, tortor libero sodales leo, eget
            blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse
            potenti.
          </p>
          <p>
            Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae
            luctus metus libero eu augue. Morbi purus libero, faucibus
            adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent
            elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum
            volutpat, lacus a <a href="#">ultrices sagittis</a>, mi neque
            euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede
            arcu, dapibus eu, fermentum et, dapibus sed, urna.{" "}
          </p>
          <p>
            Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
            neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium,
            ligula <a href="#">sollicitudin laoreet</a> viverra, tortor libero
            sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut
            justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat,
            eros pede semper est, vitae luctus metus libero eu augue. Morbi
            purus libero, faucibus adipiscing, commodo quis, gravida id, est.
            Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at
            felis.{" "}
          </p>
          <div className="pb-1" />
          <img
            src="/assets/images/blog/single/fullwidth-sidebar/5.jpg"
            alt="image"
          />
          <div className="pb-1" />
          <p>
            Morbi purus libero, faucibus adipiscing, commodo quis, gravida id,
            est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper
            lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi
            neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus
            pede arcu, dapibus eu, fermentum et, dapibus sed, urna. Morbi
            interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a
            ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis
            libero dolor a purus.{" "}
          </p>
          <div className="pb-1" />
          <h3>Morbi interdum mollis sapien.</h3>
          <p>
            Sed pretium, ligula sollicitudin laoreet viverra, tortor libero
            sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut
            justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat,
            eros pede semper est, vitae luctus metus libero eu augue. Morbi
            purus libero, faucibus adipiscing, commodo quis, gravida id, est.
            Sed lectus.{" "}
          </p>
          <p>
            Praesent <a href="#">elementum hendrerit</a> tortor. Sed semper
            lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi
            neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus
            pede arcu, dapibus eu, fermentum et, dapibus sed, urna.{" "}
          </p> */}
        </div>
        <div className='entry-footer row no-gutters flex-column flex-md-row'>
          <div className='col-md'>
            <div className='entry-tags'>
              <span>Tags:</span>
              {filterTags?.length > 0 &&
                filterTags?.map((item, index) => {
                  return <a key={item?.id || index}>{item?.name || ''}</a>
                })}
              {/* <a href="#">photography</a>
              <a href="#">style</a> */}
            </div>
          </div>
          <div className='col-md-auto mt-2 mt-md-0'>
            <div className='social-icons social-icons-color'>
              <span className='social-label'>Share this post:</span>
              <a
                href='#'
                className='social-icon social-facebook'
                title='Facebook'
                target='_blank'
              >
                <i className='icon-facebook-f' />
              </a>
              <a
                href='#'
                className='social-icon social-twitter'
                title='Twitter'
                target='_blank'
              >
                <i className='icon-twitter' />
              </a>
              <a
                href='#'
                className='social-icon social-pinterest'
                title='Pinterest'
                target='_blank'
              >
                <i className='icon-pinterest' />
              </a>
              <a
                href='#'
                className='social-icon social-linkedin'
                title='Linkedin'
                target='_blank'
              >
                <i className='icon-linkedin' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogArticle
