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
      <header className={`viper-header ${scrolled || expanded ? "active" : ""}`}>
        <Navbar
          expand="lg"
          expanded={expanded}
          onToggle={(open) => setExpanded(open)}
          className="viper-navbar"
        >
          <Container fluid="xl">
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

        .viper-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 8px 12px;
          transition: .35s ease;
        }

        .viper-header.active {
          padding: 12px 18px;
        }

        .viper-navbar {
          width: 100%;
          max-width: 1360px;
          margin: 0 auto;
          padding: 12px 18px;
          border-radius: 999px;
          background: rgba(8,8,8,.42);
          border: 1px solid rgba(246,201,14,.12);
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 35px rgba(0,0,0,.22);
          transition: .35s ease;
          position: relative;
          overflow: hidden;
        }

        .viper-header.active .viper-navbar {
          background:
            radial-gradient(circle at top left, rgba(246,201,14,.14), transparent 35%),
            linear-gradient(135deg, rgba(8,8,8,.92), rgba(22,18,10,.9));
          border: 1px solid rgba(246,201,14,.22);
          box-shadow: 0 18px 55px rgba(0,0,0,.52);
          backdrop-filter: blur(20px);
        }

        .viper-brand {
          display: flex;
          align-items: center;
          gap: 13px;
          text-decoration: none;
          margin: 0;
          position: relative;
          z-index: 2;
        }

        .viper-logo-box {
          width: 56px;
          height: 56px;
          border-radius: 20px;
          background:
            radial-gradient(circle, rgba(246,201,14,.32), rgba(246,201,14,.08)),
            #090909;
          border: 1px solid rgba(246,201,14,.45);
          box-shadow: 0 0 24px rgba(246,201,14,.13);
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
          font-style: italic;
          letter-spacing: -.5px;
          line-height: 1;
          text-transform: uppercase;
          background: linear-gradient(
            110deg,
            #fff8d9,
            var(--gold-soft),
            var(--gold),
            #ffffff,
            var(--gold-deep)
          );
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shineText 4s linear infinite;
        }

        .viper-brand small {
          display: block;
          margin-top: 5px;
          color: rgba(255,250,240,.62);
          font-size: 10px;
          font-weight: 1000;
          text-transform: uppercase;
          letter-spacing: 2.4px;
        }

        .viper-links {
          gap: 7px;
          padding: 7px;
          border-radius: 999px;
          background: rgba(255,255,255,.045);
          border: 1px solid rgba(246,201,14,.1);
          backdrop-filter: blur(12px);
        }

        .viper-links .nav-link {
          color: rgba(255,250,240,.78) !important;
          padding: 10px 16px !important;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 1000;
          text-transform: uppercase;
          letter-spacing: 1.3px;
          cursor: pointer;
          transition: .3s ease;
        }

        .viper-links .nav-link:hover {
          background: linear-gradient(135deg, var(--gold-soft), var(--gold));
          color: #050505 !important;
        }

        .viper-actions {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .shop-btn {
          border: none !important;
          border-radius: 17px !important;
          padding: 12px 23px !important;
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep)) !important;
          color: #050505 !important;
          display: flex !important;
          align-items: center;
          gap: 8px;
          font-size: 12px !important;
          font-weight: 1000 !important;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          box-shadow: 0 18px 35px rgba(246,201,14,.18);
        }

        .viper-toggle {
          width: 47px;
          height: 47px;
          border-radius: 17px !important;
          border: 1px solid rgba(246,201,14,.32) !important;
          color: var(--gold) !important;
          background: rgba(246,201,14,.08) !important;
          position: relative;
          z-index: 2;
        }

        .viper-toggle .navbar-toggler-icon {
          display: none;
        }

        @keyframes shineText {
          0% { background-position: 0% center; }
          100% { background-position: 250% center; }
        }

        @media (max-width: 991px) {
          .viper-navbar {
            border-radius: 26px;
            padding: 10px 14px;
          }

          .viper-links {
            margin-top: 20px;
            background: transparent;
            border: none;
            padding: 0;
            width: 100%;
          }

          .viper-links .nav-link {
            width: 100%;
            margin-bottom: 6px;
          }

          .viper-actions {
            margin-top: 15px;
            flex-wrap: wrap;
          }

          .shop-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .viper-header {
            padding: 7px 8px;
          }

          .viper-header.active {
            padding: 9px 10px;
          }

          .viper-navbar {
            padding: 10px 12px;
          }

          .viper-logo-box {
            width: 48px;
            height: 48px;
            border-radius: 17px;
          }

          .viper-logo-box img {
            width: 37px;
            height: 37px;
          }

          .viper-brand h4 {
            font-size: 17px;
          }

          .viper-brand small {
            font-size: 8px;
            letter-spacing: 1.5px;
          }
        }
      `}</style>
    </>
  );
}