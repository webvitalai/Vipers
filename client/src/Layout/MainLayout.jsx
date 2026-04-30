import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUp, Whatsapp, Search, Cart3, X } from "react-bootstrap-icons";
import { Badge } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  const navigate = useNavigate();

  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    updateCartCount();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    navigate(`/categories?search=${searchQuery}`);
    setShowSearch(false);
    setSearchQuery("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <Outlet />
      <Footer />

      {/* 🔥 TOP RIGHT FLOATING ICONS */}
      <div className="floating-top-icons">
        <button
          className="floating-btn"
          onClick={() => setShowSearch(!showSearch)}
        >
          {showSearch ? <X /> : <Search />}
        </button>

        <button
          className="floating-btn cart-btn"
          onClick={() => navigate("/cart")}
        >
          <Cart3 />
          <Badge pill>{cartCount}</Badge>
        </button>
      </div>

      {/* 🔍 SEARCH BOX */}
      {showSearch && (
        <form className="floating-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button type="submit">
            <Search /> Search
          </button>
        </form>
      )}

      {/* 💬 WHATSAPP */}
      <a
        href="https://wa.me/447700900341"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float-btn"
      >
        <Whatsapp />
      </a>

      {/* ⬆ SCROLL TOP */}
      {showTopBtn && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          <ArrowUp />
        </button>
      )}

      <style>{`
        :root {
          --gold:#f6c90e;
          --gold-soft:#fff2a6;
          --gold-deep:#b8860b;
        }

        /* ===== FLOATING ICONS CONTAINER ===== */
        .floating-top-icons{
          position:fixed;
          top:100px;
          right:20px;
          z-index:9999;
          display:flex;
          flex-direction:row;
          gap:12px;
          padding:6px 10px;
          border-radius:999px;
          background:rgba(0,0,0,.55);
          backdrop-filter:blur(12px);
          border:1px solid rgba(246,201,14,.2);
        }

        /* ===== ICON BUTTON ===== */
        .floating-btn{
          width:50px;
          height:50px;
          border-radius:14px;
          border:1px solid rgba(246,201,14,.35);
          background:
            radial-gradient(circle at top left, rgba(255,242,166,.45), transparent 42%),
            linear-gradient(135deg,#0a0a0a,#221b09);
          color:var(--gold);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:20px;
          box-shadow:0 12px 30px rgba(0,0,0,.4);
          position:relative;
          transition:.3s;
        }

        .floating-btn:hover{
          background:linear-gradient(135deg,var(--gold-soft),var(--gold));
          color:#000;
          transform:translateY(-4px) scale(1.05);
        }

        /* ===== CART BADGE ===== */
        .cart-btn .badge{
          position:absolute;
          top:-8px;
          right:-8px;
          background:linear-gradient(135deg,#fff2a6,#f6c90e,#b8860b);
          color:#000;
          font-size:11px;
          font-weight:900;
          min-width:20px;
          height:20px;
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:50%;
          box-shadow:0 0 12px rgba(246,201,14,.6);
        }

        /* ===== SEARCH BOX ===== */
        .floating-search{
          position:fixed;
          top:170px;
          right:20px;
          width:320px;
          background:#0a0a0a;
          border:1px solid rgba(246,201,14,.3);
          border-radius:18px;
          padding:12px;
          box-shadow:0 20px 60px rgba(0,0,0,.5);
          display:flex;
          flex-direction:column;
          gap:10px;
          z-index:9999;
        }

        .floating-search input{
          height:45px;
          border-radius:12px;
          border:1px solid rgba(246,201,14,.2);
          background:rgba(255,255,255,.05);
          color:#fff;
          padding:0 12px;
          outline:none;
        }

        .floating-search button{
          height:45px;
          border:none;
          border-radius:12px;
          background:linear-gradient(135deg,var(--gold-soft),var(--gold));
          color:#000;
          font-weight:700;
        }

        /* ===== WHATSAPP ===== */
        .whatsapp-float-btn{
          position:fixed;
          right:20px;
          bottom:90px;
          width:55px;
          height:55px;
          border-radius:16px;
          background:linear-gradient(135deg,#25D366,#128C7E);
          color:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:26px;
          z-index:9999;
        }

        /* ===== SCROLL TOP ===== */
        .scroll-top-btn{
          position:fixed;
          right:20px;
          bottom:20px;
          width:50px;
          height:50px;
          border:none;
          border-radius:16px;
          background:linear-gradient(135deg,var(--gold-soft),var(--gold));
          color:#000;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:22px;
          z-index:9999;
        }

        /* ===== MOBILE ===== */
        @media(max-width:480px){
          .floating-search{
            width:90%;
            right:5%;
          }
        }
      `}</style>
    </>
  );
}