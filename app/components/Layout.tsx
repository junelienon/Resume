import { Outlet, Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <header className={`container-fluid py-3 py-md-4 sticky-top ${isScrolled ? 'bg-dark shadow-sm' : 'bg-transparent'} transition-all`}>
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between">
                        <Link to="/" className="logo text-decoration-none fs-4 fw-bold">
                            Portfolio
                        </Link>

                        <button 
                            className="burger-menu d-md-none border-0 bg-transparent p-2" 
                            type="button" 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle navigation"
                            aria-expanded={isMenuOpen}
                        >
                            <div className="burger-icon">
                                <span className={`burger-line ${isMenuOpen ? 'line1' : ''}`}></span>
                                <span className={`burger-line ${isMenuOpen ? 'line2' : ''}`}></span>
                                <span className={`burger-line ${isMenuOpen ? 'line3' : ''}`}></span>
                            </div>
                        </button>

                        <nav className={`navbar-nav d-none d-md-flex flex-row gap-3 align-items-center`}>
                            <Link className={`nav-link ${isActive('/') ? 'active fw-bold' : ''}`} to="/">Home</Link>
                            <Link className={`nav-link ${isActive('/about') ? 'active fw-bold' : ''}`} to="/about">About</Link>
                            <Link className={`nav-link ${isActive('/portfolio') ? 'active fw-bold' : ''}`} to="/portfolio">Portfolio</Link>
                            <Link className={`nav-link ${isActive('/contact') ? 'active fw-bold' : ''}`} to="/contact">Contact</Link>
                        </nav>
                    </div>

                    <div className={`mobile-menu ${isMenuOpen ? 'menu-open' : ''} d-md-none`}>
                        <nav className="mobile-nav">
                            <Link className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`} to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`} to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                            <Link className={`mobile-nav-link ${isActive('/portfolio') ? 'active' : ''}`} to="/portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
                            <Link className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`} to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="min-vh-100">
                {children || <Outlet />}
            </main>

            <footer className="container-fluid py-4 mt-5 border-top bg-light">
                <div className="container text-center">
                    <p className="mb-0 fw-semibold">
                        © 2024 June Lienon Salamanca. All rights reserved.
                    </p>
                    <div className="mt-2">
                        <small className="text-muted">
                            Built with React, TypeScript & ❤️
                        </small>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                .transition-all {
                    transition: all 0.3s ease;
                }
                .nav-link {
                    transition: color 0.2s ease;
                    padding: 0.5rem 0;
                }
                .nav-link:hover {
                    color: #48f838 !important;
                    transform: translateY(-2px);
                }
                .nav-link.active {
                    position: relative;
                    color: #0ba720 !important;
                }
                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, #0ba720, #48f838);
                }

                /* Custom Burger Menu Styles */
                .burger-menu {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 1001;
                    transition: all 0.3s ease;
                }

                .burger-menu:hover {
                    transform: scale(1.1);
                }

                .burger-icon {
                    width: 24px;
                    height: 20px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .burger-line {
                    width: 100%;
                    height: 3px;
                    background: #0ba720;
                    border-radius: 2px;
                    transition: all 0.3s ease;
                    transform-origin: center;
                }

                .burger-menu:hover .burger-line {
                    background: #48f838;
                }

                /* Burger animation when open */
                .burger-line.line1 {
                    transform: rotate(45deg) translate(6px, 6px);
                }

                .burger-line.line2 {
                    opacity: 0;
                    transform: scale(0);
                }

                .burger-line.line3 {
                    transform: rotate(-45deg) translate(6px, -6px);
                }

                /* Mobile Menu Styles */
                .mobile-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
                    border-bottom: 2px solid rgba(11, 167, 32, 0.3);
                    backdrop-filter: blur(15px);
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease, padding 0.3s ease;
                    z-index: 1000;
                }

                .mobile-menu.menu-open {
                    max-height: 300px;
                    padding: 1rem 0;
                }

                .mobile-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .mobile-nav-link {
                    color: #ffffff !important;
                    text-decoration: none;
                    padding: 1rem 1.5rem;
                    font-weight: 500;
                    border-radius: 0;
                    transition: all 0.3s ease;
                    border-left: 3px solid transparent;
                    display: block;
                }

                .mobile-nav-link:hover {
                    background: rgba(11, 167, 32, 0.1);
                    color: #0ba720 !important;
                    border-left-color: #0ba720;
                    transform: translateX(5px);
                }

                .mobile-nav-link.active {
                    background: rgba(11, 167, 32, 0.15);
                    color: #0ba720 !important;
                    border-left-color: #0ba720;
                    font-weight: 600;
                }

                @media (max-width: 767.98px) {
                    .navbar-nav .nav-link {
                        padding: 0.75rem 0;
                        border-bottom: 1px solid rgba(11, 167, 32, 0.1);
                    }
                }
            `}</style>
        </>
    );
};

export default Layout;