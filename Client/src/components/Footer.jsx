import React from 'react';
import '../css/footer.css';
import Logo from "../images/logo.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        {/* Section: Links */}
        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <img src={Logo} alt="Servease Logo" width="200" margin="10rem"/>
                <p className="text-white" style={{paddingBottom:"30"}}>
                  Our vision is to provide convenience <br></br>and help increase your sales business. 
                </p>
              </div>

              <div className="col-md-8 col-lg-8 col-xl-8 mx-auto mb-4 ml-auto">
                <div className="row">

                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4" style={{paddingLeft:"100"}}>
                    <h6 className="title">About</h6>
                    <br />
                    <p><a href="#!" className="text-white">How it works</a></p>
                    <p><a href="#!" className="text-white">Featured</a></p>
                    <p><a href="#!" className="text-white">Partnership</a></p>
                    <p><a href="#!" className="text-white">Business Relation</a></p>
                  </div>

                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                    <h6 className="title">Community</h6>
                    <br />
                    <p><a href="#!" className="text-white">Events</a></p>
                    <p><a href="#!" className="text-white">Blog</a></p>
                    <p><a href="#!" className="text-white">Podcast</a></p>
                    <p><a href="#!" className="text-white">Invite a friend</a></p>
                  </div>

                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    <h6 className="title">Socials</h6>
                    <br />
                    <p><a href="#!" className="text-white">Discord</a></p>
                    <p><a href="#!" className="text-white">Instagram</a></p>
                    <p><a href="#!" className="text-white">Twitter</a></p>
                    <p><a href="#!" className="text-white">Facebook</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Copyright */}
        <div className="footer-bottom">
          <span>©2025. All rights reserved</span>
          <span>Privacy & Policy     Terms & Conditions</span>
        </div>

      </footer>
    </div>
  );
};

export default Footer;
