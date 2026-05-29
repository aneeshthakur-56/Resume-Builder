import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/features/authSlice";
import { makeApiRequest } from "../../utils/apiService";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const logoutUser = async () => {
    setDropdownOpen(false);
    
    // 1. Navigate to the public home page first. This unmounts any protected route wrappers
    // so they do not intercept the state clearance and redirect the user to "/login".
    navigate("/", { replace: true });
    
    // 2. Perform the logout API call and dispatch state clearance after the route transition finishes.
    setTimeout(async () => {
      try {
        const res = await makeApiRequest("/api/users/logout");
        if (res && res.success) {
          toast.success("Logged out successfully");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        dispatch(logout());
      }
    }, 100);
  };

  // Shrink/glass effect on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Initials avatar
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

        .nb-root {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          font-family: 'Poppins', sans-serif;
          transition: box-shadow 0.3s, background 0.3s, padding 0.3s;
        }

        .nb-root.nb-scrolled {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 1px 0 rgba(0,0,0,0.07), 0 4px 20px rgba(0,0,0,0.06);
        }

        .nb-root:not(.nb-scrolled) {
          background: #ffffff;
          box-shadow: 0 1px 0 rgba(0,0,0,0.07);
        }

        .nb-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          transition: height 0.3s;
        }

        .nb-scrolled .nb-inner {
          height: 56px;
        }

        .nb-logo img {
          height: 40px;
          width: auto;
          display: block;
          transition: opacity 0.2s;
        }
        .nb-logo:hover img { opacity: 0.8; }

        /* Right side */
        .nb-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;
        }

        /* Greeting */
        .nb-greeting {
          font-size: 0.8125rem;
          color: #6b7280;
          font-weight: 400;
          white-space: nowrap;
        }
        .nb-greeting strong {
          color: #1e293b;
          font-weight: 600;
        }

        /* Avatar button */
        .nb-avatar-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          border-radius: 9999px;
          transition: opacity 0.2s;
        }
        .nb-avatar-btn:hover { opacity: 0.85; }

        .nb-avatar {
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #16a34a, #4ade80);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.03em;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px #fff, 0 0 0 3.5px #16a34a;
        }

        .nb-chevron {
          color: #9ca3af;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .nb-chevron.open { transform: rotate(180deg); }

        /* Dropdown */
        .nb-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 200px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06);
          overflow: hidden;
          animation: nb-drop 0.18s cubic-bezier(0.22,1,0.36,1) forwards;
          transform-origin: top right;
        }

        @keyframes nb-drop {
          from { opacity: 0; transform: scale(0.95) translateY(-6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .nb-dropdown-header {
          padding: 0.875rem 1rem 0.75rem;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .nb-dropdown-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .nb-dropdown-label {
          font-size: 0.7rem;
          color: #16a34a;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0;
          margin-top: 1px;
        }

        .nb-dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          width: 100%;
          padding: 0.625rem 1rem;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          color: #374151;
          text-align: left;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .nb-dropdown-item:hover {
          background: #f0fdf4;
          color: #16a34a;
        }
        .nb-dropdown-item.danger {
          color: #dc2626;
        }
        .nb-dropdown-item.danger:hover {
          background: #fef2f2;
          color: #dc2626;
        }

        .nb-divider {
          height: 1px;
          background: rgba(0,0,0,0.06);
          margin: 0;
        }

        /* Hide greeting on very small screens */
        @media (max-width: 480px) {
          .nb-greeting { display: none; }
        }
      `}</style>

      <div className={`nb-root${scrolled ? " nb-scrolled" : ""}`}>
        <div className="nb-inner">
          {/* Logo */}
          <Link to="/" className="nb-logo">
            <img src="/logo.svg" alt="Logo" />
          </Link>

          {/* Right */}
          <div className="nb-right" ref={dropdownRef}>
            <span className="nb-greeting">
              Hi, <strong>{user?.name}</strong>
            </span>

            <button
              className="nb-avatar-btn"
              onClick={() => setDropdownOpen((o) => !o)}
              aria-label="User menu"
              aria-expanded={dropdownOpen}
            >
              <div className="nb-avatar">{initials}</div>
              <svg
                className={`nb-chevron${dropdownOpen ? " open" : ""}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="nb-dropdown" role="menu">
                {/* Header */}
                <div className="nb-dropdown-header">
                  <p className="nb-dropdown-name">{user?.name}</p>
                </div>
 
                {/* Menu items */}
                {user?.email !== "demo@example.com" && (
                  <Link
                    to="/app/settings"
                    className="nb-dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                    role="menuitem"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Settings
                  </Link>
                )}

                <div className="nb-divider" />

                <button
                  className="nb-dropdown-item danger"
                  onClick={logoutUser}
                  role="menuitem"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
