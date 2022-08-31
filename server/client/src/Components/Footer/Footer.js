import React from 'react'
import "./FooterData/Footer.css"
import Logo from "../../images/Logo-SDBC-250x62.png";
import { FooterData } from './FooterData/FooterData'
import { NavLink } from "react-router-dom"
import { RiFacebookFill, RiInstagramLine, RiLinkedinFill } from "react-icons/ri";

const Footer = () => {
  const Email = FooterData.Email;
  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "rgb(7, 36, 98)" }}>
        <div className="row text-center text-white my-3">
          <div className="col-12 my-3 col-md-4 my-md-auto">
            <div className="m-auto">
              <img src={Logo} alt="" style={{ marginLeft: "-3%", backgroundColor: "white", borderRadius: "2%" }} />
            </div>
            <h6 className='my-2'>SUSHILA DEVI BANSAL COLLEGE INDORE</h6>
            <NavLink to="/Contact" style={{ textDecoration: "none", color: "white" }}><p className='Emaillink link my-2'>{FooterData.Addess}</p></NavLink>
          </div>
          <div className="col-12  col-md-4">
            <div className='mx-auto'>
              <div className='my-4 mx-3'>
                <a className='text-white facebookIcon' style={{ padding: "10px 12px" }} target="_blank" href={FooterData.Facebook}>
                  <RiFacebookFill />
                </a>
              </div>
              <div className='my-4 mx-3'>
                <a className='text-white instaIcon' style={{ padding: "10px 12px" }} target="_blank" href={FooterData.Instagram}>
                  <RiInstagramLine />
                </a>
              </div>
              <div className='my-4 mx-3'>
                <a className='text-white linkedinIcon' style={{ padding: "10px 12px" }} target="_blank" href={FooterData.Linkedin}>
                  <RiLinkedinFill />
                </a>
              </div>
            </div>

          </div>
          <div className="col-12 my-3 my-md-0 col-md-4">
            <h5>Contact</h5>
            <div className="row my-3">
              <div className="col-12">
                <h6>Email Us</h6>
                <div className='Emaillink link' onClick={() => {
                  window.open("mailto:" + Email + "?subject=SendMail&body=Description");
                }}>{FooterData.Email}</div>
              </div>
            </div>
            <div className="row mt-3 mx-auto">
              <div className="col-6 mx-auto">
                <h6>Call Us</h6>
                <a href={`tel:${FooterData.MobileNumber}`} className='Emaillink link'>{FooterData.MobileNumber}</a>
              </div>
            </div>
            <div className="row mx-auto">

              <div className="col-5 mx-auto"><a href={`tel:${FooterData.MobileNumber2}`} className="Emaillink link col-5 ms-2">{FooterData.MobileNumber2}</a></div>
            </div>
          </div>
        </div>
        <div className="row mt-2 mb-4">
          <div className="col-12 text-center text-white">
            <div style={{ fontSize: "11px", fontFamily: "monospace" }}>© Coding Souls of BGI - All rigths reserved</div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Footer