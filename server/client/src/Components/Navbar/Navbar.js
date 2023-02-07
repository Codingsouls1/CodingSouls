import React, { useContext, useState,useEffect } from 'react'
import { NavbarData } from './NavbarData/NavbarData'
import "./NavbarData/Navbar.css"
import { NavLink } from "react-router-dom"
import { HiMenu } from "react-icons/hi";
import { FiX } from "react-icons/fi"
import Logo from "../../images/Logo.jpg"
import { UserContext } from '../../App';


const Navbar = () => {
  const { state, dispatch } = useContext(UserContext)
  const [toggle, settoggle] = useState(false)
    const check =async () => {
      /* for login and logout */
     try{
      const res = await fetch("/EventData", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/type",
        },
        credentials: "include"
    })
      if (res.status === 201) {
          dispatch({ type: "USER", payload: true });
        
      }
     }
     catch(err)
     {
      console.log(err);
     }
    }
    useEffect(() => {
        check()
    },[])
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand link" to="/"><img src={Logo} alt="" /><span>CODING SOULS <p>Until Salvations</p></span></NavLink>
          <div className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarDropdown" onClick={() => settoggle(!toggle)}>
            <span>{toggle ? <FiX /> : <HiMenu />}</span>
          </div>
          <div className="collapse navbar-collapse" id="navbarDropdown">

            <ul className="navbar-nav  ms-auto text-center">
              {
                NavbarData.map((item, index) => {
                  if (item.Dropdown) {
                    return (
                      <li className="nav-item dropdown" key={index} style={{ cursor: "pointer" }}>
                        <NavLink className="nav-link link dropdown-toggle disabled" to={item.path} role="button" data-bs-target="DropdownLink">
                          {item.name}
                        </NavLink>
                        <ul className="dropdown-menu text-center" id="DropdownLink">
                          {
                            item.Dropdown.map((item1, index1) => {
                              if (item1.name === "Login" && state) {
                                return <li key={index1}><NavLink className="dropdown-item link " to="Admin/Logout">Logout</NavLink></li>
                              }
                              return <li key={index1}><NavLink className="dropdown-item link " to={item1.path}>{item1.name}</NavLink></li>
                            })
                          }
                        </ul>
                      </li>
                    )
                  }
                  return (
                    <li className="nav-item " key={index}>
                      <NavLink className="nav-link link" to={item.path}>{item.name}</NavLink>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
