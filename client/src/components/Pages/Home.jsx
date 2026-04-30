import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Carousel,
} from "react-bootstrap";
import {
  ArrowRight,
  Whatsapp,
  Envelope,
  LightningChargeFill,
} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const openCategory = (title) => {
    const slug = title.toLowerCase().replaceAll(" ", "-");
    navigate(`/categories/${slug}`);
  };

  const slides = [
    { img: "/Images/banner_1.png", badge: "NEW DROP", title: "BEAST MODE" },
    { img: "/Images/banner_2.png", badge: "GYM WEAR", title: "POWER FIT" },
    { img: "/Images/banner_3.png", badge: "FIGHT GEAR", title: "NO LIMIT" },
  ];

  const categories = [
    { title: "Boxing", img: "/Images/vg6.png" },
    { title: "Football", img: "/Images/vg2.png" },
    { title: "Martial Arts", img: "/Images/vg8.png" },
    { title: "Gym Wear", img: "/Images/vg4.png" },
  ];

  const products = [
    { title: "Punching Bag", img: "/Images/vg5.png" },
    { title: "Football Kit Bag", img: "/Images/vg3.png" },
  ];

  return (
    <main className="home-page">
      {/* HERO */}
      <section className="hero-carousel-wrap">
        <Carousel fade controls indicators interval={3500} pause={false}>
          {slides.map((slide, index) => (
            <Carousel.Item key={index}>
              <div className="hero-slide">
                <img src={slide.img} alt={slide.title} className="hero-bg" />
                <div className="hero-overlay"></div>

                <Container className="hero-content">
                  <Row className="align-items-center hero-row">
                    <Col xs={12} lg={7}>
                      <div className="hero-badge">
                        <LightningChargeFill /> {slide.badge}
                      </div>

                      <h1 className="hero-title">{slide.title}</h1>

                      <div className="hero-buttons">
                        <Button className="btn-gold">
                          Shop Now <ArrowRight className="ms-2" />
                        </Button>

                        <Button className="btn-glass">
                          Explore
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* CATEGORIES */}
      <section className="section-space">
        <Container>
          <div className="section-head text-center">
            <span className="section-mini">Premium Sportswear</span>
            <h2>
              Shop <span>Now</span>
            </h2>
          </div>

          <Row className="g-3 g-md-4">
            {categories.map((item, index) => (
              <Col xs={6} md={6} lg={3} key={item.title}>
                <Card
                  className="category-card reveal-card"
                  style={{ animationDelay: `${index * 0.12}s` }}
                  onClick={() => openCategory(item.title)}
                >
                  <Card.Img src={item.img} alt={item.title} />
                  <div className="category-overlay"></div>

                  <Card.ImgOverlay className="category-content">
                    <h4>{item.title}</h4>

                    <Button
                      className="category-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openCategory(item.title);
                      }}
                    >
                      View <ArrowRight />
                    </Button>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* PRODUCTS */}
      <section className="section-space product-section">
        <Container>
          <Row className="align-items-end mb-4 mb-md-5">
            <Col xs={7} lg={7}>
              <div className="section-head mb-0 text-start">
                <span className="section-mini">Most Wanted</span>
                <h2>
                  Best <span>Sellers</span>
                </h2>
              </div>
            </Col>

            <Col xs={5} lg={5} className="text-end">
              <Button className="btn-gold view-all-btn">View All</Button>
            </Col>
          </Row>

          <Row className="g-4">
            {products.map((item, index) => (
              <Col xs={12} md={6} key={item.title}>
                <Card
                  className="product-card reveal-card"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <Row className="g-0 align-items-center">
                    <Col xs={12} md={6}>
                      <div className="product-image-box">
                        <img src={item.img} alt={item.title} />
                      </div>
                    </Col>

                    <Col xs={12} md={6}>
                      <Card.Body className="product-body">
                        <span className="product-badge">Best Seller</span>
                        <h3>{item.title}</h3>

                        <Button className="btn-glass">
                          Buy Now <ArrowRight />
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* NEWSLETTER */}
      <section className="section-space">
        <Container>
          <div className="newsletter-box reveal-card">
            <Row className="align-items-center g-4">
              <Col xs={12} lg={5}>
                <span className="section-mini">Get Updates</span>
                <h2>
                  Join <span>Now</span>
                </h2>
              </Col>

              <Col xs={12} lg={7}>
                <Row className="g-3">
                  <Col xs={12} md={6}>
                    <div className="input-box">
                      <Whatsapp size={22} />
                      <Form.Control type="tel" placeholder="WhatsApp number" />
                    </div>
                  </Col>

                  <Col xs={12} md={6}>
                    <div className="input-box">
                      <Envelope size={22} />
                      <Form.Control type="email" placeholder="Email address" />
                    </div>
                  </Col>

                  <Col xs={12}>
                    <Button className="btn-gold w-100">Join Now</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <style>{`
        :root {
          --gold: #f6c90e;
          --gold-soft: #fff2a6;
          --gold-deep: #b8860b;
          --black: #050505;
          --card: rgba(18, 18, 18, .72);
          --white-soft: #fffaf0;
          --muted: rgba(255,250,240,.68);
        }

        .home-page {
          background:
            radial-gradient(circle at top left, rgba(246,201,14,.14), transparent 30%),
            radial-gradient(circle at bottom right, rgba(184,134,11,.12), transparent 30%),
            var(--black);
          color: var(--white-soft);
          overflow: hidden;
          font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        }

        button,
        .btn {
          transition: .35s ease !important;
        }

        button:hover,
        .btn:hover {
          transform: translateY(-4px);
        }

        .hero-carousel-wrap,
        .hero-slide {
          position: relative;
          min-height: 100vh;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          min-height: 100vh;
          object-fit: cover;
          object-position: center;
          filter: brightness(1.06) contrast(1.12) saturate(1.14);
          animation: heroZoom 6s ease-in-out infinite alternate;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 22% 42%, rgba(246,201,14,.24), transparent 24%),
            linear-gradient(90deg, rgba(0,0,0,.82), rgba(0,0,0,.42), rgba(0,0,0,.14)),
            linear-gradient(to top, rgba(5,5,5,.96), transparent);
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-row {
          min-height: 100vh;
          padding-top: 105px;
        }

        .hero-badge,
        .section-mini {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(246,201,14,.13);
          border: 1px solid rgba(246,201,14,.32);
          color: var(--gold);
          font-size: 12px;
          font-weight: 1000;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 18px;
          box-shadow: 0 0 24px rgba(246,201,14,.12);
          backdrop-filter: blur(14px);
          animation: fadeIn .8s ease both;
        }

        .hero-title {
          font-size: clamp(48px, 8vw, 112px);
          line-height: .9;
          font-weight: 1000;
          letter-spacing: -3px;
          text-transform: uppercase;
          margin: 0;
          font-family: "Arial Black", Impact, sans-serif;
          background: linear-gradient(
            110deg,
            #fff8d9 0%,
            var(--gold-soft) 18%,
            var(--gold) 36%,
            #ffffff 48%,
            var(--gold) 58%,
            var(--gold-deep) 78%,
            #fff8d9 100%
          );
          background-size: 260% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: slideUp .8s ease both, shineText 4.2s linear infinite;
          text-shadow: 0 22px 60px rgba(246,201,14,.18);
        }

        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 30px;
        }

        .carousel-control-prev,
        .carousel-control-next {
          width: 6%;
          z-index: 5;
        }

        .carousel-indicators {
          bottom: 34px;
          z-index: 5;
        }

        .carousel-indicators button {
          width: 30px !important;
          height: 5px !important;
          border-radius: 30px !important;
          margin: 0 5px !important;
          background-color: rgba(255,255,255,.45) !important;
        }

        .carousel-indicators .active {
          background: linear-gradient(135deg, var(--gold-soft), var(--gold)) !important;
        }

        .btn-gold {
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep)) !important;
          color: #050505 !important;
          border: none !important;
          border-radius: 16px !important;
          padding: 13px 30px !important;
          font-weight: 1000 !important;
          text-transform: uppercase;
          letter-spacing: 1.4px;
          box-shadow: 0 18px 38px rgba(246,201,14,.22);
          position: relative;
          overflow: hidden;
        }

        .btn-gold::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-120%) skewX(-18deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent);
          transition: .6s ease;
        }

        .btn-gold:hover::after {
          transform: translateX(120%) skewX(-18deg);
        }

        .btn-glass {
          background: rgba(255,255,255,.07) !important;
          color: var(--gold) !important;
          border: 1px solid rgba(246,201,14,.55) !important;
          border-radius: 16px !important;
          padding: 13px 30px !important;
          font-weight: 1000 !important;
          text-transform: uppercase;
          letter-spacing: 1.3px;
          backdrop-filter: blur(14px);
        }

        .btn-glass:hover {
          background: linear-gradient(135deg, var(--gold-soft), var(--gold)) !important;
          color: #000 !important;
          box-shadow: 0 18px 40px rgba(246,201,14,.18);
        }

        .section-space {
          padding: 95px 0;
        }

        .section-head {
          margin-bottom: 48px;
        }

        .section-head h2,
        .newsletter-box h2 {
          font-size: clamp(36px, 5vw, 66px);
          font-weight: 1000;
          text-transform: uppercase;
          letter-spacing: -1.5px;
          margin: 0;
          font-family: "Arial Black", Impact, sans-serif;
          color: var(--white-soft);
        }

        .section-head span,
        .newsletter-box span {
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .category-card {
          min-height: 370px;
          border: 1px solid rgba(246,201,14,.18) !important;
          border-radius: 32px !important;
          overflow: hidden;
          background: var(--card) !important;
          cursor: pointer;
          transition: .45s ease;
          box-shadow: 0 20px 45px rgba(0,0,0,.38);
          backdrop-filter: blur(18px);
        }

        .category-card::before,
        .product-card::before,
        .newsletter-box::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,242,166,.55), transparent, rgba(246,201,14,.35));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: .72;
        }

        .category-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 30px 70px rgba(246,201,14,.12), 0 30px 65px rgba(0,0,0,.6);
        }

        .category-card img {
          height: 370px;
          object-fit: cover;
          object-position: center;
          filter: brightness(1.08) contrast(1.1) saturate(1.15);
          transition: .6s ease;
        }

        .category-card:hover img {
          transform: scale(1.1);
          filter: brightness(1.18) contrast(1.16) saturate(1.28);
        }

        .category-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, rgba(0,0,0,.78), rgba(0,0,0,.06)),
            radial-gradient(circle at bottom left, rgba(246,201,14,.18), transparent 42%);
        }

        .category-content {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 26px !important;
        }

        .category-content h4 {
          font-size: 28px;
          font-weight: 1000;
          text-transform: uppercase;
          letter-spacing: .8px;
          margin: 0 0 14px;
          font-family: "Arial Black", Impact, sans-serif;
          color: var(--white-soft);
          text-shadow: 0 4px 18px rgba(0,0,0,.75);
        }

        .category-btn {
          width: fit-content;
          background: rgba(255,255,255,.08) !important;
          color: var(--gold) !important;
          border: 1px solid rgba(246,201,14,.6) !important;
          border-radius: 999px !important;
          font-weight: 1000 !important;
          padding: 8px 18px !important;
          backdrop-filter: blur(12px);
        }

        .category-btn:hover {
          background: linear-gradient(135deg, var(--gold-soft), var(--gold)) !important;
          color: #000 !important;
        }

        .product-section {
          background:
            radial-gradient(circle at center, rgba(246,201,14,.12), transparent 36%),
            linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.01));
        }

        .product-card {
          position: relative;
          border: 1px solid rgba(246,201,14,.16) !important;
          border-radius: 34px !important;
          overflow: hidden;
          background: rgba(14,14,14,.78) !important;
          color: #fff !important;
          transition: .45s ease;
          box-shadow: 0 22px 55px rgba(0,0,0,.4);
          backdrop-filter: blur(18px);
        }

        .product-card:hover {
          transform: translateY(-10px) scale(1.01);
          box-shadow: 0 30px 76px rgba(246,201,14,.12), 0 30px 70px rgba(0,0,0,.6);
        }

        .product-image-box {
          height: 340px;
          background:
            radial-gradient(circle, rgba(246,201,14,.22), rgba(255,255,255,.04) 45%, transparent 72%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-image-box img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          filter:
            brightness(1.12)
            contrast(1.1)
            saturate(1.16)
            drop-shadow(0 22px 28px rgba(0,0,0,.58));
          transition: .6s ease;
        }

        .product-card:hover .product-image-box img {
          transform: scale(1.1) rotate(-2deg);
        }

        .product-body {
          padding: 34px !important;
        }

        .product-badge {
          display: inline-block;
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep));
          color: #000;
          padding: 7px 15px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 1000;
          text-transform: uppercase;
          letter-spacing: 1.2px;
        }

        .product-body h3 {
          margin-top: 18px;
          margin-bottom: 22px;
          font-size: 34px;
          font-weight: 1000;
          text-transform: uppercase;
          font-family: "Arial Black", Impact, sans-serif;
          color: var(--white-soft);
          letter-spacing: -.5px;
        }

        .newsletter-box {
          position: relative;
          padding: 55px 42px;
          border-radius: 36px;
          background:
            radial-gradient(circle at left, rgba(246,201,14,.18), transparent 40%),
            rgba(12,12,12,.78);
          border: 1px solid rgba(246,201,14,.18);
          box-shadow: 0 24px 70px rgba(0,0,0,.45);
          backdrop-filter: blur(18px);
          overflow: hidden;
        }

        .input-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .input-box svg {
          color: var(--gold);
          flex-shrink: 0;
          filter: drop-shadow(0 0 12px rgba(246,201,14,.35));
        }

        .input-box .form-control {
          min-height: 52px;
          border-radius: 999px;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(246,201,14,.22);
          color: #fff;
          font-weight: 700;
          backdrop-filter: blur(12px);
        }

        .input-box .form-control::placeholder {
          color: rgba(255,255,255,.45);
        }

        .input-box .form-control:focus {
          box-shadow: 0 0 0 .2rem rgba(246,201,14,.18);
          border-color: var(--gold);
          background: rgba(255,255,255,.09);
          color: #fff;
        }

        .reveal-card {
          opacity: 0;
          animation: slideUp .9s ease forwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(42px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes heroZoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }

        @keyframes shineText {
          0% { background-position: 0% center; }
          100% { background-position: 260% center; }
        }

        @media (max-width: 991px) {
          .hero-row {
            padding-top: 95px;
          }

          .hero-title {
            font-size: clamp(44px, 11vw, 78px);
            letter-spacing: -2px;
          }

          .section-space {
            padding: 70px 0;
          }

          .newsletter-box {
            padding: 42px 26px;
          }
        }

        @media (max-width: 767px) {
          .hero-carousel-wrap,
          .hero-slide,
          .hero-bg {
            min-height: 72vh;
            height: 72vh;
          }

          .hero-bg {
            object-position: center top;
            animation: none;
          }

          .hero-overlay {
            background:
              linear-gradient(to top, rgba(0,0,0,.82), rgba(0,0,0,.25)),
              linear-gradient(90deg, rgba(0,0,0,.5), rgba(0,0,0,.08));
          }

          .hero-row {
            min-height: 72vh;
            padding-top: 80px;
            align-items: end !important;
            padding-bottom: 70px;
          }

          .hero-badge,
          .section-mini {
            font-size: 10px;
            padding: 7px 13px;
            margin-bottom: 12px;
          }

          .hero-title {
            font-size: clamp(38px, 14vw, 56px);
            letter-spacing: -1px;
            line-height: .95;
          }

          .hero-buttons {
            gap: 10px;
            margin-top: 18px;
          }

          .btn-gold,
          .btn-glass {
            padding: 10px 16px !important;
            font-size: 12px !important;
            border-radius: 12px !important;
            width: auto;
          }

          .carousel-control-prev,
          .carousel-control-next {
            display: none;
          }

          .carousel-indicators {
            bottom: 18px;
          }

          .carousel-indicators button {
            width: 22px !important;
            height: 4px !important;
          }

          .section-space {
            padding: 55px 0;
          }

          .section-head {
            margin-bottom: 28px;
          }

          .section-head h2,
          .newsletter-box h2 {
            font-size: 32px;
            letter-spacing: -1px;
          }

          .category-card {
            min-height: 230px;
            height: 230px;
            border-radius: 22px !important;
          }

          .category-card img {
            height: 230px;
          }

          .category-content {
            padding: 16px !important;
          }

          .category-content h4 {
            font-size: 18px;
            margin-bottom: 10px;
          }

          .category-btn {
            padding: 6px 12px !important;
            font-size: 11px !important;
          }

          .product-card {
            border-radius: 24px !important;
          }

          .product-image-box {
            height: 240px;
          }

          .product-body {
            padding: 22px !important;
            text-align: center;
          }

          .product-badge {
            font-size: 10px;
            padding: 6px 12px;
          }

          .product-body h3 {
            font-size: 24px;
            margin: 14px 0 18px;
          }

          .view-all-btn {
            padding: 9px 14px !important;
            font-size: 11px !important;
          }

          .newsletter-box {
            padding: 30px 18px;
            border-radius: 24px;
            text-align: center;
          }

          .input-box {
            gap: 8px;
          }

          .input-box .form-control {
            min-height: 46px;
            font-size: 14px;
          }
        }

        @media (max-width: 420px) {
          .container {
            padding-left: 14px !important;
            padding-right: 14px !important;
          }

          .hero-carousel-wrap,
          .hero-slide,
          .hero-bg {
            min-height: 68vh;
            height: 68vh;
          }

          .hero-row {
            min-height: 68vh;
            padding-bottom: 62px;
          }

          .hero-title {
            font-size: 40px;
          }

          .hero-buttons {
            flex-direction: row;
          }

          .btn-gold,
          .btn-glass {
            padding: 9px 13px !important;
            font-size: 11px !important;
          }

          .category-card {
            min-height: 210px;
            height: 210px;
          }

          .category-card img {
            height: 210px;
          }

          .category-content h4 {
            font-size: 16px;
          }

          .product-image-box {
            height: 220px;
          }

          .newsletter-box h2 {
            font-size: 30px;
          }
        }
      `}</style>
    </main>
  );
}