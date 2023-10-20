import  { useEffect } from "react";
import "bootstrap/js/dist/dropdown";
import { useNavigate } from "react-router-dom";

const Nav =({ Toggle }: { Toggle: () => void }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const tutor = localStorage.getItem("adminToken");
    if (!tutor) {
      navigate("/admin_login");
    }
  }, [navigate]);
  return (
    <nav className="navbar navbar-expand-sm  navbar-dark bg-dark px-3">
      <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ></button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Muhzin
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <a className="dropdown-item" href="/student">
                Profile
              </a>
              <a className="dropdown-item" href="#">
                Setting
              </a>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
