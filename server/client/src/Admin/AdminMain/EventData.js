import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Components/Loading'
import LOGO from '../../Components/LOGO'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import NotFound from '../../Pages/NotFound'
const EventData = () => {
    const Navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [EData, setEData] = useState([])
    const EventData = async () => {
        /* for get data */
        const res = await fetch("/EventData", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/type",
            },
            credentials: "include"
        })

        if (!(res.status === 201)) {
            Navigate("/Admin/Login");
        }
        else {
            const data = await res.json();
            setEData([...data]);
        }
        setShow(!show)
    }
    const Back = () => {
        Navigate(-1);
    }
    useEffect(() => {
        EventData();
    }, [])
    if (show) {
        return <><Loading /></>
    }
    if (EData.length === 0) {
        return <NotFound value="Data Not Found"/>
    }
    return (
        <>
            <div className="container-fluid text-center">
                <div className="row">
                    <LOGO />
                    <h2 className='HeadingPageName'>Event Details</h2>
                    <div className="col-12 col-lg-4 ms-auto">
                        {/* for convert into excel form */}
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-success my-3 ms-auto"
                            table="table"
                            filename="Eventtable"
                            sheet="tablexls"
                            buttonText="Export Data to Excel Sheet" />
                        <div className="d-flex justify-content-center mt-3 login_container">
                            <button type="button" onClick={Back} name="button" className="btn login_btn">Go Back</button>
                        </div>
                    </div>
                    <div style={{fontSize:"40px",fontWeight:"bold",color:"rgb(45, 67, 99)"}}>Total : {EData.length}</div>
                    <div className="col-12" style={{ overflowX: "scroll" }}>
                        
                        <table className="table table-striped table-dark my-5" id="table">
                            <thead>
                                <tr>
                                    <th scope="col">S.No.</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Enrollment No.</th>
                                    <th scope="col">Gmail</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">College</th>
                                    <th scope="col">Branch</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Semester</th>
                                    <th scope="col">Section</th>
                                    <th scope="col">Language</th>
                                    <th scope="col">Transaction Date</th>
                                    <th scope="col">Transaction Time</th>
                                    <th scope="col">Transaction ID</th>

                                </tr>
                            </thead>
                            <tbody>
                                {EData.map((item, index) => {
                                    const { fname, lname, enrollment_number, email, contact, gender, college, branch, year, semester, section, language, tdate, time, tid } = item
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{fname.toUpperCase()}</td>
                                            <td>{lname.toUpperCase()}</td>
                                            <td>{enrollment_number.toUpperCase()}</td>
                                            <td>{email.toUpperCase()}</td>
                                            <td>{contact.toUpperCase()}</td>
                                            <td>{gender.toUpperCase()}</td>
                                            <td>{college.toUpperCase()}</td>
                                            <td>{branch.toUpperCase()}</td>
                                            <td>{year}</td>
                                            <td>{semester}</td>
                                            <td>{section.toUpperCase()}</td>
                                            <td>{language.toUpperCase()}</td>
                                            <td>{tdate}</td>
                                            <td>{time}</td>
                                            <td>{tid.toUpperCase()}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventData