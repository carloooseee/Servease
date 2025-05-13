import "../css/become.css";
import React from "react";
import { Link } from "react-router-dom"; // Import Link
import beHelp from "../images/beHelp.png";
import beHelpers from "../images/beHelpers.png";

function Become() {
  return (
    <>
      <div className="beHelp">
        <div className="beHelp1">
          <div className="beHelp1-text">
            <h2>Why Become a helper at Servease?</h2>
            <p>
              Servease is built on the idea that everyone has something to offer. By becoming a Helper, you can turn your
              time, skills, and willingness to assist into real opportunities. Whether it’s helping with home cleaning,
              errands, or rides, your contribution makes daily life easier for others — and rewarding for you. With flexible
              hours, fair pay, and a supportive platform, Servease empowers you to earn while doing meaningful work.
            </p>
            <Link to="/register">
            <button className="login-button">Register to be a Helper</button>
            </Link>
          </div>
          <div className="beHelp1-image">
            <img src={beHelp} alt="Helpers at Servease" />
          </div>
        </div>
        <div className="beHelp2">
          <h2>Become a Helper with Servease....</h2>
          <p>We believe opportunity should be within reach. <br /> That's why we make it easy to earn by helping others.</p>

        </div>
        <div className="beHelp3">
          <div className="beHelp3-image">
            <img src={beHelpers} alt="Helpers at Servease" />
          </div>
          <div className="beHelp3-text">
            <h2>Who We're Looking For</h2>
            <p>
              We welcome dependable, motivated individuas who want to make a positive impact in their communities.
              Whether you're experienced or just starting out, if you're responsible, and ready to help, there's a
              place for you at Servease. All Helpers must be at leasat 18 years old and complete basic verification.
              We value diversity and encourage people from all backgrounds to apply. Join us in creating a world where
              access and ease go hand-in-hand, one booking at a time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Become;
