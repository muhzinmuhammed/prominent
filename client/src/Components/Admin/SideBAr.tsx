import { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  return (
    <main className={show ? "space-toggle" : ""}>
      <header className={`header ${show ? "space-toggle" : ""}`}>
        <div className="header-toggle" onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? "fa-solid fa-xmark" : ""}`}></i>
        </div>
      </header>

      <aside className={`sidebar ${show ? "show" : ""}`}>
        <nav className="nav">
          <div>
            <Link to="/" className="nav-logo"></Link>

            <div className="nav-list">
              <Link
                to="/gallery"
                className="nav-link"
                style={{ textDecoration: "none" }}
              >
                <i className="fas fa-image nav-link-icon"></i>
                <span className="nav-link-name">Gallery</span>
              </Link>

              <Link to="/hotel" className="nav-link">
                <i className="fas fa-hotel nav-link-icon"></i>
                <span className="nav-link-name">Hotel</span>
              </Link>
              <Link to="/gallery" className="nav-link">
                <i className="fas fa-image nav-link-icon"></i>
                <span className="nav-link-name">Gallery</span>
              </Link>
              <Link to="/gallery" className="nav-link">
                <i className="fas fa-dollar-sign nav-link-icon"></i>
                <span className="nav-link-name">Transaction</span>
              </Link>
            </div>
          </div>

          <Link to="/logout" className="nav-link">
            <i className="fas fa-sign-out nav-link-icon"></i>
            <span className="nav-link-name">Logout</span>
          </Link>
        </nav>
      </aside>
    </main>
  );
};

export default Sidebar;
