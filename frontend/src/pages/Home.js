import React from "react";
import { Link } from "react-router-dom";
import Banner from "../assets/home/homeBanner.png";
import "./home.css";
import { FiTwitter, FiFacebook, FiLinkedin, FiGithub, FiYoutube, FiInstagram } from "react-icons/fi";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${Banner})`}}>
      <div className="headerContainer">
        <div class="social-icons">
          <Link class="social-icon social-icon--github">
            <FiGithub/>
            <div class="tooltip">Github</div>
          </Link>
          <Link class="social-icon social-icon--twitter">
            <FiTwitter/>
            <div class="tooltip">Twitter</div>
          </Link>
          <Link class="social-icon social-icon--youtube">
            <FiYoutube/>
            <div class="tooltip">Youtube</div>
          </Link>
          <Link class="social-icon social-icon--instagram">
            <FiInstagram/>
            <div class="tooltip">Instagram</div>
          </Link>
          <Link class="social-icon social-icon--linkedin">
            <FiLinkedin/>
            <div class="tooltip">LinkedIn</div>
          </Link>
          <Link class="social-icon social-icon--facebook">
            <FiFacebook/>
            <div class="tooltip">Facebook</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;