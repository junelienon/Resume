import React from "react";
import profilePic from '../welcome/img/3d.ico';
import '../pattern.css';
import { Link } from "react-router";

const Index: React.FC = () => {
  return (
    <section className="index py-5 min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-7 col-md-12 text-center text-lg-start intro-content">
              <div className="mb-4">
                <p className="index fade-in">HELLO THERE, WELCOME TO MY SITE</p>
              </div>
              <div className="mb-4">
                <h1 className="index-title fade-in">
                  Welcome to <span className="highlight">My Portfolio</span>
                </h1>
              </div>
              <div className="mb-5">
                <h2 className="index-subtitle fade-in">
                  <span className="highlight">Web Developer</span>
                  <br/>& Figma Designer
                </h2>
              </div>

              <div className="mt-4 fade-in">
                <Link to="/portfolio" className="btn btn-custom-primary me-3">
                  See Portfolio
                </Link>
                <Link to="/contact" className="btn btn-custom-outline">
                  Contact Me
                </Link>
              </div>
            </div>

            <div className="col-lg-5 col-md-12 text-center img-container">
              <div className="img-frame">
                <img src={profilePic} alt="Profile Photo" className="img-fluid profile-img" />
              </div>
              
              <div className="mt-4 fade-in">
                <div className="d-flex justify-content-center gap-3">
                  <a href="#" className="text-white fs-4 hover-scale">
                    <i className="bi bi-github"></i>
                  </a>
                  <a href="#" className="text-white fs-4 hover-scale">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a href="#" className="text-white fs-4 hover-scale">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="text-white fs-4 hover-scale">
                    <i className="bi bi-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Index;
