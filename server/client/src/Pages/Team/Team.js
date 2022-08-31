import React from 'react'
import { TeamData } from './TeamData/TeamData'
import { TiSocialLinkedinCircular, TiSocialGithubCircular } from "react-icons/ti";
import LOGO from '../../Components/LOGO';

const Team = () => {
    return (
        <>
            <div className="container ContainerMargin text-center">
                 <LOGO/>
                <div className="row">
                    <h2 className='HeadingPageName'>TEAM</h2>
                    <h6 className="About">A crew of passionate developers with resonating ideas</h6>
                    <div className="col-12">
                        <div className="row">
                            {
                                TeamData.map((item,index) => {
                                    return(
                                        <div key={index} className="col-12 col-sm-6 col-md-4 my-4">
                                        <img src={item.Img} alt="" height="200px" width="200px" style={{ borderRadius: "50%", border: "10px solid rgb(45, 67, 99)" }} />
                                        <p style={{ fontWeight: "bold", color: "rgb(19, 38, 67)", marginTop: "5px" }}>{item.Name}</p>
                                        <p style={{ marginTop: "-17px", fontSize: "11px", fontWeight: "bold" }}>{item.Profession}</p>
                                        <div style={{marginTop:"-25px"}}> <a href={item.Linkedin} style={{ fontSize: "40px",cursor:"pointer",color:"black" }}><TiSocialLinkedinCircular className='icon' /></a> <a href={item.Github} style={{ fontSize: "40px",cursor:"pointer",color:"black" }}><TiSocialGithubCircular className='icon'/></a></div>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Team