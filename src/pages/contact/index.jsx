import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { PATHS } from "../../constants/pathnames";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import useContact from "./useContact";
const CFD_MAP =
  "https://www.google.com/maps/place/CFD+Circle/@10.7674301,106.6586333,17z/data=!4m14!1m7!3m6!1s0x31752940e76e8ccb:0x9ed4e323c103e3d1!2sCFD+Circle!8m2!3d10.7674248!4d106.6612082!16s%2Fg%2F11n37_t021!3m5!1s0x31752940e76e8ccb:0x9ed4e323c103e3d1!8m2!3d10.7674248!4d106.6612082!16s%2Fg%2F11n37_t021?entry=ttu";
const Contact = () => {
  const { pageProps, isLoading } = useContact();
  const { pageData } = pageProps || {};
  console.log("pageData :>> ", pageData);
  console.log("pageProps :>> ", pageProps);

  return (
    <main className="main">
      <Breadcrumb className="border-0 mb-0">
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Contact Us</Breadcrumb.Item>
      </Breadcrumb>
      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{
            // backgroundImage: 'url("assets/images/contact-header-bg.jpg")',
            background: `url(${pageData?.data?.banner})`,
          }}
        >
          <h1 className="page-title text-white">
            {pageData?.title}
            <span className="text-white">{pageData?.subTitle}</span>
          </h1>
        </div>
      </div>
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <ContactInfo {...pageData} />
            <ContactForm />
          </div>
          <hr className="mt-4 mb-5" />
          <div className="stores mb-4 mb-lg-5">
            <h2 className="title text-center mb-3">Our Stores</h2>
            <div className="row">
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img
                          src="/assets/images/stores/img-1.jpg"
                          alt="image"
                        />
                      </figure>
                    </div>
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">Wall Street Plaza</h3>
                        <address>88 Pine St, New York, NY 10005, USA</address>
                        <div>
                          <a href="tel:#">+1 987-876-6543</a>
                        </div>
                        <h4 className="store-subtitle">Store Hours:</h4>
                        <div>Monday - Saturday 11am to 7pm</div>
                        <div>Sunday 11am to 6pm</div>
                        <a
                          href={CFD_MAP}
                          className="btn btn-link"
                          target="_blank"
                        >
                          <span>View Map</span>
                          <i className="icon-long-arrow-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img
                          src="/assets/images/stores/img-2.jpg"
                          alt="image"
                        />
                      </figure>
                    </div>
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">One New York Plaza</h3>
                        <address>88 Pine St, New York, NY 10005, USA</address>
                        <div>
                          <a href="tel:#">+1 987-876-6543</a>
                        </div>
                        <h4 className="store-subtitle">Store Hours:</h4>
                        <div>Monday - Friday 9am to 8pm</div>
                        <div>Saturday - 9am to 2pm</div>
                        <div>Sunday - Closed</div>
                        <a
                          href={CFD_MAP}
                          className="btn btn-link"
                          target="_blank"
                        >
                          <span>View Map</span>
                          <i className="icon-long-arrow-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15677.671652456593!2d106.6603257!3d10.7792694!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752940e76e8ccb%3A0x9ed4e323c103e3d1!2sCFD%20Circle!5e0!3m2!1svi!2s!4v1685171988555!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
};

export default Contact;
