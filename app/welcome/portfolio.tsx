import React from "react";
import '../pattern.css';

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "E-Commerce Website",
      description: "A modern e-commerce platform with user authentication and payment integration.",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
      image: "/img/project1.jpg"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates.",
      technologies: ["React", "Firebase", "Material-UI"],
      image: "/img/project2.jpg"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather dashboard with location-based forecasts.",
      technologies: ["React", "OpenWeather API", "Chart.js"],
      image: "/img/project3.jpg"
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing projects and skills.",
      technologies: ["React", "TypeScript", "Bootstrap"],
      image: "/img/project4.jpg"
    },
    {
      title: "Blog Platform",
      description: "A full-stack blog platform with markdown support and comments.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL"],
      image: "/img/project5.jpg"
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management.",
      technologies: ["React", "D3.js", "Express.js"],
      image: "/img/project6.jpg"
    }
  ];

  return (
    <section className="portfolio py-5">
      <div className="container">
        <div className="text-center mb-5 fade-in">
          <h1 className="display-4 fw-bold mb-3">Portfolio</h1>
          <div className="divider mx-auto"></div>
          <p className="lead text-white mt-3">
            Recent projects showcasing web development and design skills
          </p>
        </div>
        
        <div className="row">
          {projects.map((project, index) => (
            <div className="col-lg-4 col-md-6 mb-4 fade-in" key={index} style={{animationDelay: `${index * 0.1}s`}}>
              <div className="project-card h-100">
                <div className="project-image-container">
                  <div className="project-overlay">
                    <span className="portfolio-number">{index + 1}</span>
                  </div>
                  <img 
                    src={`https://picsum.photos/seed/project${index + 1}/400/250.jpg`} 
                    alt={project.title} 
                    className="project-image img-fluid" 
                  />
                </div>
                <div className="project-content">
                  <h4 className="portfolio-title">{project.title}</h4>
                  <p className="portfolio-description">{project.description}</p>
                  <div className="technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links mt-3">
                    <button className="btn btn-gradient btn-sm me-2">
                      View Project
                    </button>
                    <button className="btn btn-custom-outline btn-sm">
                      View Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;