import axios from 'axios';
import React, { useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

const LoginUser = () => {
    // Refs for input fields
    let name = useRef();
    let password = useRef();

    // State to manage loading status
    const [loading, setLoading] = useState(false);


    // Function to handle form submission
    let handleSubmit = async () => {
        // Set loading state to true when form is submitted
        setLoading(true);

        // Get input values from refs
        let data = {
            cardNo: name.current.value,
            password: password.current.value,
        };

        // Validate input fields
        if (name.current.value === "" || password.current.value === "") {
            setLoading(false); // Reset loading state
            // Show error alert if any field is empty
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 1000,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "error",
                title: "Please complete all fields",
            });
        } else {
            try {
                // Make POST request to user login endpoint
                name.current.value = "";
                password.current.value = "";
                let res = await axios.post(
                    "http://13.127.211.205:8000/v1/login/user",
                    data
                );
                console.log(res.status);
                if (res.status == 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Login Succesfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    localStorage.setItem("role", "user");
                    localStorage.setItem("userData", JSON.stringify(res.data.data));
                    setTimeout(() => {
                        window.location.href = '/home'
                    }, 1000);
                }
            } catch (error) {
                console.error(error);

            }
        }
    };


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="left-side col-6 d-flex justify-content-center align-items-center ">
                        <h1>E-VOTING</h1>
                    </div>
                    <div className="right-side col-6 d-flex justify-content-center align-items-center" >

                        <div class="container">
                            <div class="card">
                                <h2>User Login</h2>
                                <input type="text" id="username" name="username" className='mt-3' placeholder="Username" ref={name} required />
                                <input type="password" id="password" name="password" className='mt-3' placeholder="Password" ref={password} required />
                                <button type="submit" className='mt-4  w-100' onClick={handleSubmit} style={{ backgroundColor: "black" }}>Login</button>
                                <Link to={'/adminlogin'}> <button type="submit" className='mt-4  w-100' style={{ backgroundColor: "black" }}>Admin Login</button></Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginUser
