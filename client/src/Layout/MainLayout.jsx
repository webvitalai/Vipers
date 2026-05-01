import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUp, Search, Cart3, X, Whatsapp } from "react-bootstrap-icons";
import { Badge } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  const navigate = useNavigate();

  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const [showSpinner, setShowSpinner] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [reward, setReward] = useState(null);
  const [wheelRotation, setWheelRotation] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    const savedDiscount = JSON.parse(localStorage.getItem("viperDiscount"));
    const spinUsed = localStorage.getItem("viperSpinUsed");

    if (savedDiscount && savedDiscount.expiresAt > Date.now()) {
      setReward(savedDiscount);
      setShowSpinner(false);
    } else {
      localStorage.removeItem("viperDiscount");
      localStorage.removeItem("discount");

      if (!spinUsed) {
        setShowSpinner(true);
      } else {
        setShowSpinner(false);
      }
    }

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

  const spinWheel = () => {
    if (spinning || localStorage.getItem("viperSpinUsed")) return;

    setSpinning(true);

    const rewards = [
      { label: "10% OFF", type: "percent", value: 10, index: 0 },
      { label: "15% OFF", type: "percent", value: 15, index: 1 },
      { label: "20% OFF", type: "percent", value: 20, index: 2 },
      { label: "FREE DELIVERY", type: "delivery", value: 100, index: 3 },
    ];

    const random = rewards[Math.floor(Math.random() * rewards.length)];

    const segmentAngle = 90;
    const centerAngle = random.index * segmentAngle + segmentAngle / 2;
    const finalRotation = 360 * 6 + (360 - centerAngle);

    setWheelRotation(finalRotation);

    setTimeout(() => {
      const discountWithExpiry = {
        ...random,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      };

      setReward(discountWithExpiry);
      setSpinning(false);

      localStorage.setItem("viperSpinUsed", "true");
      localStorage.setItem("viperDiscount", JSON.stringify(discountWithExpiry));
      localStorage.setItem("discount", JSON.stringify(discountWithExpiry));

      window.dispatchEvent(new Event("discountUpdated"));
    }, 3200);
  };

  const closeSpinner = () => {
    setShowSpinner(false);
  };

  const shopNow = () => {
    setShowSpinner(false);
    navigate("/categories");
  };

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

      {showSpinner && (
        <div className="spin-overlay">
          <div className="spin-card">
            <button className="spin-close" onClick={closeSpinner}>
              ×
            </button>

            <div className="spin-top-badge">Limited Time</div>

            <h2>
              Spin & <span>Win</span>
            </h2>

            <p className="spin-sub">
              Win a discount and apply it automatically in your cart.
            </p>

            <div className="wheel-wrap">
              <div className="wheel-pointer"></div>

              <div
                className={`wheel ${spinning ? "spinning" : ""}`}
                style={{ transform: `rotate(${wheelRotation}deg)` }}
              >
                <div className="wheel-segment seg-1">10%</div>
                <div className="wheel-segment seg-2">15%</div>
                <div className="wheel-segment seg-3">20%</div>
                <div className="wheel-segment seg-4">FREE</div>
              </div>

              <div className="wheel-center">WIN</div>
            </div>

            {reward && (
              <div className="reward-box">
                <p>You won</p>
                <h4>{reward.label}</h4>
                <small>Valid for 24 hours. Auto-applies in cart.</small>

                <div className="reward-actions">
                  <button className="shop-now-btn" onClick={shopNow}>
                    Shop Now
                  </button>
                </div>
              </div>
            )}

            {!reward && (
              <button className="spin-btn" onClick={spinWheel}>
                {spinning ? "Spinning..." : "Spin Now"}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="floating-top-icons">
        <button
          className="floating-btn"
          onClick={() => setShowSearch(!showSearch)}
        >
          {showSearch ? <X size={18} /> : <Search size={18} />}
        </button>

        <button
          className="floating-btn cart-btn"
          onClick={() => navigate("/cart")}
        >
          <Cart3 size={18} />
          <Badge pill>{cartCount}</Badge>
        </button>
      </div>

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
            <Search size={16} /> Search
          </button>
        </form>
      )}

      <a
        href="https://wa.me/447398390815"
        target="_blank"
        rel="noreferrer"
        className={`whatsapp-float-btn ${showTopBtn ? "with-top-btn" : ""}`}
      >
        <Whatsapp />
      </a>

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

        .spin-overlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.84);
          backdrop-filter:blur(14px);
          z-index:99999;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:18px;
        }

        .spin-card{
          position:relative;
          width:100%;
          max-width:455px;
          padding:42px 28px 34px;
          border-radius:34px;
          text-align:center;
          background:
            radial-gradient(circle at 15% 0%, rgba(246,201,14,.22), transparent 38%),
            radial-gradient(circle at 85% 100%, rgba(184,134,11,.18), transparent 42%),
            linear-gradient(145deg, rgba(17,17,17,.98), rgba(2,2,2,.98));
          border:1px solid rgba(246,201,14,.38);
          box-shadow:0 35px 110px rgba(0,0,0,.82);
          animation:spinPopup .35s ease;
          color:#fff;
          overflow:hidden;
        }

        .spin-close{
          position:absolute;
          top:14px;
          right:16px;
          width:36px;
          height:36px;
          border:none;
          border-radius:50%;
          background:rgba(255,255,255,.08);
          color:#fff;
          font-size:25px;
          line-height:1;
          cursor:pointer;
          z-index:2;
        }

        .spin-top-badge{
          display:inline-flex;
          padding:8px 16px;
          border-radius:999px;
          background:rgba(246,201,14,.14);
          border:1px solid rgba(246,201,14,.28);
          color:var(--gold);
          font-size:11px;
          font-weight:1000;
          text-transform:uppercase;
          letter-spacing:2px;
          margin-bottom:12px;
        }

        .spin-card h2{
          margin:0;
          font-size:44px;
          font-weight:1000;
          text-transform:uppercase;
          font-family:"Arial Black", Impact, sans-serif;
        }

        .spin-card h2 span{
          background:linear-gradient(135deg,var(--gold-soft),var(--gold),var(--gold-deep));
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }

        .spin-sub{
          margin:10px auto 20px;
          color:rgba(255,255,255,.68);
          font-size:14px;
          font-weight:700;
          max-width:330px;
        }

        .wheel-wrap{
          position:relative;
          width:214px;
          height:214px;
          margin:25px auto;
        }

        .wheel-pointer{
          position:absolute;
          top:-8px;
          left:50%;
          transform:translateX(-50%);
          width:0;
          height:0;
          border-left:14px solid transparent;
          border-right:14px solid transparent;
          border-top:26px solid var(--gold);
          z-index:5;
        }

        .wheel{
          width:214px;
          height:214px;
          border-radius:50%;
          position:relative;
          background:
            conic-gradient(
              from 0deg,
              #b8860b 0deg 90deg,
              #111 90deg 180deg,
              #f6c90e 180deg 270deg,
              #1b1b1b 270deg 360deg
            );
          border:6px solid rgba(246,201,14,.55);
          transition:transform 3.2s cubic-bezier(.12,.82,.17,1);
          overflow:hidden;
        }

        .wheel-segment{
          position:absolute;
          width:50%;
          height:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          color:#fff;
          font-size:17px;
          font-weight:1000;
        }

        .seg-1{ top:0; right:0; }
        .seg-2{ bottom:0; right:0; }
        .seg-3{ bottom:0; left:0; }
        .seg-4{ top:0; left:0; }

        .wheel-center{
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          width:66px;
          height:66px;
          border-radius:50%;
          background:linear-gradient(135deg,var(--gold-soft),var(--gold),var(--gold-deep));
          color:#050505;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:12px;
          font-weight:1000;
          z-index:4;
          border:5px solid #090909;
        }

        .reward-box{
          margin:8px 0 18px;
          padding:18px;
          border-radius:20px;
          background:rgba(255,255,255,.06);
          border:1px solid rgba(246,201,14,.24);
        }

        .reward-box p{
          margin:0 0 5px;
          color:rgba(255,255,255,.62);
          font-weight:900;
          text-transform:uppercase;
          font-size:11px;
          letter-spacing:1.5px;
        }

        .reward-box h4{
          margin:0 0 12px;
          color:var(--gold);
          font-size:30px;
          font-weight:1000;
          text-transform:uppercase;
        }

        .reward-box small{
          display:block;
          color:rgba(255,255,255,.56);
          font-weight:700;
          margin-bottom:14px;
        }

        .shop-now-btn,
        .spin-btn{
          border:none;
          border-radius:14px;
          padding:12px 24px;
          font-weight:900;
          text-transform:uppercase;
          background:linear-gradient(135deg,var(--gold-soft),var(--gold));
          color:#050505;
        }

        .floating-top-icons{
          position:fixed;
          top:100px;
          right:20px;
          z-index:9999;
          display:flex;
          flex-direction:row;
          gap:10px;
          padding:6px 8px;
          border-radius:999px;
          background:rgba(0,0,0,.55);
          backdrop-filter:blur(12px);
          border:1px solid rgba(246,201,14,.2);
        }

        .floating-btn{
          width:42px;
          height:42px;
          border-radius:12px;
          border:1px solid rgba(246,201,14,.35);
          background:
            radial-gradient(circle at top left, rgba(255,242,166,.38), transparent 42%),
            linear-gradient(135deg,#0a0a0a,#221b09);
          color:var(--gold);
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 10px 24px rgba(0,0,0,.35);
          position:relative;
          transition:.3s;
        }

        .floating-btn:hover{
          background:linear-gradient(135deg,var(--gold-soft),var(--gold));
          color:#000;
          transform:translateY(-3px) scale(1.04);
        }

        .cart-btn .badge{
          position:absolute;
          top:-7px;
          right:-7px;
          background:linear-gradient(135deg,#fff2a6,#f6c90e,#b8860b);
          color:#000;
          font-size:10px;
          font-weight:900;
          min-width:18px;
          height:18px;
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:50%;
        }

        .floating-search{
          position:fixed;
          top:160px;
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
          display:flex;
          align-items:center;
          justify-content:center;
          gap:7px;
        }

        .whatsapp-float-btn{
          position:fixed;
          right:20px;
          bottom:20px;
          width:50px;
          height:50px;
          border-radius:16px;
          background:linear-gradient(135deg,#25D366,#128C7E);
          color:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:24px;
          z-index:9999;
          text-decoration:none;
          box-shadow:0 16px 35px rgba(0,0,0,.35);
          transition:.3s ease;
        }

        .whatsapp-float-btn.with-top-btn{
          bottom:82px;
        }

        .whatsapp-float-btn:hover{
          color:#fff;
          transform:translateY(-4px) scale(1.05);
        }

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

        @keyframes spinPopup{
          from{
            opacity:0;
            transform:translateY(25px) scale(.92);
          }
          to{
            opacity:1;
            transform:translateY(0) scale(1);
          }
        }

        @media(max-width:480px){
          .floating-top-icons{
            top:92px;
            right:12px;
          }

          .floating-btn{
            width:40px;
            height:40px;
          }

          .floating-search{
            width:90%;
            right:5%;
            top:148px;
          }

          .whatsapp-float-btn,
          .scroll-top-btn{
            right:14px;
            width:48px;
            height:48px;
          }

          .whatsapp-float-btn.with-top-btn{
            bottom:78px;
          }

          .spin-card{
            padding:34px 22px;
          }

          .spin-card h2{
            font-size:36px;
          }

          .wheel-wrap,
          .wheel{
            width:190px;
            height:190px;
          }
        }
      `}</style>
    </>
  );
}