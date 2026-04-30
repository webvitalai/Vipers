import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  ArrowLeft,
  Trash,
  Plus,
  Dash,
  Cart3,
  BagCheck,
} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCart);
  }, []);

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQuantity = (name, category) => {
    const updatedCart = cartItems.map((item) =>
      item.name === name && item.category === category
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updatedCart);
  };

  const decreaseQuantity = (name, category) => {
    const updatedCart = cartItems
      .map((item) =>
        item.name === name && item.category === category
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeItem = (name, category) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.name === name && item.category === category)
    );

    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const getPriceNumber = (price) => {
    return Number(String(price).replace("£", "")) || 0;
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + getPriceNumber(item.price) * item.quantity,
      0
    );
  }, [cartItems]);

  const delivery = cartItems.length > 0 ? 9.99 : 0;
  const total = subtotal + delivery;

  return (
    <main className="cart-page">
      <Container>
        <div className="cart-header">
          <Button className="continue-btn" onClick={() => navigate("/categories")}>
            <ArrowLeft /> Continue Shopping
          </Button>

          <div>
            <span className="mini-title">Shopping Cart</span>
            <h1>Your Cart</h1>
            <p>Review your selected Viper Sports products.</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">
              <Cart3 />
            </div>

            <h2>Your Cart Is Empty</h2>
            <p>Add products from the categories page to see them here.</p>

            <Button className="checkout-btn" onClick={() => navigate("/categories")}>
              Shop Products
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            <Col lg={8}>
              <div className="cart-list">
                {cartItems.map((item, index) => (
                  <div className="cart-item" key={index}>
                    <div className="cart-img">
                      <img src={item.img} alt={item.name} />
                    </div>

                    <div className="cart-info">
                      <span>{item.category}</span>
                      <h3>{item.name}</h3>
                      <strong>{item.price}</strong>
                    </div>

                    <div className="qty-control">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.name, item.category)}
                      >
                        <Dash />
                      </button>

                      <b>{item.quantity}</b>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.name, item.category)}
                      >
                        <Plus />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeItem(item.name, item.category)}
                    >
                      <Trash />
                    </button>
                  </div>
                ))}
              </div>
            </Col>

            <Col lg={4}>
              <div className="summary-box">
                <span className="mini-title">Order Details</span>
                <h3>Summary</h3>

                <div className="summary-row">
                  <span>Items</span>
                  <b>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</b>
                </div>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <b>£{subtotal.toFixed(2)}</b>
                </div>

                <div className="summary-row">
                  <span>Delivery</span>
                  <b>£{delivery.toFixed(2)}</b>
                </div>

                <div className="summary-line"></div>

                <div className="summary-row total">
                  <span>Total</span>
                  <b>£{total.toFixed(2)}</b>
                </div>

                <Button className="checkout-btn">
                  <BagCheck /> Checkout
                </Button>

                <button className="clear-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </Col>
          </Row>
        )}
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

        .cart-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(246,201,14,.14), transparent 32%),
            radial-gradient(circle at bottom right, rgba(184,134,11,.12), transparent 34%),
            var(--black);
          color: var(--white-soft);
          padding: 130px 0 85px;
          font-family: "Trebuchet MS", Arial, sans-serif;
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 38px;
        }

        .mini-title {
          display: inline-flex;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(246,201,14,.13);
          border: 1px solid rgba(246,201,14,.32);
          color: var(--gold);
          font-size: 12px;
          font-weight: 1000;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 14px;
          backdrop-filter: blur(14px);
        }

        .cart-header h1 {
          font-size: clamp(42px, 7vw, 78px);
          font-weight: 1000;
          font-family: "Arial Black", Impact, sans-serif;
          text-transform: uppercase;
          line-height: .95;
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

        .cart-header p {
          margin: 12px 0 0;
          color: var(--muted);
          font-weight: 800;
        }

        .continue-btn {
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
          white-space: nowrap;
        }

        .continue-btn:hover {
          background: linear-gradient(135deg, var(--gold-soft), var(--gold)) !important;
          color: #050505 !important;
        }

        .cart-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-item,
        .summary-box,
        .empty-cart {
          position: relative;
          background:
            radial-gradient(circle at top left, rgba(246,201,14,.12), transparent 34%),
            rgba(14,14,14,.78);
          border: 1px solid rgba(246,201,14,.18);
          box-shadow: 0 24px 70px rgba(0,0,0,.45);
          backdrop-filter: blur(18px);
        }

        .cart-item {
          display: grid;
          grid-template-columns: 125px 1fr auto auto;
          align-items: center;
          gap: 18px;
          padding: 17px;
          border-radius: 28px;
          transition: .35s ease;
        }

        .cart-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 75px rgba(246,201,14,.12), 0 30px 70px rgba(0,0,0,.6);
        }

        .cart-img {
          width: 125px;
          height: 125px;
          border-radius: 20px;
          background:
            radial-gradient(circle, rgba(246,201,14,.2), rgba(255,255,255,.04) 50%, transparent 75%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .cart-img img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 10px;
          filter: drop-shadow(0 18px 22px rgba(0,0,0,.55));
        }

        .cart-info span {
          display: inline-block;
          color: var(--gold);
          font-size: 11px;
          font-weight: 1000;
          text-transform: uppercase;
          letter-spacing: 1.4px;
          margin-bottom: 7px;
        }

        .cart-info h3 {
          font-size: 21px;
          font-family: "Arial Black", Impact, sans-serif;
          text-transform: uppercase;
          font-weight: 1000;
          margin-bottom: 8px;
          color: var(--white-soft);
        }

        .cart-info strong {
          color: var(--gold);
          font-size: 18px;
          font-weight: 1000;
        }

        .qty-control {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(246,201,14,.14);
        }

        .qty-control button,
        .remove-btn {
          width: 38px;
          height: 38px;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: .3s ease;
        }

        .qty-control button {
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep));
          color: #050505;
        }

        .qty-control button:hover {
          transform: scale(1.08);
        }

        .qty-control b {
          min-width: 22px;
          text-align: center;
          color: var(--white-soft);
        }

        .remove-btn {
          background: rgba(255,0,0,.12);
          color: #ff5b5b;
          border: 1px solid rgba(255,80,80,.28);
        }

        .remove-btn:hover {
          background: rgba(255,0,0,.2);
          transform: rotate(-6deg) scale(1.05);
        }

        .summary-box {
          position: sticky;
          top: 125px;
          padding: 26px;
          border-radius: 30px;
        }

        .summary-box h3 {
          font-family: "Arial Black", Impact, sans-serif;
          font-size: 28px;
          text-transform: uppercase;
          margin-bottom: 22px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          color: var(--muted);
          font-weight: 900;
        }

        .summary-row b {
          color: var(--white-soft);
        }

        .summary-line {
          height: 1px;
          background: rgba(246,201,14,.2);
          margin: 18px 0;
        }

        .summary-row.total {
          color: var(--gold);
          font-size: 22px;
        }

        .summary-row.total b {
          color: var(--gold);
        }

        .checkout-btn {
          width: 100%;
          border: none !important;
          border-radius: 18px !important;
          padding: 14px 18px !important;
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep)) !important;
          color: #050505 !important;
          font-weight: 1000 !important;
          text-transform: uppercase;
          letter-spacing: 1.3px;
          display: flex !important;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          box-shadow: 0 18px 38px rgba(246,201,14,.22);
        }

        .clear-btn {
          width: 100%;
          margin-top: 12px;
          border: none;
          background: transparent;
          color: #ff5b5b;
          font-weight: 1000;
          padding: 10px;
        }

        .empty-cart {
          max-width: 680px;
          margin: 45px auto;
          text-align: center;
          padding: 60px 28px;
          border-radius: 34px;
        }

        .empty-icon {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: rgba(246,201,14,.12);
          color: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 22px;
          font-size: 40px;
          border: 1px solid rgba(246,201,14,.24);
        }

        .empty-cart h2 {
          font-family: "Arial Black", Impact, sans-serif;
          text-transform: uppercase;
          font-size: 32px;
          background: linear-gradient(135deg, var(--gold-soft), var(--gold), var(--gold-deep));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .empty-cart p {
          color: var(--muted);
          font-weight: 800;
          margin-bottom: 24px;
        }

        @keyframes shineText {
          0% { background-position: 0% center; }
          100% { background-position: 260% center; }
        }

        @media(max-width: 768px) {
          .cart-page {
            padding: 115px 0 60px;
          }

          .cart-header {
            flex-direction: column-reverse;
            align-items: flex-start;
          }

          .cart-item {
            grid-template-columns: 92px 1fr;
            border-radius: 24px;
          }

          .cart-img {
            width: 92px;
            height: 92px;
            border-radius: 18px;
          }

          .cart-info h3 {
            font-size: 15px;
          }

          .qty-control {
            grid-column: span 2;
            justify-content: center;
          }

          .remove-btn {
            grid-column: span 2;
            width: 100%;
            border-radius: 999px;
          }

          .summary-box {
            position: static;
            border-radius: 24px;
          }

          .empty-cart {
            border-radius: 26px;
            padding: 45px 22px;
          }
        }
      `}</style>
    </main>
  );
}