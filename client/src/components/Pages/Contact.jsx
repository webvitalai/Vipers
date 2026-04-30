import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import {
  Whatsapp,
  Envelope,
  Telephone,
  GeoAlt,
  Send,
  BoxSeam,
} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    category: "",
    product: "",
    size: "",
    quantity: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const productsByCategory = {
    Boxing: ["Men Boxing Kit", "Women Boxing Kit", "Boxing Shoes", "Punching Bag"],
    Football: ["Football Kit", "Training Jersey", "Football Kit Bag", "Match Gloves"],
    "Martial Arts": ["Karate Uniform", "Training Gloves", "Martial Belt", "Protection Set"],
    Gym: ["Gym T-Shirt", "Training Shorts", "Gym Gloves", "Sports Bag"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData({
        ...formData,
        category: value,
        product: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Product Inquiry:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      category: "",
      product: "",
      size: "",
      quantity: "",
      message: "",
    });

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="contact-page">
      <Container>
        <section className="contact-hero">
          <span className="mini-title">Product Inquiry</span>
          <h1>
            Contact <span>Viper Sports</span>
          </h1>
          <p>
            Ask about product availability, sizes, bulk orders, custom kits, or
            quotation details.
          </p>
        </section>

        <Row className="g-4 align-items-stretch">
          <Col lg={5}>
            <div className="info-panel">
              <h2>Get in Touch</h2>
              <p>
                Fill the product inquiry form and our team will contact you with
                details.
              </p>

              <div className="info-card">
                <Whatsapp />
                <div>
                  <strong>WhatsApp</strong>
                  <span>+44 0000 000000</span>
                </div>
              </div>

              <div className="info-card">
                <Envelope />
                <div>
                  <strong>Email</strong>
                  <span>info@vipersports.com</span>
                </div>
              </div>

              <div className="info-card">
                <Telephone />
                <div>
                  <strong>Phone</strong>
                  <span>+44 0000 000000</span>
                </div>
              </div>

              <div className="info-card">
                <GeoAlt />
                <div>
                  <strong>Location</strong>
                  <span>United Kingdom</span>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={7}>
            <Card className="form-card">
              <Card.Body>
                <div className="form-head">
                  <BoxSeam />
                  <div>
                    <span>Request Quote</span>
                    <h3>Product Inquiry Form</h3>
                  </div>
                </div>

                {submitted && (
                  <div className="success-msg">
                    Thanks! Your product inquiry has been submitted. Our team
                    will contact you soon.
                  </div>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>WhatsApp Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="whatsapp"
                          placeholder="Enter WhatsApp number"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select category</option>
                          <option value="Boxing">Boxing</option>
                          <option value="Football">Football</option>
                          <option value="Martial Arts">Martial Arts</option>
                          <option value="Gym">Gym</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Product</Form.Label>
                        <Form.Select
                          name="product"
                          value={formData.product}
                          onChange={handleChange}
                          required
                          disabled={!formData.category}
                        >
                          <option value="">
                            {formData.category
                              ? "Select product"
                              : "Select category first"}
                          </option>

                          {formData.category &&
                            productsByCategory[formData.category].map((product) => (
                              <option key={product} value={product}>
                                {product}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Size</Form.Label>
                        <Form.Select
                          name="size"
                          value={formData.size}
                          onChange={handleChange}
                        >
                          <option value="">Select size</option>
                          <option value="Small">S</option>
                          <option value="Medium">M</option>
                          <option value="Large">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                          <option value="Custom">Custom</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          name="quantity"
                          min="1"
                          placeholder="Qty"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Message / Requirements</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          placeholder="Write details: color, custom logo, delivery location, bulk order, etc."
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Button type="submit" className="submit-btn">
                        <Send /> Submit Inquiry
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>{`
        :root {
          --gold: #f6c90e;
          --gold-soft: #fff2a6;
          --gold-deep: #b8860b;
          --black: #050505;
          --white-soft: #fffaf0;
          --muted: rgba(255,250,240,.68);
        }

        .contact-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(246,201,14,.14), transparent 30%),
            radial-gradient(circle at bottom right, rgba(184,134,11,.12), transparent 30%),
            var(--black);
          color: var(--white-soft);
          padding: 135px 0 85px;
          font-family: "Trebuchet MS", Arial, sans-serif;
        }

        .contact-hero {
          max-width: 900px;
          margin: 0 auto 48px;
          text-align: center;
        }

        .mini-title {
          display: inline-flex;
          padding: 8px 18px;
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
        }

        .contact-hero h1 {
          font-size: clamp(42px, 7vw, 82px);
          font-weight: 1000;
          font-family: "Arial Black", Impact, sans-serif;
          text-transform: uppercase;
          letter-spacing: -2px;
          margin: 0;
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

        .contact-hero p {
          color: var(--muted);
          font-size: 17px;
          font-weight: 700;
          margin-top: 15px;
        }

        .info-panel,
        .form-card {
          height: 100%;
          border-radius: 34px;
          background:
            radial-gradient(circle at top left, rgba(246,201,14,.14), transparent 35%),
            rgba(14,14,14,.78) !important;
          border: 1px solid rgba(246,201,14,.18) !important;
          box-shadow: 0 24px 70px rgba(0,0,0,.45);
          backdrop-filter: blur(18px);
          position: relative;
          overflow: hidden;
        }

        .info-panel {
          padding: 34px;
        }

        .info-panel h2 {
          font-family: "Arial Black", Impact, sans-serif;
          font-size: 34px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .info-panel p {
          color: var(--muted);
          font-weight: 700;
          margin-bottom: 28px;
        }

        .info-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px;
          border-radius: 22px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(246,201,14,.13);
          margin-bottom: 15px;
          transition: .35s ease;
        }

        .info-card:hover {
          transform: translateY(-4px);
          border-color: rgba(246,201,14,.4);
          box-shadow: 0 18px 38px rgba(246,201,14,.1);
        }

        .info-card svg {
          width: 42px;
          height: 42px;
          padding: 10px;
          border-radius: 14px;
          background: linear-gradient(135deg, var(--gold-soft), var(--gold));
          color: #050505;
          flex-shrink: 0;
        }

        .info-card strong {
          display: block;
          font-size: 15px;
          font-weight: 1000;
          text-transform: uppercase;
        }

        .info-card span {
          display: block;
          color: var(--muted);
          font-size: 14px;
          margin-top: 4px;
        }

        .form-card .card-body {
          padding: 34px !important;
        }

        .form-head {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .form-head svg {
          width: 48px;
          height: 48px;
          padding: 11px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep));
          color: #050505;
        }

        .form-head span {
          color: var(--gold);
          font-size: 12px;
          font-weight: 1000;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .form-head h3 {
          font-family: "Arial Black", Impact, sans-serif;
          text-transform: uppercase;
          margin: 3px 0 0;
          font-size: 28px;
        }

        .form-label {
          color: rgba(255,250,240,.82);
          font-weight: 900;
          font-size: 13px;
          margin-bottom: 8px;
        }

        .form-control,
        .form-select {
          min-height: 52px;
          border-radius: 16px !important;
          background-color: rgba(255,255,255,.07) !important;
          border: 1px solid rgba(246,201,14,.18) !important;
          color: #fff !important;
          font-weight: 700;
          box-shadow: none !important;
        }

        .form-control::placeholder {
          color: rgba(255,255,255,.42);
        }

        .form-select option {
          background: #111;
          color: #fff;
        }

        textarea.form-control {
          padding-top: 14px;
        }

        .form-control:focus,
        .form-select:focus {
          border-color: var(--gold) !important;
          box-shadow: 0 0 0 .18rem rgba(246,201,14,.16) !important;
        }

        .submit-btn {
          width: 100%;
          min-height: 56px;
          border: none !important;
          border-radius: 18px !important;
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep)) !important;
          color: #050505 !important;
          font-weight: 1000 !important;
          text-transform: uppercase;
          letter-spacing: 1.3px;
          display: flex !important;
          align-items: center;
          justify-content: center;
          gap: 9px;
          box-shadow: 0 18px 38px rgba(246,201,14,.22);
        }

        .submit-btn:hover {
          transform: translateY(-4px);
        }

        .success-msg {
          padding: 14px 16px;
          border-radius: 16px;
          margin-bottom: 18px;
          background: rgba(246,201,14,.12);
          border: 1px solid rgba(246,201,14,.28);
          color: var(--gold);
          font-weight: 900;
        }

        @keyframes shineText {
          0% { background-position: 0% center; }
          100% { background-position: 260% center; }
        }

        @media(max-width: 768px) {
          .contact-page {
            padding: 115px 0 60px;
          }

          .info-panel,
          .form-card {
            border-radius: 26px;
          }

          .info-panel,
          .form-card .card-body {
            padding: 24px !important;
          }

          .form-head h3 {
            font-size: 22px;
          }
        }
      `}</style>
    </main>
  );
}