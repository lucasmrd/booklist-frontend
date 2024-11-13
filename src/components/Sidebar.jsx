import React, { useState } from "react";
import "boxicons";
import { NavLink, useNavigate } from "react-router-dom"; 
import "./Sidebar.css";

export const Sidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken"); 
    sessionStorage.removeItem("authToken"); 


    navigate("/");
    window.location.reload(); 
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo_details">
        <i className="bx bx-book-open"></i>
        <div className="logo_name">BookList</div>
        <i
          className={`bx ${isOpen ? "bx-menu-alt-right" : "bx-menu"}`}
          id="btn"
          onClick={toggleSidebar}
        ></i>
      </div>
      <ul className="nav-list">
        <li>
          <i className="bx bx-search" onClick={toggleSidebar}></i>
          <input type="text" placeholder="Search..." />
          <span className="tooltip">Search</span>
        </li>

        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <li>
            <a href="#">
              <i className="bx bx-home"></i>
              <span className="link_name">Home</span>
            </a>
            <span className="tooltip">Home</span>
          </li>
        </NavLink>

        <NavLink to='/AddLivro' style={{ textDecoration: 'none' }}>
          <li>
            <a href="#">
              <i className="bx bxs-book-add"></i>
              <span className="link_name">Criar Livro</span>
            </a>
            <span className="tooltip">Criar Livro</span>
          </li>
        </NavLink>

        <NavLink to='/ListarLivros' style={{ textDecoration: 'none' }}>
          <li>
            <a href="#">
              <i className="bx bx-book"></i>
              <span className="link_name">Outros Livros</span>
            </a>
            <span className="tooltip">Outros Livros</span>
          </li>
        </NavLink>

        <NavLink to='/PerfilUsuario' style={{ textDecoration: 'none' }}>
          <li>
            <a href="#">
              <i className="bx bx-user"></i>
              <span className="link_name">Perfil</span>
            </a>
            <span className="tooltip">Perfil</span>
          </li>
        </NavLink>

        <li className="profile">
          <div className="profile_details">
            <div className="profile_content">
              <div className="designation">BookList</div>
              <i
                className="bx bx-log-out"
                id="log_out"
                onClick={handleLogoutClick}  
              ></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
