import React, { useState, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Login/Login.css"
import LOGO from '../../Components/LOGO';
import Logo from "../../images/Logo.jpg"
import { RiLockPasswordLine, RiUser3Fill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../App';
const Login = () => {
  const { state, dispatch } = useContext(UserContext)
  const Navigate = useNavigate();
  /*   pop up to show login credantial */
  const successtostify = () => {
    toast.success('Login Successful', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar:false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      closeButton:false,
     theme:'colored'
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
      theme:'colored'

    });
  }
  const [user, setuser] = useState({
    email: "",
    password: "",
  })
  let name, value;
  const InputField = (e) => {
    name = e.target.name
    value = e.target.value
    setuser({ ...user, [name]: value });
  }
  const submit = async (e) => {
    e.preventDefault();
    const { email, password } = user
    /* for Login successful or not */
    try {
      const res = await fetch("/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      })
      if (res.status === 201) {
        dispatch({ type: "USER", payload: true })
        successtostify();
        setTimeout(() => Navigate("/Admin/AdminHome"), 3000);
      }
      else {

        errortostify();
        //window.alert("Login Failled");
      }
    } catch (err) {

      console.log(err)
    }
  }
  return (
    <><ToastContainer/>
      <div className="container ContainerMargin text-center">
        <LOGO />
        <div className="row">
          <h3 className='HeadingPageName mb-5'>This Is Only For Admin</h3>
          <div className="container h-100 mt-5">
            <div className="d-flex justify-content-center h-100">
              <div className="user_card">
                <div className="d-flex justify-content-center">
                  <div className="brand_logo_container">
                    <img src={Logo} className="brand_logo" alt="Logo" />
                  </div>
                </div>
                <div className="d-flex justify-content-center form_container">
                  <form action='/Login' method='POST' onSubmit={submit}>
                    <div className="input-group mb-3">
                      <div className="input-group-append">
                        <span className="input-group-text"><RiUser3Fill style={{ fontSize: "25px" }} /></span>
                      </div>
                      <input type="text" name="email" className="form-control input_user" onChange={InputField} value={user.name} placeholder="Email" />
                    </div>
                    <div className="input-group mb-2">
                      <div className="input-group-append">
                        <span className="input-group-text"><RiLockPasswordLine style={{ fontSize: "25px" }} /></span>
                      </div>
                      <input type="password" name="password" className="form-control input_pass" onChange={InputField} value={user.password} placeholder="password" />
                    </div>

                    <div className="d-flex justify-content-center mt-3 login_container">
                      <button type="submit" name="button" className="btn login_btn">Login</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login