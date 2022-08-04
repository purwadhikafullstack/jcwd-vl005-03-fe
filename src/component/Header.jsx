import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate()

  const onButtonLogout = () => {
    localStorage.removeItem("tokenAdmin")
    localStorage.removeItem("akses")
    navigate('/admin/login')
  }

  const admin = useSelector((state) => state.admin)

  return (
    <>
      <div className="app-header fixed-top">
        <div className="app-header-inner">
          <div className="container-fluid py-2">
            <div className="app-header-content">
              <div className="row justify-content-between align-items-center">

                <div className="col-auto">
                  <a id="sidepanel-toggler" className="d-inline-block d-xl-none" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img">
                      <title>Menu</title>
                      <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22">
                      </path>
                    </svg>
                  </a>
                </div>
                <div className="search-mobile-trigger d-sm-none col">
                  <i className="search-mobile-trigger-icon fas fa-search"></i>
                </div>
                <div className="app-utilities col-auto">
                  <div className="app-utility-item app-user-dropdown dropdown d-flex align-items-center">
                    <Text className="avatar-text">Welcome {admin.adminname}</Text>
                    <img className="mr-3" src="/assets/images/user.png" alt="user profile" />
                    <a className="dropdown-toggle px-2" id="user-dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                      aria-expanded="false">
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="user-dropdown-toggle">
                      <li><a className="dropdown-item" href="account.html">Account</a></li>
                      <li><a className="dropdown-item" href="settings.html">Settings</a></li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li><a className="dropdown-item" onClick={onButtonLogout} href="http://localhost:3000/admin/login">Log Out</a></li>
                    </ul>
                  </div>

                </div>

              </div>
              {/* <!--//row--> */}
            </div>
            {/* <!--//app-header-content--> */}
          </div>
          {/* <!--//container-fluid--> */}
        </div>
        {/* <!--//app-header-inner--> */}

        <Sidebar />
        {/* <!--//app-sidepanel--> */}

      </div>
      {/* <!--//app-header--> */}
    </>
  )
}

export default Header;