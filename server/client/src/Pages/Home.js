import React, { useEffect, useState } from 'react'
import Img from "../images/Bansal1.jpg"
import Img1 from "../images/Bansal2.webp"
import Img2 from "../images/Bansal3.jpg"
import "./Home.css"
import Logo from "../images/Logo.jpg"
import { ImCross } from 'react-icons/im';
import { NavLink } from "react-router-dom"
import { events } from './Event/EventData/EventData'

const Home = () => {
    const [modal, setmodal] = useState(true)
    const [visi, setvisi] = useState(false)
    const [opac, setopac] = useState(false)
    const click = () => {
        setmodal(!modal)
        setopac(false);
    }

    const check = () => {
        events.forEach((value, index) => {
            if (events[index].end > new Date()) {
                setvisi(true)
                setopac(true);
            }
        })
    }
    useEffect(() => {
        check();
    }, [])
    return (
        <>
            {/* Carousel slider start */}
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel" style={opac ? { opacity: "0.2" } : { opacity: "1" }}>
                {!modal && (<div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>)}
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img src={Img} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={Img1} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={Img2} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/*Carousel end and  modal box start */}
            {visi && modal && (
                <div className="container">
                    <div className="row">
                        <div className="col-10 col-md-5 col-lg-4 mx-auto" >
                            <div className='Modal'>
                                <div style={{ cursor: "pointer", marginTop: "15px" }} className="cross" onClick={click}><ImCross /></div>
                                {/* <div style={{ marginTop: "30px" }} className="text-center">
                                    {/* <img src={item.img} alt="" className='mx-auto mb-2 popupimg' /> }
                                    <h5>MEMBER REGISTRATION STARTS ... </h5>
                                    <h6 className='ms-3'>Registration Last Date : 10-09-2022</h6>
                                    <div className="ms-5 my-3">
                                        <NavLink to="/Guidelines" className="ms-2 ms-md-5"><button className='btn btn-info '>Guidelines</button></NavLink>
                                        <NavLink to="/register/memberregister"><button className='btn btn-primary ms-2'>Register</button></NavLink>
                                    </div>
                                </div> */}
                                {events.map((item, index) => {
                                    if (new Date() <= item.Rend) {
                                        if (new Date() > item.Rstart && new Date() < item.Rend) {
                                            return (
                                                <div style={{ marginTop: "30px" }} className="text-center" key={index}>
                                                    { <img src={item.img} alt="" className='mx-auto mb-2 popupimg' />}
                                                    <h5>{item.title}</h5>
                                                    <h6 className='ms-3'>Event Date : {item.start.toDateString()}</h6>
                                                    <h6 className='ms-3'>Registration Last Date : {item.Rend.toDateString()}</h6>
                                                    <div className="ms-5 my-3">
                                                        <NavLink to="/events" className="ms-2 ms-md-5"><button className='btn btn-info '>Details</button></NavLink>
                                                        <NavLink to="/register/eventregister"><button className='btn btn-primary ms-2'>Register</button></NavLink>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div style={{ marginTop: "30px" }} className="text-center" key={index}>
                                                    {/* <img src={item.img} alt="" className='mx-auto mb-2 popupimg'/> */}
                                                    <h5>{item.title}</h5>
                                                    {<h6 className='ms-3'> Event Date : {item.start.toDateString()}</h6>}
                                                    <h6 className='ms-3'>Registration Start Date  : {item.Rstart.toDateString()} </h6>
                                                    <div className="ms-5 my-3">
                                                        <NavLink to="/events" className="ms-2 ms-md-5"><button className='btn btn-info '>Detail</button></NavLink>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                    return null

                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* modal end and logo start */}
            <div className="container text-center my-5" style={opac ? { opacity: "0.2" } : { opacity: "1" }}>
                <h3 className='HeadingPageName'>Coding Souls</h3>
                <h5 className='HeadingPageName'>(Until Salvations)</h5>
                <div className="row">
                    <div className="col-12 Logocol mt-4">
                        <img src={Logo} alt="" />
                    </div>
                </div>
            </div>
            {/* logo end and vision mission objective start */}
            <div className="container my-3 " style={opac ? { opacity: "0.2" } : { opacity: "1" }}>
                <div className="row text-center">
                    <div className="col-12 mt-4">
                        <div className='my-4'>
                            <h4 className='HeadingPageName'>Vision</h4>
                            <p className='vmc'>To provide the skills, confidence and opportunity to the students to shape the world by solving society problems through coding skills.</p>
                        </div>
                        <div className='my-4'>
                            <h4 className='HeadingPageName'>Mission</h4>
                            <p className='vmc'>To develop the ethical coders on the latest technology.</p>
                        </div>
                        <div className='my-4'>
                            <h4 className='HeadingPageName'>Core Values</h4>
                            <p className='vmc'>Believe in learning together in friendly environment Inspire discovery and invention through play with work ethics Accept the transformation and respect all.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className='my-5'>
                            <h2 className='HeadingPageName ms-1'>Objective</h2>
                            <ul className='mt-3'>
                                <li>To Achieve Higher Logical & Structural Thinking.</li>
                                <li>To Create Incubation Environment for Skill Development.</li>
                                <li>Develop Creative Thinking, Constructive Knowledge & Develop Innovative Software Product.</li>
                                <li>To motivate students to learn programming with enthusiasm.</li>
                                <li>To provide real-world experience of coding to solve a problem.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className='my-5'>
                            <h2 className='HeadingPageName ms-1'>Who can join the team?</h2>
                            <ul className='mt-3'>
                                <li>Anybody can be a part of this club, who Are interested in coding.</li>
                                <li>Needs to take part in various coding events.</li>
                                <li>Wants to learn coding with fun.</li>
                                <li>Likes to get the latest updates of coding competitions.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home
