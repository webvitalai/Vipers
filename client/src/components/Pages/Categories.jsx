import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ArrowLeft, Cart3, Search, Fire } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function Categories() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const categories = {
    Boxing: {
      banner: "/Images/BOXING.png",
      products: [
        { name: "Men Boxing Kit", price: "£149.99", img: "/Images/vg1.png" },
        { name: "Women Boxing Kit", price: "£129.99", img: "/Images/vg2.png" },
        { name: "Boxing Shoes", price: "£89.99", img: "/Images/2.png" },
        { name: "Punching Bag", price: "£199.99", img: "/Images/8.png" },
      ],
    },

    Football: {
      banner: "/Images/banner_2.png",
      products: [
        { name: "Football Kit", price: "£99.99", img: "/Images/3.png" },
        { name: "Training Jersey", price: "£59.99", img: "/Images/13.png" },
        { name: "Football Kit Bag", price: "£79.99", img: "/Images/10.png" },
        { name: "Match Gloves", price: "£39.99", img: "/Images/vg5.png" },
      ],
    },

    "Martial Arts": {
      banner: "/Images/MARTIAL ARTS.png",
      products: [
        { name: "Karate Uniform", price: "£89.99", img: "/Images/vg8.png" },
        { name: "Training Gloves", price: "£49.99", img: "/Images/vg7.png" },
        { name: "Martial Belt", price: "£19.99", img: "/Images/m2.png" },
        { name: "Protection Set", price: "£119.99", img: "/Images/m1.png" },
      ],
    },

    Gym: {
      banner: "/Images/GYM.png",
      products: [
        { name: "Gym T-Shirt", price: "£34.99", img: "/Images/17.png" },
        { name: "Training Shorts", price: "£29.99", img: "/Images/2.png" },
        { name: "Gym Gloves", price: "£24.99", img: "/Images/vg6.png" },
        { name: "Sports Bag", price: "£69.99", img: "/Images/vg4.png" },
      ],
    },
  };

  const normalizeText = (value) =>
    String(value || "").toLowerCase().replace(/\s+/g, " ").trim();

  const formatCategoryName = (slug) => {
    if (!slug) return "Boxing";

    const name = decodeURIComponent(slug)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return name === "Gym Wear" ? "Gym" : name;
  };

  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";
  const categoryQuery = params.get("category") || "";

  const getValidCategory = (value) => {
    if (!value) return null;

    const decoded = decodeURIComponent(value);

    return Object.keys(categories).find(
      (cat) =>
        normalizeText(cat) === normalizeText(decoded) ||
        normalizeText(cat).includes(normalizeText(decoded)) ||
        normalizeText(decoded).includes(normalizeText(cat))
    );
  };

  const initialCategory =
    getValidCategory(categoryQuery) ||
    getValidCategory(formatCategoryName(categoryName)) ||
    "Boxing";

  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const selectedCategory =
      getValidCategory(categoryQuery) ||
      getValidCategory(formatCategoryName(categoryName));

    if (selectedCategory) {
      setActiveCategory(selectedCategory);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [categoryQuery, categoryName]);

  const allProducts = useMemo(() => {
    return Object.keys(categories).flatMap((cat) =>
      categories[cat].products.map((product) => ({
        ...product,
        category: cat,
      }))
    );
  }, []);

  const exactSearchCategory = getValidCategory(searchQuery);

  useEffect(() => {
    if (exactSearchCategory) {
      setActiveCategory(exactSearchCategory);
      navigate(`/categories?category=${encodeURIComponent(exactSearchCategory)}`, {
        replace: true,
      });
    }
  }, [searchQuery]);

  const filteredProducts = allProducts.filter((product) => {
    const query = normalizeText(searchQuery);

    return (
      normalizeText(product.name).includes(query) ||
      normalizeText(product.category).includes(query)
    );
  });

  const isSearchMode = searchQuery && !exactSearchCategory;
  const activeData = categories[activeCategory] || categories.Boxing;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    navigate(`/categories?category=${encodeURIComponent(cat)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product) => {
    const oldCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItem = oldCart.find(
      (item) => item.name === product.name && item.category === product.category
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = oldCart.map((item) =>
        item.name === product.name && item.category === product.category
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...oldCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/cart");
  };

  const productsToShow = isSearchMode
    ? filteredProducts
    : activeData.products.map((product) => ({
        ...product,
        category: activeCategory,
      }));

  return (
    <main className="category-page">
      <Container fluid className="px-lg-4 px-2">
        <section className="category-hero">
          <img
            src={isSearchMode ? "/Images/BOXING.png" : activeData.banner}
            alt={isSearchMode ? "Search Results" : activeCategory}
          />

          <div className="category-hero-overlay"></div>

          <div className="category-hero-content">
            <span>
              <Fire /> {isSearchMode ? "Product Search" : "Premium Gear"}
            </span>

            <h1>{isSearchMode ? "Search Results" : activeCategory}</h1>

            {isSearchMode && (
              <p>
                Showing results for <b>"{searchQuery}"</b>
              </p>
            )}
          </div>
        </section>

        <div className="top-actions">
          <Button className="back-btn" onClick={() => navigate("/")}>
            <ArrowLeft /> Back to Home
          </Button>
        </div>

        <div className="category-tabs">
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={!isSearchMode && activeCategory === cat ? "active" : ""}
            >
              {cat}
            </button>
          ))}
        </div>

        {isSearchMode && (
          <div className="search-info-box">
            <Search />
            <span>
              {filteredProducts.length > 0
                ? `${filteredProducts.length} product found`
                : "No product found"}
            </span>
          </div>
        )}

        <Row className="g-3 g-md-4">
          {productsToShow.length > 0 ? (
            productsToShow.map((product, index) => (
              <Col xs={6} lg={3} key={index}>
                <Card
                  className="product-box reveal-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="product-img-wrap">
                    <img src={product.img} alt={product.name} />
                  </div>

                  <Card.Body>
                    <small>{product.category}</small>

                    <h4>{product.name}</h4>

                    <div className="price-row">
                      <span>{product.price}</span>

                      <button onClick={() => addToCart(product)}>
                        <Cart3 />
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <div className="no-result-box">
                <h3>No Products Found</h3>
                <p>
                  Try searching Boxing, Football, Martial Arts, Gym, Gloves, Kit,
                  Jersey etc.
                </p>

                <Button onClick={() => navigate("/categories")} className="back-btn">
                  View All Categories
                </Button>
              </div>
            </Col>
          )}
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

        .category-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(246,201,14,.14), transparent 32%),
            radial-gradient(circle at bottom right, rgba(184,134,11,.12), transparent 34%),
            var(--black);
          color: var(--white-soft);
          padding: 100px 0 85px;
          font-family: "Trebuchet MS", Arial, sans-serif;
          overflow: hidden;
        }

        .category-hero {
          position: relative;
          width: 100%;
          max-width: 1217px;
          height: 600px;
          margin: 0 auto 24px;
          border-radius: 34px;
          overflow: hidden;
          background: rgba(14,14,14,.78);
          border: 1px solid rgba(246,201,14,.18);
          box-shadow: 0 28px 80px rgba(0,0,0,.55);
        }

        .category-hero::before {
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
          z-index: 3;
        }

        .category-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: brightness(.88) contrast(1.12) saturate(1.15);
          transform: scale(1.01);
          animation: heroZoom 7s ease-in-out infinite alternate;
        }

        .category-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 55%, rgba(246,201,14,.22), transparent 28%),
            linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.36), rgba(0,0,0,.1)),
            linear-gradient(to top, rgba(0,0,0,.75), transparent);
        }

        .category-hero-content {
          position: absolute;
          left: 48px;
          bottom: 42px;
          z-index: 4;
          max-width: 760px;
        }

        .category-hero-content span {
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
          margin-bottom: 16px;
          backdrop-filter: blur(14px);
        }

        .category-hero-content h1 {
          font-size: clamp(44px, 7vw, 82px);
          font-weight: 1000;
          font-family: "Arial Black", Impact, sans-serif;
          text-transform: uppercase;
          line-height: .95;
          letter-spacing: -2px;
          margin: 0;
          background: linear-gradient(
            110deg,
            #fff8d9 0%,
            var(--gold-soft) 20%,
            var(--gold) 38%,
            #ffffff 50%,
            var(--gold) 62%,
            var(--gold-deep) 82%
          );
          background-size: 260% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shineText 4s linear infinite;
        }

        .category-hero-content p {
          color: var(--muted);
          font-size: 17px;
          font-weight: 800;
          margin-top: 14px;
        }

        .top-actions {
          max-width: 1217px;
          margin: 0 auto 22px;
        }

        .back-btn {
          background: rgba(255,255,255,.07) !important;
          color: var(--white-soft) !important;
          border: 1px solid rgba(246,201,14,.2) !important;
          border-radius: 999px !important;
          padding: 11px 20px !important;
          font-size: 12px !important;
          font-weight: 1000 !important;
          display: inline-flex !important;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(14px);
          transition: .35s ease !important;
        }

        .back-btn:hover {
          background: linear-gradient(135deg, var(--gold-soft), var(--gold)) !important;
          color: #050505 !important;
          transform: translateY(-3px);
        }

        .category-tabs {
          max-width: 1217px;
          margin: 0 auto 32px;
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding: 8px 0 12px;
        }

        .category-tabs::-webkit-scrollbar {
          display: none;
        }

        .category-tabs button {
          border: 1px solid rgba(246,201,14,.18);
          background: rgba(255,255,255,.06);
          color: rgba(255,250,240,.86);
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 1000;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          white-space: nowrap;
          backdrop-filter: blur(12px);
          transition: .35s ease;
        }

        .category-tabs button.active,
        .category-tabs button:hover {
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep));
          color: #050505;
          box-shadow: 0 16px 34px rgba(246,201,14,.16);
          transform: translateY(-3px);
        }

        .search-info-box {
          max-width: 1217px;
          margin: 0 auto 25px;
          padding: 15px 18px;
          border-radius: 20px;
          background: rgba(246,201,14,.1);
          border: 1px solid rgba(246,201,14,.24);
          color: var(--gold);
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 1000;
          backdrop-filter: blur(14px);
        }

        .product-box {
          position: relative;
          border: 1px solid rgba(246,201,14,.16) !important;
          border-radius: 28px !important;
          overflow: hidden;
          background: rgba(14,14,14,.78) !important;
          color: var(--white-soft) !important;
          height: 100%;
          transition: .45s ease;
          box-shadow: 0 22px 55px rgba(0,0,0,.38);
          backdrop-filter: blur(18px);
        }

        .product-box::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,242,166,.45), transparent, rgba(246,201,14,.3));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: .7;
          z-index: 2;
        }

        .product-box:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 30px 75px rgba(246,201,14,.12), 0 30px 70px rgba(0,0,0,.6);
        }

        .product-img-wrap {
          width: 100%;
          height: 270px;
          background:
            radial-gradient(circle, rgba(246,201,14,.22), rgba(255,255,255,.04) 48%, transparent 72%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .product-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 14px;
          filter:
            brightness(1.12)
            contrast(1.1)
            saturate(1.16)
            drop-shadow(0 22px 28px rgba(0,0,0,.58));
          transition: .6s ease;
        }

        .product-box:hover .product-img-wrap img {
          transform: scale(1.1) rotate(-2deg);
        }

        .product-box .card-body {
          padding: 19px !important;
          position: relative;
          z-index: 3;
        }

        .product-box small {
          display: inline-block;
          color: var(--gold);
          font-size: 11px;
          font-weight: 1000;
          text-transform: uppercase;
          letter-spacing: 1.4px;
          margin-bottom: 9px;
        }

        .product-box h4 {
          font-size: 17px;
          font-weight: 1000;
          font-family: "Arial Black", Impact, sans-serif;
          text-transform: uppercase;
          letter-spacing: -.3px;
          margin-bottom: 16px;
          min-height: 45px;
          color: var(--white-soft);
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price-row span {
          color: var(--gold);
          font-size: 18px;
          font-weight: 1000;
        }

        .price-row button {
          width: 42px;
          height: 42px;
          border: none;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep));
          color: #050505;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: .35s ease;
          box-shadow: 0 14px 30px rgba(246,201,14,.18);
        }

        .price-row button:hover {
          transform: translateY(-3px) rotate(-6deg);
        }

        .no-result-box {
          max-width: 720px;
          margin: 30px auto;
          text-align: center;
          padding: 48px 28px;
          border-radius: 30px;
          background: rgba(14,14,14,.78);
          border: 1px solid rgba(246,201,14,.18);
          backdrop-filter: blur(18px);
          box-shadow: 0 24px 70px rgba(0,0,0,.45);
        }

        .no-result-box h3 {
          font-family: "Arial Black", Impact, sans-serif;
          text-transform: uppercase;
          font-weight: 1000;
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .no-result-box p {
          color: var(--muted);
          font-weight: 800;
          margin: 12px 0 22px;
        }

        .reveal-card {
          opacity: 0;
          animation: slideUp .8s ease forwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(36px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroZoom {
          from { transform: scale(1.01); }
          to { transform: scale(1.08); }
        }

        @keyframes shineText {
          0% { background-position: 0% center; }
          100% { background-position: 260% center; }
        }

        @media(max-width: 768px) {
          .category-page {
            padding: 92px 0 60px;
          }

          .category-hero {
            height: 270px;
            border-radius: 24px;
          }

          .category-hero img {
            animation: none;
          }

          .category-hero-content {
            left: 20px;
            bottom: 22px;
          }

          .category-hero-content span {
            font-size: 10px;
            padding: 7px 13px;
            margin-bottom: 10px;
          }

          .category-hero-content h1 {
            font-size: 38px;
            letter-spacing: -1px;
          }

          .category-hero-content p {
            font-size: 13px;
          }

          .category-tabs button {
            padding: 10px 16px;
            font-size: 11px;
          }

          .product-img-wrap {
            height: 178px;
          }

          .product-box {
            border-radius: 22px !important;
          }

          .product-box .card-body {
            padding: 14px !important;
          }

          .product-box h4 {
            font-size: 13px;
            min-height: 36px;
          }

          .price-row span {
            font-size: 13px;
          }

          .price-row button {
            width: 34px;
            height: 34px;
          }
        }
      `}</style>
    </main>
  );
}