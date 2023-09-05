import { useState } from "react";

import { Link } from "react-router-dom";

const SideNav = () => {
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
           

            <div className="nav-list">
              <Link
                to="/students"
                className="nav-link"
                style={{ textDecoration: "none" }}
              >
                <i className="fas fa-user"></i>
                <span className="nav-link-name">Student</span>
              </Link>

             
              <Link to="/add_course" className="nav-link">
              <i className="fa-solid fa-plus"></i>
                <span className="nav-link-name">Add Course</span>
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

export default SideNav;
