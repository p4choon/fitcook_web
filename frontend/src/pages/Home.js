import React from "react";
import { Link } from "react-router-dom";
import Banner from "../assets/home/homeBanner.png";
import "./home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${Banner})`, margin:0, padding:0}}>
      <div className="headerContainer">
        <h1> Pedro's Pizzeria </h1>
        <p> PIZZA TO FIT ANY TASTE</p>
        <Link to="/menu">
          <button> ORDER NOW </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;