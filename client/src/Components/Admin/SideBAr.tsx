import { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const UsersInAdmin = () => {
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

              <Link
                to="/tutors"
                className="nav-link"
                style={{ textDecoration: "none" }}
              >
               <i className="fa-solid fa-chalkboard-user"></i>
                <span className="nav-link-name">Instructor</span>
              </Link>
              <Link to="/admin_add_course" className="nav-link">
              <i className="fa-solid fa-plus"></i>
                <span className="nav-link-name">Add Course</span>
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

export default UsersInAdmin;
