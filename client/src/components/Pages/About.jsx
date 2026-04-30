import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  TrophyFill,
  ShieldCheck,
  LightningChargeFill,
  PeopleFill,
  Stars,
  Bullseye,
} from "react-bootstrap-icons";

export default function About() {
  const values = [
    {
      icon: <TrophyFill />,
      title: "Premium Quality",
      text: "Products built for long-lasting training, comfort and durability.",
    },
    {
      icon: <LightningChargeFill />,
      title: "Performance Fit",
      text: "Designed for movement, flexibility, strength and everyday training.",
    },
    {
      icon: <ShieldCheck />,
      title: "Reliable Gear",
      text: "Sportswear and fight gear made to support serious performance.",
    },
    {
      icon: <PeopleFill />,
      title: "For Athletes",
      text: "Made for gym users, fighters, football players and active lifestyles.",
    },
  ];

  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="hero-overlay"></div>

        <Container className="hero-content">
          <span className="about-badge">
            <Stars /> About Viper Sports
          </span>

          <h1>
            Built For <span>Performance</span>
          </h1>

          <p>
            Viper Sports is a premium activewear and sports gear brand designed
            for athletes, fitness lovers and fighters who demand style,
            strength, comfort and confidence.
          </p>
        </Container>
      </section>

      {/* ABOUT INTRO */}
      <section className="about-main">
        <Container>
          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <div className="about-image reveal-left">
                <img src="/Images/banner_3.png" alt="Viper Sports About" />
              </div>
            </Col>

            <Col lg={6}>
              <div className="about-content reveal-right">
                <span className="mini-title">Who We Are</span>

                <h2>Premium Gear For Serious Training</h2>

                <p>
                  We provide high-quality gym wear, fight gear and performance
                  essentials made for everyday training, intense workouts and
                  active lifestyles.
                </p>

                <p>
                  Our focus is simple: strong materials, bold design, reliable
                  comfort and a professional look that helps you perform with
                  confidence.
                </p>

                <div className="stats-row">
                  <div>
                    <strong>4+</strong>
                    <span>Categories</span>
                  </div>

                  <div>
                    <strong>100%</strong>
                    <span>Performance Focus</span>
                  </div>

                  <div>
                    <strong>24/7</strong>
                    <span>Product Inquiry</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* VALUES */}
      <section className="values-section">
        <Container>
          <div className="section-head text-center">
            <span className="mini-title">Our Strength</span>
            <h2>
              Why Choose <span>Us</span>
            </h2>
            <p>Performance, quality and style in every product.</p>
          </div>

          <Row className="g-4">
            {values.map((item, index) => (
              <Col lg={3} md={6} key={index}>
                <div
                  className="value-card"
                  style={{ animationDelay: `${index * 0.14}s` }}
                >
                  <div className="value-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* MISSION */}
      <section className="mission-section">
        <Container>
          <div className="mission-box">
            <div className="mission-icon">
              <Bullseye />
            </div>

            <span className="mini-title">Our Mission</span>

            <h2>
              Train Harder. Move Better. Look Stronger.
            </h2>

            <p>
              Our mission is to deliver premium sportswear and training gear
              that helps every athlete perform better with confidence, comfort
              and style.
            </p>
          </div>
        </Container>
      </section>

      <style>{`
        :root {
          --gold: #f6c90e;
          --gold-soft: #fff2a6;
          --gold-deep: #b8860b;
          --black: #050505;
          --white-soft: #fffaf0;
          --muted: rgba(255,250,240,.68);
        }

        .about-page {
          background:
            radial-gradient(circle at top left, rgba(246,201,14,.13), transparent 34%),
            radial-gradient(circle at bottom right, rgba(184,134,11,.12), transparent 36%),
            var(--black);
          color: var(--white-soft);
          overflow: hidden;
          font-family: "Trebuchet MS", Arial, sans-serif;
        }

        .about-hero {
          position: relative;
          padding: 180px 0 125px;
          text-align: center;
          overflow: hidden;
          background: url("/Images/BOXING.png") center/cover no-repeat;
        }

        .about-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 45%, rgba(246,201,14,.18), transparent 28%),
            linear-gradient(135deg, rgba(0,0,0,.88), rgba(0,0,0,.55)),
            linear-gradient(to top, rgba(5,5,5,.95), transparent);
          z-index: 1;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(246,201,14,.22), transparent 36%);
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
        }

        .about-badge,
        .mini-title {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 17px;
          border-radius: 999px;
          background: rgba(246,201,14,.13);
          border: 1px solid rgba(246,201,14,.32);
          color: var(--gold);
          font-size: 12px;
          font-weight: 1000;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 18px;
          backdrop-filter: blur(14px);
          box-shadow: 0 0 24px rgba(246,201,14,.12);
        }

        .about-hero h1 {
          font-size: clamp(44px, 8vw, 96px);
          font-weight: 1000;
          font-family: "Arial Black", Impact, sans-serif;
          text-transform: uppercase;
          line-height: .92;
          letter-spacing: -3px;
          margin: 0 0 22px;
          color: var(--white-soft);
          animation: slideUp .8s ease both;
        }

        .about-hero h1 span,
        .section-head h2 span {
          background: linear-gradient(
            110deg,
            #fff8d9,
            var(--gold-soft),
            var(--gold),
            #ffffff,
            var(--gold-deep)
          );
          background-size: 260% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shineText 4s linear infinite;
        }

        .about-hero p {
          max-width: 790px;
          margin: 0 auto;
          color: var(--muted);
          font-size: 18px;
          line-height: 1.8;
          font-weight: 700;
          animation: slideUp .95s ease both;
        }

        .about-main {
          padding: 95px 0;
        }

        .about-image {
          position: relative;
          border-radius: 34px;
          overflow: hidden;
          border: 1px solid rgba(246,201,14,.18);
          box-shadow: 0 28px 80px rgba(0,0,0,.55);
          background: rgba(14,14,14,.78);
          backdrop-filter: blur(18px);
        }

        .about-image::before,
        .about-content::before,
        .value-card::before,
        .mission-box::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,242,166,.5), transparent, rgba(246,201,14,.35));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .about-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          display: block;
          filter: brightness(.9) contrast(1.1) saturate(1.16);
          transition: .6s ease;
        }

        .about-image:hover img {
          transform: scale(1.06);
          filter: brightness(1.02) contrast(1.14) saturate(1.22);
        }

        .about-content {
          position: relative;
          background:
            radial-gradient(circle at top left, rgba(246,201,14,.12), transparent 34%),
            rgba(14,14,14,.78);
          border: 1px solid rgba(246,201,14,.18);
          border-radius: 34px;
          padding: 44px;
          box-shadow: 0 24px 70px rgba(0,0,0,.42);
          backdrop-filter: blur(18px);
        }

        .about-content h2,
        .mission-box h2,
        .section-head h2 {
          color: var(--white-soft);
          font-size: clamp(34px, 4vw, 50px);
          font-weight: 1000;
          font-family: "Arial Black", Impact, sans-serif;
          text-transform: uppercase;
          letter-spacing: -1px;
          margin: 14px 0 18px;
        }

        .about-content p {
          color: var(--muted);
          line-height: 1.8;
          margin-bottom: 14px;
          font-weight: 700;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 28px;
        }

        .stats-row div {
          padding: 16px 12px;
          border-radius: 20px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(246,201,14,.14);
          text-align: center;
        }

        .stats-row strong {
          display: block;
          font-size: 26px;
          font-weight: 1000;
          color: var(--gold);
        }

        .stats-row span {
          display: block;
          margin-top: 4px;
          color: var(--muted);
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .values-section {
          padding: 90px 0;
          border-top: 1px solid rgba(246,201,14,.1);
          background:
            radial-gradient(circle at center, rgba(246,201,14,.1), transparent 35%),
            rgba(255,255,255,.015);
        }

        .section-head {
          max-width: 760px;
          margin: 0 auto 48px;
        }

        .section-head p {
          color: var(--muted);
          font-weight: 700;
          font-size: 17px;
          margin-top: 10px;
        }

        .value-card {
          position: relative;
          height: 100%;
          padding: 34px 24px;
          border-radius: 30px;
          background:
            radial-gradient(circle at top left, rgba(246,201,14,.13), transparent 34%),
            rgba(14,14,14,.78);
          border: 1px solid rgba(246,201,14,.16);
          box-shadow: 0 22px 55px rgba(0,0,0,.38);
          backdrop-filter: blur(18px);
          transition: .45s ease;
          opacity: 0;
          animation: slideUp .8s ease forwards;
        }

        .value-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 30px 75px rgba(246,201,14,.12), 0 30px 70px rgba(0,0,0,.6);
        }

        .value-icon {
          width: 62px;
          height: 62px;
          border-radius: 20px;
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep));
          color: #050505;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 22px;
          box-shadow: 0 18px 35px rgba(246,201,14,.2);
        }

        .value-card h4 {
          font-size: 20px;
          font-weight: 1000;
          font-family: "Arial Black", Impact, sans-serif;
          text-transform: uppercase;
          margin-bottom: 12px;
          color: var(--white-soft);
        }

        .value-card p {
          color: var(--muted);
          line-height: 1.7;
          font-weight: 700;
          margin: 0;
        }

        .mission-section {
          padding: 90px 0 100px;
        }

        .mission-box {
          position: relative;
          max-width: 980px;
          margin: 0 auto;
          padding: 58px 45px;
          border-radius: 38px;
          text-align: center;
          background:
            radial-gradient(circle at center, rgba(246,201,14,.18), transparent 42%),
            rgba(14,14,14,.82);
          border: 1px solid rgba(246,201,14,.18);
          box-shadow: 0 28px 85px rgba(0,0,0,.52);
          backdrop-filter: blur(18px);
          overflow: hidden;
        }

        .mission-icon {
          width: 76px;
          height: 76px;
          margin: 0 auto 22px;
          border-radius: 24px;
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep));
          color: #050505;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          box-shadow: 0 22px 45px rgba(246,201,14,.2);
        }

        .mission-box p {
          max-width: 760px;
          margin: 0 auto;
          color: var(--muted);
          font-size: 18px;
          line-height: 1.8;
          font-weight: 700;
        }

        .reveal-left {
          animation: slideLeft .9s ease both;
        }

        .reveal-right {
          animation: slideRight .9s ease both;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(38px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-42px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(42px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shineText {
          0% { background-position: 0% center; }
          100% { background-position: 260% center; }
        }

        @media(max-width: 991px) {
          .about-hero {
            padding: 145px 0 90px;
          }

          .about-image img {
            height: 420px;
          }

          .about-content {
            padding: 34px;
          }
        }

        @media(max-width: 768px) {
          .about-hero {
            padding: 125px 0 75px;
          }

          .about-hero h1 {
            font-size: 42px;
            letter-spacing: -1px;
          }

          .about-hero p {
            font-size: 15px;
          }

          .about-main,
          .values-section,
          .mission-section {
            padding: 60px 0;
          }

          .about-image,
          .about-content,
          .value-card,
          .mission-box {
            border-radius: 24px;
          }

          .about-image img {
            height: 300px;
          }

          .about-content {
            padding: 25px;
          }

          .stats-row {
            grid-template-columns: 1fr;
          }

          .section-head {
            margin-bottom: 32px;
          }

          .mission-box {
            padding: 38px 22px;
          }

          .mission-box p {
            font-size: 15px;
          }
        }
      `}</style>
    </main>
  );
}