import React, { useEffect, useState } from "react";
import "../CSS/sidebar.css";
import { FaBox, FaUser, FaHeart, FaBell, FaQuestionCircle, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (savedUser && savedUser.name) {
      setUserName(savedUser.name);
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>×</button>

        {/* User Section */}
        <div className="user-profile">
          <div className="user-avatar">{userName?.charAt(0) || "U"}</div>
          <div className="user-details">
            <h3>{userName || "Guest User"}</h3>
            {/* <span className="view-profile">View profile</span> */}
          </div>
        </div>

        {/* Menu */}
        <div className="menu-section">
          <p className="menu-heading">Shop by Category</p>
          <ul>
            <li onClick={() => navigate("/orders")}><FaBox /> My Orders</li>
            <li>
              <a
                href="https://sites.google.com/view/privacypolicyquickkirana/home"
                target="_blank"
                rel="noopener noreferrer"
                className="menu-link"
              >
                <FaUser /> Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://sites.google.com/view/termsofservicesquickkirana/home"
                target="_blank"
                rel="noopener noreferrer"
                className="menu-link"
              >
                <FaUser /> Terms & Conditions
              </a>
            </li>
            <li><FaBell /> Notifications</li>
          </ul>
        </div>

        {/* Bottom Menu */}
        <div className="bottom-section">
          <ul>
            <li><FaQuestionCircle /> Help & Support</li>
            <li><FaCog /> Settings</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
