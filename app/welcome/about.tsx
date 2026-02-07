
import React from 'react';
import '../pattern.css';
import { Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import profileico from '../welcome/img/profile.jpg';
const About: React.FC = () => {
  return (
    <section className="about py-5">
    <div className="container">
        <div className="row align-items-center gy-5">
            <div className="col-lg-6 col-md-12 about-content">
                <div className="mb-4">
                    <span className="index">Get to know me</span>
                    <h2 className="mb-3">About Me</h2>
                </div>
                
                <h3 className="mb-4">I'm Lienon Salamanca</h3>
                
                <p className="lead mb-4">
                    I'm a passionate <span className="highlight">Web Developer</span> and 
                    <span className="highlight"> Figma Designer</span> dedicated to creating modern,
                    clean, and functional applications that make a difference.
                </p>
                
                <p className="mb-4">
                    I specialize in building robust backend systems, RESTful APIs, and intuitive UI/UX designs 
                    that bring ideas to life with efficiency and elegance. My approach combines technical 
                    expertise with creative problem-solving to deliver exceptional digital experiences.
                </p>

                <div className="skills-section mt-5">
                    <h4 className="mb-4">Technical Skills</h4>
                    <div className="skills-grid">
                        <div className="skill-item">
                            <i className="bi bi-server skill-icon"></i>
                            <div>
                                <strong>Backend</strong>
                                <div className="small opacity-75">Spring Boot, Java</div>
                            </div>
                        </div>
                        <div className="skill-item">
                            <i className="bi bi-database skill-icon"></i>
                            <div>
                                <strong>Databases</strong>
                                <div className="small opacity-75">MySQL, MongoDB</div>
                            </div>
                        </div>
                        <div className="skill-item">
                            <i className="bi bi-api skill-icon"></i>
                            <div>
                                <strong>APIs</strong>
                                <div className="small opacity-75">REST, RESTful Design</div>
                            </div>
                        </div>
                        <div className="skill-item">
                            <i className="bi bi-palette skill-icon"></i>
                            <div>
                                <strong>Design</strong>
                                <div className="small opacity-75">Figma, UI/UX</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <Link to="/contact" className="btn btn-custom-primary btn-lg me-3">
                        Get In Touch
                    </Link>
                    <Link to="/portfolio" className="btn btn-custom-outline btn-lg">
                        View My Work
                    </Link>
                </div>
            </div>

            <div className="col-lg-6 col-md-12 text-center about-image-container">
                <div className="img-frame">
                    <img 
                        src={profileico} 
                        alt="Lienon Salamanca - Professional Headshot"
                        className="img-fluid profile-img"
                    />
                </div>
                
                <div className="stats-container mt-4">
                    <div className="row text-center">
                        <div className="col-4">
                            <h3>2+</h3>
                            <small>Years Experience</small>
                        </div>
                        <div className="col-4">
                            <h3>10+</h3>
                            <small>Projects Completed</small>
                        </div>
                        <div className="col-4">
                            <h3>5+</h3>
                            <small>Happy Clients</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  );
};

export default About;
