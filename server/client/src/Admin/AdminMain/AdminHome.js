import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading';
import LOGO from "../../Components/LOGO"
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
const AdminHome = () => {
  const [data1, setdata1] = useState([]);
  const [show, setShow] = useState(true);
  const [sData, setsData] = useState({
    select: "",
    Edata: ""
  });
  const [MsData, MsetsData] = useState({
    Mselect: "",
    Mdata: ""
  });
  const [SearchData, setSearchData] = useState([])
  const Navigate = useNavigate();
  /* for authentification of admin home page */
  const check = async () => {
    const res = await fetch("/AdminHome", {
      method: "GET",
      headers: {
        Accept: "appliction/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    //const data = await res.json();
    if (!(res.status === 201)) {

      Navigate("/Admin/Login");
    }
    setShow(!show)
  }
  /* for get for form are opened or closed */
  const data = async () => {
    const res = await fetch("/toggle", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data1 = await res.json()
    setdata1(...data1);
  }
  /* for open closed Event forms */
  const Event = async () => {
    await fetch("/toggle", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        Event: !(data1.Event)
      })
    })
    data();
  }
  /* for open closed Member forms */
  const Member = async () => {
    await fetch("/toggle", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        Member: !(data1.Member)
      })
    })
    data();
  }

  var name, value
  const searchData = (e) => {
    name = e.target.name
    value = e.target.value
    setsData({ ...sData, [name]: value });
  }
  /* for Event Searching Data */
  const EventSearch = async () => {
    const { select, Edata } = sData
    const res = await fetch("/EventSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        [select]: Edata
      })
    })

    const data = await res.json()
    setSearchData([...data]);
  }

  const MsearchData = (e) => {
    name = e.target.name
    value = e.target.value
    MsetsData({ ...MsData, [name]: value });
  }

  /* for Member Searching Data */
  const MEventSearch = async () => {
    const { Mselect, Mdata } = MsData
    const res = await fetch("/MemberSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        [Mselect]: Mdata
      })
    })

    const data = await res.json()
    setSearchData([...data]);
  }

  useEffect(() => {
    data();
    check();
  }, []);
  const Edata = () => {
    Navigate("/Admin/EventData")
  }
  const Mdata = () => {
    Navigate("/Admin/MemberData")
  }

  /* sending mail to Event participants and Member Participants  */
  const [EMdata, setEMdata] = useState({
    subject: "",
    message: ""
  })
  const [MMdata, setMMdata] = useState({
    subject: "",
    message: ""
  })
  const EMMessage = (e) => {
    name = e.target.name
    value = e.target.value
    setEMdata({ ...EMdata, [name]: value })
  }
  const MMMessage = (e) => {
    name = e.target.name
    value = e.target.value
    setMMdata({ ...MMdata, [name]: value })
  }
  const SendEMessage = async () => {
    const { subject, message } = EMdata
    try {
      const res = await fetch("/Eventmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject, message
        })
      })
      if (res.status === 201) {
        window.alert("send successful");
        setEMdata("");
      }
      else {
        window.alert("Failled");
      }
      setEMdata({subject:"",message:""})
    }
    catch (err) {
      console.log(err)
    }
  }
  const SendMMessage = async () => {
    const { subject, message } = MMdata
    try {
      const res = await fetch("/Membermail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject, message
        })
      })
      if (res.status === 201) {
        window.alert("send successful");
      }
      else {
        window.alert("Failled");
      }
      setMMdata({subject:"",message:""})
    }
    catch (err) {
      console.log(err)
    }
  }

  if (show) {
    return <><Loading /></>
  }
  return (
    <>
      {/* for sending mail to each member */}
      <div className="container text-center">
        <LOGO />
        <h2 className='HeadingPageName'>Admin Home Page</h2>
        <div className="row">
          <h4 className='HeadingPageName mt-5' >For Sending Mail To All Participants</h4>
          <div className="col-12 col-md-6" style={{ border: "5px solid #2d4363" }}>
            <h5 className='HeadingPageName my-2'>For Event </h5>
            <label htmlFor="subject" className='form-label my-1'>Subject</label>
            <textarea name="subject" value={EMdata.subject} className="form-control" id="subject" cols="30" rows="1" onChange={EMMessage} placeholder='Subject for mail'></textarea>
            <label htmlFor="message1" className='form-label my-1'>Message</label>
            <textarea name="message" value={EMdata.message} className='form-control' id="message1" cols="30" rows="5" onChange={EMMessage} placeholder='message for participants'></textarea>
            <button className='btn btn-primary my-3' onClick={SendEMessage}>Send Message</button>
          </div>
          <div className="col-12 col-md-6" style={{ border: "5px solid #2d4363" }}>
            <h5 className='HeadingPageName my-2'>For Member  </h5>
            <label htmlFor="subject" className='form-label my-1'>Subject</label>
            <textarea name="subject" value={MMdata.subject} className="form-control" id="subject" cols="30" rows="1" onChange={MMMessage} placeholder='Subject for mail'></textarea>
            <label htmlFor="message1" className='form-label my-1'>Message</label>
            <textarea name="message" value={MMdata.message} className='form-control' id="message1" cols="30" rows="5" onChange={MMMessage} placeholder='message for participants'></textarea>
            <button className='btn btn-primary my-3' onClick={SendMMessage}>Send Message</button>
          </div>
        </div>
      </div>


      <div className="container text-center">

        <div className="row my-5">
          {/* for forms oper or close */}

          <div className="col-12 col-md-3 my-3" style={{ border: "5px solid #2d4363" }}>
            <h5 className='HeadingPageName my-2'>For Forms Open Or Close </h5>
            <div className='d-flex'>
              <label className="form-check-label mx-2" htmlFor="Event">Event:</label>
              <div className="form-check form-switch">
                <input onClick={Event} className="form-check-input" type="checkbox" role="switch" id="Event" defaultChecked={data1.Event} />
              </div>
            </div>
            <div className='d-flex mt-4'>
              <label className="form-check-label mx-2" htmlFor="Member">Member:</label>
              <div className="form-check form-switch">
                <input onClick={Member} className="form-check-input" type="checkbox" role="switch" id="Member" defaultChecked={data1.Member} />
              </div>
            </div>
          </div>
          {/* for searching of data */}
          <div className="col-12 col-md-5 my-3" style={{ border: "5px solid #2d4363" }}>
            <h5 className='HeadingPageName my-2'>Search Data </h5>
            <div className="d-flex py-0">
              <label htmlFor="Search" className="form-label mx-2">Event</label>
              <select id="Search" name='select' value={sData.select} className="form-select" onChange={searchData}>
                <option value="" disabled selected>Select</option>
                <option>fname</option>
                <option>lname</option>
                <option>enrollment_number</option>
                <option>email</option>
                <option>contact</option>
                <option>gender</option>
                <option>college</option>
                <option>branch</option>
                <option>year</option>
                <option>semester</option>
                <option>section</option>
                <option>language</option>
                <option>time</option>
                <option>tid</option>
                <option>check</option>
              </select>
              <input type="text" onChange={searchData} name="Edata" value={sData.Edata} className="form-control" placeholder="Search Event Data" />
              <button className='btn btn-primary' onClick={EventSearch}>Search</button>
            </div>
            <div className="d-flex py-0 mt-3">
              <label htmlFor="Search" className="form-label mx-2">Member</label>
              <select id="Search" name='Mselect' value={MsData.Mselect} className="form-select" onChange={MsearchData}>
                <option value="" disabled selected>Select</option>
                <option>fname</option>
                <option>lname</option>
                <option>enrollment_number</option>
                <option>email</option>
                <option>contact</option>
                <option>gender</option>
                <option>college</option>
                <option>branch</option>
                <option>year</option>
                <option>semester</option>
                <option>section</option>
                <option>language</option>
                <option>time</option>
                <option>tid</option>
                <option>check</option>
              </select>
              <input type="text" onChange={MsearchData} name="Mdata" value={MsData.Mdata} className="form-control" placeholder="Search Member Data" />
              <button className='btn btn-primary' onClick={MEventSearch}>Search</button>
            </div>
          </div>
          {/* button for see event and member details */}
          <div className="col-12 col-md-4 mx-auto my-3" style={{ border: "5px solid #2d4363" }}>
            <h5 className='HeadingPageName my-2'>All Details</h5>
            <div className="d-flex justify-content-center mt-3 login_container">
              <button type="button" onClick={Edata} name="button" className="btn login_btn">Event Data</button>
            </div>
            <div className="d-flex justify-content-center my-3 login_container">
              <button type="button" onClick={Mdata} name="button" className="btn login_btn">Member Data</button>
            </div>
          </div>
        </div>
      </div>


      {/* for show data in table form */}
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-12 col-lg-4 ms-auto">
            {/* for convert dat table into excel sheet */}
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button btn btn-success my-3 ms-auto"
              table="table"
              filename="Eventtable"
              sheet="tablexls"
              buttonText="Export Data to Excel Sheet" />
          </div>
          <div style={{ fontSize: "40px", fontWeight: "bold", color: "rgb(45, 67, 99)" }}>Total : {SearchData.length}</div>
          <div className="col-12" style={{ overflowX: "scroll" }}>

            {!(SearchData.length === 0) ? <table className="table table-striped table-dark my-5" id="table">
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
                {SearchData.map((item, index) => {
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
            </table> : <h5 className='About'>Data Not Found</h5>}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminHome