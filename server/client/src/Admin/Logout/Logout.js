import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App';

const Logout = () => {
    const { state, dispatch } = useContext(UserContext)
    const Navigate = useNavigate();
    const check = async () => {
        /* for logout successful or not */
        const res = await fetch("/Logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        if (res.status === 201) {
            dispatch({ type: "USER", payload: false });
            Navigate("/Admin/Login");
        }
    }
    useEffect(() => {
        check();
    })
    return (
        <div>Logout</div>
    )
}

export default Logout