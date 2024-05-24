import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

const Login = () => {
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
            name: name.current.value,
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
            name.current.value = "";
            password.current.value = "";
        } else {
            try {
                // Make POST request to user login endpoint
                const res = await axios.post(
                    "http://13.127.211.205:8000/v1/login/admin",
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
                    localStorage.setItem("role", "admin");
                   setTimeout(() => {
                    window.location.href = '/dashboard'
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
                        <img src='https://media.licdn.com/dms/image/D4D03AQFfruXrqZjqDg/profile-displayphoto-shrink_400_400/0/1714999731614?e=1721865600&v=beta&t=Ww4CI9NEfDtpTQ6lyA0QIBM7rOOqUS7JBxNRtO9op_M'/>
                        <h1></h1>
                    </div>
                    <div className="right-side col-6 d-flex justify-content-center align-items-center" >

                        <div class="container">
                            <div class="card">
                                <h2>Admin Login</h2>
                                    <input type="text" id="username" name="username" className='mt-3' placeholder="Username" ref={name} required />
                                    <input type="password" id="password" name="password" className='mt-3' placeholder="Password" ref={password} required />
                                    <button type="submit" className='mt-4  w-100' style={{backgroundColor:"black"}} onClick={handleSubmit} >Login</button>
                                    <Link to={'/loginuser'}> <button type="submit" style={{backgroundColor:"black"}} className='mt-4  w-100' >User Login</button></Link>
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
