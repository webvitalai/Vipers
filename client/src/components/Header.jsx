import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Fire, List, X } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Categories", path: "/categories" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToPage = (path) => {
    navigate(path);
    setExpanded(false);
  };

  return (
    <>
      <header className={`viper-header ${scrolled ? "active" : ""}`}>
        <Navbar
          expand="lg"
          expanded={expanded}
          onToggle={(open) => setExpanded(open)}
          className="viper-navbar"
        >
          <Container fluid>
            <Navbar.Brand
              onClick={() => goToPage("/")}
              className="viper-brand"
              style={{ cursor: "pointer" }}
            >
              <div className="viper-logo-box">
                <img src="/Images/logo.png" alt="VIPER SPORTS" />
              </div>

              <div>
                <h4>
                  VIPER <span>SPORTS</span>
                </h4>
                <small>Gym • Fight • Performance</small>
              </div>
            </Navbar.Brand>

            <Navbar.Toggle className="viper-toggle">
              {expanded ? <X size={25} /> : <List size={28} />}
            </Navbar.Toggle>

            <Navbar.Collapse id="viper-menu">
              <Nav className="viper-links mx-auto">
                {navItems.map((item) => (
                  <Nav.Link key={item.label} onClick={() => goToPage(item.path)}>
                    {item.label}
                  </Nav.Link>
                ))}
              </Nav>

              <div className="viper-actions">
                <Button
                  onClick={() => goToPage("/categories")}
                  className="shop-btn"
                >
                  <Fire size={15} />
                  Shop Gear
                </Button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <style>{`
        :root {
          --gold: #f6c90e;
          --gold-soft: #fff2a6;
          --gold-deep: #b8860b;
          --black: #050505;
          --white-soft: #fffaf0;
        }

        /* ✅ FIX: Header now in normal flow (not overlay) */
        .viper-header {
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 9999;
          background: #050505;
          padding: 0;
        }

        .viper-navbar {
          width: 100%;
          max-width: none;
          margin: 0;
          padding: 14px 25px;
          border-radius: 0;
          background: rgba(8,8,8,.92);
          border-bottom: 1px solid rgba(246,201,14,.18);
          backdrop-filter: blur(10px);
          transition: .35s ease;
        }

        /* Scroll effect */
        .viper-header.active .viper-navbar {
          background:
            linear-gradient(135deg, rgba(8,8,8,.96), rgba(22,18,10,.95));
          box-shadow: 0 10px 40px rgba(0,0,0,.45);
        }

        .viper-brand {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .viper-logo-box {
          width: 56px;
          height: 56px;
          border-radius: 20px;
          background:
            radial-gradient(circle, rgba(246,201,14,.32), rgba(246,201,14,.08)),
            #090909;
          border: 1px solid rgba(246,201,14,.45);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .viper-logo-box img {
          width: 43px;
          height: 43px;
          object-fit: contain;
        }

        .viper-brand h4 {
          margin: 0;
          font-size: 23px;
          font-weight: 1000;
          font-family: "Arial Black", Impact, sans-serif;
          text-transform: uppercase;
          background: linear-gradient(
            110deg,
            #fff8d9,
            var(--gold-soft),
            var(--gold),
            #ffffff,
            var(--gold-deep)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .viper-brand small {
          display: block;
          margin-top: 4px;
          color: rgba(255,250,240,.6);
          font-size: 10px;
          letter-spacing: 2px;
        }

        .viper-links {
          gap: 10px;
        }

        .viper-links .nav-link {
          color: rgba(255,250,240,.8) !important;
          padding: 10px 16px !important;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          transition: .3s ease;
        }

        .viper-links .nav-link:hover {
          color: var(--gold) !important;
        }

        .viper-actions {
          display: flex;
          align-items: center;
        }

        .shop-btn {
          border: none !important;
          border-radius: 14px !important;
          padding: 12px 22px !important;
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep)) !important;
          color: #050505 !important;
          font-size: 12px !important;
          font-weight: 900 !important;
        }

        .viper-toggle {
          border: none !important;
          color: var(--gold) !important;
        }

        @media (max-width: 991px) {
          .viper-navbar {
            padding: 12px 18px;
          }

          .viper-actions {
            margin-top: 15px;
            width: 100%;
          }

          .shop-btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}