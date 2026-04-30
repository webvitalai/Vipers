import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  Instagram,
  Facebook,
  Youtube,
  TwitterX,
  GeoAlt,
  Telephone,
  Envelope,
  ArrowRight,
  LightningChargeFill,
  ShieldCheck,
  Truck,
  Stars,
} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <footer className="viper-footer">
      <Container>
        <div className="footer-cta">
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <span className="footer-mini">
                <LightningChargeFill /> Join Viper Squad
              </span>
              <h2>
                Gear Up For <span>Peak Performance</span>
              </h2>
              <p>
                Get new drops, exclusive offers, and premium sports gear updates
                straight to your inbox.
              </p>
            </Col>

            <Col lg={5}>
              <div className="footer-subscribe">
                <Form.Control type="email" placeholder="Enter your email" />
                <Button>
                  Subscribe <ArrowRight />
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <Row className="g-4 footer-features">
          <Col md={4}>
            <div className="feature-card">
              <Truck />
              <div>
                <strong>Fast Delivery</strong>
                <span>Quick dispatch on selected products</span>
              </div>
            </div>
          </Col>

          <Col md={4}>
            <div className="feature-card">
              <ShieldCheck />
              <div>
                <strong>Premium Quality</strong>
                <span>Built for training and performance</span>
              </div>
            </div>
          </Col>

          <Col md={4}>
            <div className="feature-card">
              <Stars />
              <div>
                <strong>New Drops</strong>
                <span>Fresh collections for athletes</span>
              </div>
            </div>
          </Col>
        </Row>

        <div className="footer-panel">
          <Row className="g-5 footer-main">
            <Col lg={4}>
              <div className="footer-brand">
                <div className="footer-logo-box">
                  <img src="/Images/logo.png" alt="VIPER SPORTS Logo" />
                </div>

                <div>
                  <h3>
                    VIPER <span>SPORTS</span>
                  </h3>
                  <p className="tagline">Gym • Fight • Performance</p>
                </div>
              </div>

              <p className="footer-desc">
                Premium gym clothing and high-performance sports equipment built
                for athletes who train harder, move stronger, and perform better.
              </p>
            </Col>

            <Col sm={6} lg={2}>
              <h5>Shop</h5>
              <a href="#">Gym Wear</a>
              <a href="#">Boxing Gear</a>
              <a href="#">Football Kits</a>
              <a href="#">Martial Arts</a>
              <a href="#">Accessories</a>
            </Col>

            <Col sm={6} lg={2}>
              <h5>Company</h5>
              <a href="#">About Us</a>
              <a href="#">Collections</a>
              <a href="#">Our Athletes</a>
              <a href="#">Wholesale</a>
              <a href="#">Contact</a>
            </Col>

            <Col lg={4}>
              <h5>Contact</h5>

              <div className="footer-contact">
                <p><Telephone /> +44 1706536737</p>
                <p><Envelope /> info@vipersports.co</p>
                <p><GeoAlt /> Registered Office: Unit 4, Green Grove Mill, Dyehouse Lane, Rochdale, England, OL16 2QN, Registered in England and Wales</p>
              </div>

              <div className="footer-highlight">
                <strong>Need bulk or team orders?</strong>
                <span>
                  Contact us for wholesale gym wear and sports gear supply.
                </span>
              </div>
            </Col>
          </Row>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Viper Sports. All Rights Reserved.</p>

          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </Container>

      <style>{`
        .viper-footer {
          position: relative;
          background:
            radial-gradient(circle at 10% 0%, rgba(255,212,0,.18), transparent 32%),
            radial-gradient(circle at 90% 20%, rgba(255,212,0,.1), transparent 30%),
            linear-gradient(180deg, #090909 0%, #020202 100%);
          color: #fff;
          padding: 95px 0 30px;
          overflow: hidden;
        }

        .footer-cta {
          padding: 44px;
          border-radius: 34px;
          background:
            radial-gradient(circle at top left, rgba(255,212,0,.22), transparent 38%),
            linear-gradient(135deg, rgba(255,255,255,.09), rgba(255,255,255,.025));
          border: 1px solid rgba(255,212,0,.22);
          box-shadow: 0 28px 90px rgba(0,0,0,.5);
          margin-bottom: 28px;
        }

        .footer-mini {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #ffd400;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1.4px;
          margin-bottom: 12px;
        }

        .footer-cta h2 {
          font-size: clamp(32px, 4vw, 54px);
          font-weight: 950;
          text-transform: uppercase;
          margin: 0;
          letter-spacing: -2px;
          line-height: 1.05;
        }

        .footer-cta h2 span {
          background: linear-gradient(135deg, #fff2a6, #ffd400, #b8860b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-cta p {
          margin: 14px 0 0;
          color: rgba(255,255,255,.62);
          max-width: 620px;
          line-height: 1.7;
          font-weight: 600;
        }

        .footer-subscribe {
          display: flex;
          gap: 10px;
          padding: 8px;
          border-radius: 999px;
          background: rgba(0,0,0,.45);
          border: 1px solid rgba(255,212,0,.22);
        }

        .footer-subscribe input {
          background: transparent !important;
          border: none !important;
          color: #fff !important;
          padding-left: 18px;
          min-height: 52px;
          box-shadow: none !important;
          font-weight: 700;
        }

        .footer-subscribe input::placeholder {
          color: rgba(255,255,255,.42);
        }

        .footer-subscribe button {
          border: none !important;
          border-radius: 999px !important;
          background: linear-gradient(135deg, #fff2a6, #ffd400, #b8860b) !important;
          color: #000 !important;
          font-weight: 950 !important;
          text-transform: uppercase;
          padding: 12px 24px !important;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-features {
          margin-bottom: 28px;
        }

        .feature-card {
          height: 100%;
          padding: 20px;
          border-radius: 24px;
          background: rgba(255,255,255,.055);
          border: 1px solid rgba(255,212,0,.13);
          display: flex;
          align-items: center;
          gap: 15px;
          transition: .3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255,212,0,.35);
          background: rgba(255,212,0,.08);
        }

        .feature-card svg {
          color: #ffd400;
          font-size: 31px;
          flex-shrink: 0;
        }

        .feature-card strong {
          display: block;
          text-transform: uppercase;
          font-size: 13px;
          font-weight: 950;
        }

        .feature-card span {
          display: block;
          color: rgba(255,255,255,.55);
          font-size: 13px;
          margin-top: 3px;
        }

        .footer-panel {
          padding: 42px;
          border-radius: 34px;
          background:
            linear-gradient(135deg, rgba(255,255,255,.055), rgba(255,255,255,.02)),
            rgba(0,0,0,.35);
          border: 1px solid rgba(255,255,255,.08);
        }

        .footer-main {
          align-items: flex-start;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }

        .footer-logo-box {
          width: 66px;
          height: 66px;
          border-radius: 22px;
          background:
            radial-gradient(circle, rgba(255,212,0,.25), transparent 60%),
            #0b0b0b;
          border: 1px solid rgba(255,212,0,.45);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 30px rgba(255,212,0,.2);
          flex-shrink: 0;
        }

        .footer-logo-box img {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        .footer-brand h3 {
          margin: 0;
          font-size: 27px;
          font-weight: 950;
          font-style: italic;
          text-transform: uppercase;
          letter-spacing: -1px;
        }

        .footer-brand h3 span {
          color: #ffd400;
        }

        .tagline {
          margin: 5px 0 0;
          color: rgba(255,255,255,.48);
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .footer-desc {
          color: rgba(255,255,255,.62);
          line-height: 1.8;
          max-width: 380px;
        }

        

        .viper-footer h5 {
          color: #ffd400;
          font-size: 13px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 24px;
          position: relative;
        }

        .viper-footer h5::after {
          content: "";
          display: block;
          width: 34px;
          height: 2px;
          background: #ffd400;
          border-radius: 10px;
          margin-top: 9px;
        }

        .viper-footer a {
          display: block;
          color: rgba(255,255,255,.62);
          text-decoration: none;
          margin-bottom: 14px;
          font-size: 14px;
          font-weight: 700;
          transition: .25s ease;
        }

        .viper-footer a:hover {
          color: #ffd400;
          padding-left: 6px;
        }

        .footer-contact p {
          color: rgba(255,255,255,.62);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          font-weight: 600;
        }

        .footer-contact svg {
          color: #ffd400;
          flex-shrink: 0;
        }

        .footer-highlight {
          margin-top: 25px;
          padding: 20px;
          border-radius: 20px;
          background:
            radial-gradient(circle at top left, rgba(255,212,0,.13), transparent 38%),
            rgba(255,255,255,.055);
          border: 1px solid rgba(255,212,0,.16);
        }

        .footer-highlight strong {
          display: block;
          color: #fff;
          text-transform: uppercase;
          font-size: 14px;
          margin-bottom: 6px;
        }

        .footer-highlight span {
          color: rgba(255,255,255,.55);
          font-size: 14px;
          line-height: 1.7;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,.08);
          padding-top: 25px;
          margin-top: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .footer-bottom p {
          margin: 0;
          color: rgba(255,255,255,.35);
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .footer-bottom div {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .footer-bottom a {
          margin: 0;
          font-size: 12px;
          text-transform: uppercase;
        }

        @media (max-width: 767px) {
          .viper-footer {
            padding-top: 70px;
          }

          .footer-cta,
          .footer-panel {
            padding: 28px 20px;
            border-radius: 26px;
          }

          .footer-subscribe {
            flex-direction: column;
            border-radius: 22px;
          }

          .footer-subscribe button {
            width: 100%;
            justify-content: center;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}