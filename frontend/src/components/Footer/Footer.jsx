import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="parent1 text-light mt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 d-flex justify-content-center">
            <div className="">
              <ul className="list-unstyled">
                <li>
                  {/* <a href="#link1">
                    <img
                      src="/images/logo.png"
                      alt="Logo 5"
                      style={{ marginBottom: 15 }}
                    />
                  </a> */}
                  <h6 className="footerHeading">Farming E-Commerce</h6>
                </li>
                <li className="footerTexts2">
                  Copyright © 2025 Farming E-Commerce.
                </li>
                <li className="footerTexts2">All Rights Reserved.</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6 d-flex justify-content-center">
            <div className="">
              <h5 className="footerTexts">Home</h5>
              <ul className="list-unstyled">
                <li>
                  <a className="footerTexts2" href="#link1">
                    About us
                  </a>
                </li>
                <li>
                  <a className="footerTexts2" href="#link2">
                    All Products
                  </a>
                </li>
                <li>
                  <a className="footerTexts2" href="#link3">
                    Our Services
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-6 d-flex justify-content-center">
            <div className="">
              <h5 className="footerTexts">Support</h5>
              <ul className="list-unstyled">
                <li>
                  <a className="footerTexts2" href="#link1">
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a className="footerTexts2" href="#link2">
                    Accessibility
                  </a>
                </li>
                <li>
                  <a className="footerTexts2" href="#link3">
                    Refund policy
                  </a>
                </li>
                <li>
                  <a className="footerTexts2" href="#link2">
                    FAQ’s
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-6 d-flex justify-content-center">
            <div className="">
              <h5 className="footerTexts">Get in Touch</h5>
              <ul className="list-unstyled">
                <li>
                  <a className="footerTexts2" href="#link1">
                    +923014580000
                  </a>
                </li>
                <li>
                  <a className="footerTexts2" href="#link2">
                    farmingecommerce@gmail.com
                  </a>
                </li>
                <li>
                  <svg
                    style={{ marginTop: "15" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="27"
                    viewBox="0 0 90 27"
                    fill="none"
                  >
                    <path
                      d="M82.7927 7.29004H70.8499C70.0288 7.29004 69.3645 7.9534 69.3645 8.76417L69.3571 17.609C69.3571 18.4197 70.0288 19.0831 70.8499 19.0831H82.7927C83.6138 19.0831 84.2856 18.4197 84.2856 17.609V8.76417C84.2856 7.9534 83.6138 7.29004 82.7927 7.29004ZM82.7927 10.2383L76.8213 13.9236L70.8499 10.2383V8.76417L76.8213 12.4495L82.7927 8.76417V10.2383Z"
                      fill="white"
                    />
                    <path
                      d="M46.161 5.71772C46.7057 5.71562 47.2504 5.7211 47.7949 5.73415L47.9397 5.73938C48.1069 5.74535 48.2718 5.75282 48.4711 5.76178C49.2652 5.79912 49.8071 5.9246 50.2826 6.10908C50.7752 6.29878 51.1902 6.5557 51.6052 6.97096C51.9846 7.3441 52.2783 7.79547 52.4658 8.29367C52.6501 8.76942 52.7755 9.3124 52.8128 10.1071C52.8218 10.3057 52.8292 10.4715 52.8352 10.6388L52.8397 10.7837C52.853 11.3283 52.8587 11.8731 52.8569 12.4179L52.8576 12.975V13.9534C52.8594 14.4985 52.8537 15.0435 52.8404 15.5883L52.836 15.7332C52.83 15.9005 52.8225 16.0656 52.8136 16.265C52.7762 17.0597 52.6494 17.6019 52.4658 18.0777C52.2789 18.5764 51.9851 19.0281 51.6052 19.4011C51.2319 19.7808 50.7806 20.0746 50.2826 20.2622C49.8071 20.4467 49.2652 20.5722 48.4711 20.6095C48.2718 20.6185 48.1069 20.626 47.9397 20.6319L47.7949 20.6364C47.2504 20.6497 46.7057 20.6554 46.161 20.6536L45.6042 20.6543H44.6272C44.0825 20.6562 43.5379 20.6505 42.9934 20.6372L42.8486 20.6327C42.6714 20.6263 42.4942 20.6188 42.3171 20.6103C41.523 20.5729 40.9811 20.446 40.5049 20.2622C40.0068 20.075 39.5557 19.7811 39.1831 19.4011C38.8032 19.0279 38.5092 18.5762 38.3217 18.0777C38.1374 17.6019 38.012 17.0597 37.9747 16.265C37.9663 16.0878 37.9589 15.9105 37.9523 15.7332L37.9485 15.5883C37.9348 15.0435 37.9286 14.4985 37.9299 13.9534V12.4179C37.9278 11.8731 37.9333 11.3283 37.9463 10.7837L37.9515 10.6388C37.9575 10.4715 37.965 10.3057 37.9739 10.1071C38.0112 9.31165 38.1366 8.77017 38.321 8.29367C38.5086 7.79522 38.8031 7.34398 39.1838 6.97171C39.5562 6.59137 40.007 6.29697 40.5049 6.10908C40.9811 5.9246 41.5222 5.79912 42.3171 5.76178L42.8486 5.73938L42.9934 5.73564C43.5376 5.72188 44.082 5.71565 44.6265 5.71697L46.161 5.71772ZM45.3937 9.45206C44.8993 9.44506 44.4083 9.53647 43.9495 9.72098C43.4906 9.90549 43.073 10.1794 42.7208 10.5268C42.3687 10.8743 42.089 11.2883 41.8982 11.7448C41.7073 12.2013 41.609 12.6912 41.609 13.186C41.609 13.6809 41.7073 14.1708 41.8982 14.6273C42.089 15.0838 42.3687 15.4978 42.7208 15.8452C43.073 16.1926 43.4906 16.4666 43.9495 16.6511C44.4083 16.8356 44.8993 16.927 45.3937 16.92C46.3835 16.92 47.3327 16.5266 48.0326 15.8262C48.7325 15.1259 49.1257 14.1761 49.1257 13.1857C49.1257 12.1952 48.7325 11.2454 48.0326 10.5451C47.3327 9.84475 46.3835 9.45206 45.3937 9.45206ZM45.3937 10.9458C45.6912 10.9403 45.9867 10.9942 46.2631 11.1043C46.5395 11.2144 46.7912 11.3785 47.0035 11.587C47.2158 11.7955 47.3845 12.0443 47.4996 12.3188C47.6148 12.5933 47.6741 12.888 47.6741 13.1857C47.6742 13.4833 47.615 13.778 47.4999 14.0526C47.3849 14.3271 47.2163 14.5759 47.0041 14.7845C46.7918 14.9931 46.5402 15.1573 46.2638 15.2675C45.9875 15.3777 45.6919 15.4317 45.3945 15.4263C44.8006 15.4263 44.2311 15.1902 43.8112 14.77C43.3912 14.3498 43.1553 13.7799 43.1553 13.1857C43.1553 12.5914 43.3912 12.0215 43.8112 11.6013C44.2311 11.1811 44.8006 10.9451 45.3945 10.9451L45.3937 10.9458ZM49.3123 8.33176C49.0715 8.3414 48.8438 8.4439 48.6768 8.61779C48.5098 8.79167 48.4166 9.02346 48.4166 9.2646C48.4166 9.50573 48.5098 9.73752 48.6768 9.91141C48.8438 10.0853 49.0715 10.1878 49.3123 10.1974C49.5597 10.1974 49.797 10.0991 49.972 9.924C50.147 9.74891 50.2453 9.51145 50.2453 9.26385C50.2453 9.01625 50.147 8.77879 49.972 8.6037C49.797 8.42862 49.5597 8.33026 49.3123 8.33026V8.33176Z"
                      fill="white"
                    />
                    <ellipse
                      cx="13.5714"
                      cy="13.5793"
                      rx="12.5714"
                      ry="12.5793"
                      stroke="white"
                    />
                    <ellipse
                      cx="44.9989"
                      cy="13.5793"
                      rx="12.5714"
                      ry="12.5793"
                      stroke="white"
                    />
                    <ellipse
                      cx="76.4287"
                      cy="13.5793"
                      rx="12.5714"
                      ry="12.5793"
                      stroke="white"
                    />
                    <path
                      d="M14.6193 14.3061H16.6771L17.5002 11.3185H14.6193V9.82472C14.6193 9.05542 14.6193 8.33093 16.2655 8.33093H17.5002V5.82136C17.2319 5.78925 16.2186 5.7168 15.1486 5.7168C12.9138 5.7168 11.3268 6.9544 11.3268 9.2272V11.3185H8.85742V14.3061H11.3268V20.6547H14.6193V14.3061Z"
                      fill="white"
                    />
                  </svg>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6 d-flex justify-content-center">
            <div className="">
              <ul className="list-unstyled">
                <li>
                  <a className="footerTexts2" href="#link1">
                    Be the first to know.
                  </a>
                </li>
                <li>
                  <a className="footerTexts2" href="#link2">
                    Sign up for our newsletter to receive updates
                  </a>
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <div className="input-group cr-input-discount border-0">
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter Email"
                    />
                    <button className="btn btn-primary">➔</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
