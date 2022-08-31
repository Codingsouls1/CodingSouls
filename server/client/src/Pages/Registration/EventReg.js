import React, { useEffect, useState } from 'react'
import "../Registration/Reg.css"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LOGO from '../../Components/LOGO';
import QR from "../../images/qr.jpg"
import NotFound from '../NotFound';
import { ToastContainer, toast } from 'react-toastify';
import Loading from "../../Components/Loading"

const EventRegi = () => {
  const Navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [user, setuser] = useState({ fname: "", lname: "", enrollment_number: "", email: "", contact: "", gender: "", college: "", branch: "", year: "", semester: "", section: "", language: "", tdate: "", time: "", tid: "", check: "" })
  const [data1, setdata] = useState([]);
  const [load,setload] =useState(true);
  let name, value;
  const Change = (e) => {
    name = e.target.name;
    value = e.target.value
    setuser({ ...user, [name]: value });
  }

  const successtostify = () => {
    toast.success('Register Successful', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      closeButton: false,
      theme: 'colored'
    });
  }
  const errortostify = () => {
    toast.error('Invalid Credential', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'colored'

    });
  }
  const infotostify = () => {
    toast.info('Already Register', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme:"colored"
    });
  }
  const Submit = async () => {
    /* for post data */
    const { fname, lname, enrollment_number, email, contact, gender, college, branch, year, semester, section, language, tdate, time, tid, check } = user
    try {
      const res = await fetch("/Event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fname, lname, enrollment_number, email, contact, gender, college, branch, year, semester, section, language, tdate, time, tid, check
        })

      })

      if (res.status === 201) {
        successtostify()
        setTimeout(() => { Navigate("/") }, 4000);

      }
      else if (res.status === 401) {
        infotostify();
      }
      else {
        errortostify();
      }

    } catch (err) {
      console.log(err)
    }
  }
  const show = async () => {
    /* for checking of form is open or closed by admin */
    try{
      const res = await fetch("/toggle",{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        Credential: "include",
      })
      const data = await res.json()
      setdata(...data);
      setload(false);
    }catch(err)
    {
      console.log(err)
    }
  }
  useEffect(() => {
    show();
  },[data1])
  if(load){
    return <Loading/>
  }
  /* for event closed */
  if (!data1.Event) {
    return <NotFound value="Currently Event Registration closed" />
  }
  /* for event open */
  return (
    <div>
      <ToastContainer/>
      <div className="container ContainerMargin">
        <div className="row text-center">
          <LOGO />
          <h1 className='HeadingPageName my-4'>Event Registration Form</h1>
        </div>
        <form onSubmit={handleSubmit(Submit)} method="POST" action='/Event'>
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" name="fname" value={user.fname} placeholder='First Name' id="firstName" {...register("fname", {
                required: "Please enter your first name",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Invalid Name"
                },
                minLength: {
                  value: 3,
                  message: "Too Short"
                },
                maxLength: {
                  value: 20,
                  message: "Too Long"
                }
              })} onChange={Change} />
              {errors.fname && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.fname.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" name="lname" value={user.lname} placeholder='Last Name' id="lastName" {...register("lname", {
                required: "Please enter your Last name",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Invalid Name"
                },
                minLength: {
                  value: 3,
                  message: "Too Short"
                },
                maxLength: {
                  value: 20,
                  message: "Too Long"
                }
              })} onChange={Change} />
              {errors.lname && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.lname.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1">
              <label htmlFor="EnrollNumber" className="form-label">Enrollment Number</label>
              <input type="text" className="form-control" name="enrollment_number" value={user.enrollment_number} placeholder='Enrollment Number' id="EnrollNumber" {...register("enrollment_number", {
                required: "Please enter your Enrollment Number",
                pattern: {
                  value: /[a-zA-Z]{2}\d{6}/,
                  message: "Invalid"
                },
                minLength: {
                  value: 12,
                  message: "Too Short"
                },
                maxLength: {
                  value: 12,
                  message: "Too Long"
                }
              })} onChange={Change} />
              {errors.enrollment_number && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.enrollment_number.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" name='email' value={user.email} placeholder='Email' id="email" {...register("email", {
                required: "Please enter your Email",
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid Email"
                },
              })} onChange={Change} />
              {errors.email && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.email.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1">
              <label htmlFor="Contact" className="form-label">Contact</label>
              <input type="text" className="form-control" name='contact' value={user.contact} placeholder='Contact' id="Contact" {...register("contact", {
                required: "Please enter your Contact Number",
                pattern: {
                  value: /^(0|[1-9][0-9]*)$/,
                  message: "Invalid Contact"
                },
                minLength: {
                  value: 10,
                  message: "Too Short"
                },
                maxLength: {
                  value: 10,
                  message: "Too Long"
                }
              })} onChange={Change} />
              {errors.contact && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.contact.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1 ">
              <label htmlFor="Gender" className="form-label">Select Gender</label>
              <select id="Gender" name='gender' value={user.gender} className="form-select" {...register("gender", {
                required: "Please enter your gender",

              })} onChange={Change}>

                <option value="" disabled selected>Select Gender  </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.gender.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1">
              <label htmlFor="College" className="form-label">Select College</label>
              <select id="College" className="form-select" name='college' value={user.college} {...register("college", {
                required: "Please enter your college",

              })} onChange={Change}>
                <option value="" disabled selected>Select College  </option>
                <option>Sushila Devi Bansal College of Technology, Indore </option>
                <option>Sushila Devi Bansal College of Engineering, Indore </option>
                <option>Bansal Institute of Science & Technology, Bhopal</option>
                <option>Bansal Institute of Research & Technology, Bhopal</option>
                <option>Bansal Institute of Research & Technology Science, Bhopal</option>
                <option>Bansal College of Engineering, Mandideep</option>
              </select>
              {errors.college && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.college.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1">
              <label htmlFor="Branch" className="form-label">Select Branch</label>
              <select id="Branch" className="form-select" name='branch' value={user.branch} {...register("branch", {
                required: "Please enter your Branch",

              })} onChange={Change}>
                <option value="" disabled selected>Select Branch  </option>
                <option>CSE</option>
                <option>IT</option>
                <option>ME</option>
                <option>CE</option>
                <option>EC</option>
                <option>Other</option>
              </select>
              {errors.branch && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.branch.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1 ">
              <label htmlFor="Year" className="form-label">Select Year</label>
              <select id="Year" className="form-select" name='year' value={user.year}{...register("year", {
                required: "Please enter your year",

              })} onChange={Change}>
                <option value="" disabled selected>Select Year  </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
              {errors.year && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.year.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1 ">
              <label htmlFor="Semester" className="form-label">Select Semester</label>
              <select id="Semester" className="form-select" name='semester' value={user.semester} {...register("semester", {
                required: "Please enter your semester",

              })} onChange={Change}>
                <option value="" disabled selected>Select Semester  </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
              </select>
              {errors.semester && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.semester.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1 ">
              <label htmlFor="Section" className="form-label">Select Section</label>
              <select id="Section" className="form-select" name='section' value={user.section} {...register("section", {
                required: "Please enter your section",

              })} onChange={Change}>
                <option value="" disabled selected>Select Section  </option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
              </select>
              {errors.section && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.section.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1 ">
              <label htmlFor="Language" className="form-label">Select Language</label>
              <select id="Language" className="form-select" name='language' value={user.language} {...register("language", {
                required: "Please enter your language",

              })} onChange={Change}>
                <option value="" disabled selected>Select Language  </option>
                <option>C</option>
                <option>C++</option>
                <option>Java</option>
                <option>Python</option>
                <option>Other</option>
              </select>
              {errors.language && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.language.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1">
              <label htmlFor="Date" className="form-label">Transaction Date</label>
              <input type="date" className="form-control" name='tdate' value={user.tdate} id="Date" {...register("tdate", {
                required: "Please enter your Date",

              })} onChange={Change} />
              {errors.tdate && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.tdate.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1">
              <label htmlFor="Time" className="form-label">Transaction Time</label>
              <input type="time" className="form-control" name='time' value={user.time} id="Time" {...register("time", {
                required: "Please enter your Time",

              })} onChange={Change} />
              {errors.time && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.time.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-1">
              <label htmlFor="Transaction1" className="form-label">Transaction ID/Reference ID</label>
              <input type="text" className="form-control" name='tid' value={user.tid} placeholder='Transaction ID' id="Transaction1" {...register("tid", {
                required: "Please enter your Transaction ID",

              })} onChange={Change} />
              {errors.tid && <span style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.tid.message}</span>}
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mx-auto my-5">
              <img src={QR} alt="" height="100%" width="100%" />
            </div>
            <div>
              <h3>
                Please check TransactionID /ReferenceID on Payment Receipt.
              </h3>
              <h3>Please check your email for further process.</h3>
              <h3>Registration fees will be 100 Rupees only.</h3>
            </div>
            <div className="col-12 my-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="Check" {...register("check", {
                  required: "Please check the box",


                })} onChange={Change} />

                <label className="form-check-label" htmlFor="Check">
                  Check me out
                </label>
                {errors.check && <p style={{ fontSize: "12px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>{errors.check.message}</p>}
              </div>
            </div>
            <div className="col-12 mb-3">
              <button type="submit" className="btn btn-success px-5" style={{ fontWeight: "bold" }}>Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}

export default EventRegi