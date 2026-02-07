import React, { useState } from "react";
import '../pattern.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    if (!validateEmail(formData.email)) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('http://localhost:3009/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="contact py-5">
      <div className="container">
        <div className="text-center mb-5 fade-in">
          <h1 className="display-4 fw-bold mb-3">Get In Touch</h1>
          <div className="divider mx-auto"></div>
          <p className="lead text-white mt-3">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </div>
        
        <div className="row">
          <div className="col-lg-5 mb-4 fade-in">
            <div className="contact-info h-100">
              <h3 className="text-success mb-4">Let's Connect</h3>
              
              <div className="contact-cards">
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <i className="bi bi-envelope-fill"></i>
                  </div>
                  <div className="contact-card-content">
                    <h4>Email</h4>
                    <p>junelienonsalamanca08@gmail.com</p>
                    <small>Get a quick response</small>
                  </div>
                </div>
                
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <i className="bi bi-telephone-fill"></i>
                  </div>
                  <div className="contact-card-content">
                    <h4>Phone</h4>
                    <p>09203110577</p>
                    <small>Mon-Fri, 9AM-6PM EST</small>
                  </div>
                </div>
                
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <i className="bi bi-globe-americas"></i>
                  </div>
                  <div className="contact-card-content">
                    <h4>Location</h4>
                    <p>Philippines</p>
                    <small>Working worldwide</small>
                  </div>
                </div>
              </div>
              
              <div className="response-time mt-4 p-3 bg-success bg-opacity-10 rounded-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-clock-fill text-success me-2"></i>
                  <div>
                    <small className="text-success">Average response time: 2-4 hours</small>
                  </div>
                </div>
              </div>
              

              <div className="social-section mt-4">
                <h5 className="text-success mb-3">Follow Me</h5>
                <div className="social-icons-modern">
                  <a href="#" className="social-link-modern">
                    <i className="bi bi-linkedin"></i>
                    <span>LinkedIn</span>
                  </a>
                  <a href="#" className="social-link-modern">
                    <i className="bi bi-github"></i>
                    <span>GitHub</span>
                  </a>
                  <a href="#" className="social-link-modern">
                    <i className="bi bi-twitter"></i>
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-7 mb-4 fade-in">
            <div className="contact-form h-100">
              <h3 className="text-success mb-4">Send Me a Message</h3>
              <form onSubmit={handleSubmit}>
                {submitStatus === 'success' && (
                  <div className="alert alert-success mb-3">
                    <i className="bi bi-check-circle me-2"></i>
                    Thank you for your message! I'll get back to you soon.
                  </div>
                )}
                
                 {submitStatus === 'error' && (
                   <div className="alert alert-danger mb-3">
                     <i className="bi bi-exclamation-triangle me-2"></i>
                     {!validateEmail(formData.email) 
                       ? 'Please enter a valid email address.'
                       : 'Oops! Something went wrong. Please try again or contact me directly.'
                     }
                   </div>
                 )}

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label text-white">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label text-white">Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label text-white">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    placeholder="Project Discussion"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label text-white">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <div className="d-flex gap-3">
                  <button type="submit" className="btn btn-custom-primary" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2"></i>
                        Send Message
                      </>
                    )}
                  </button>
                  <button type="button" className="btn btn-custom-outline" onClick={handleReset} disabled={isSubmitting}>
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;