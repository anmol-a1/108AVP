import React from 'react'
import '../css/main.css'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../Axios';
import { Link } from 'react-router-dom'
const Login = (props) => {
    const history = useNavigate();
    const [formData, updateFormData] = useState({user_name: "", password: "" });

    const handleChange = (e) => {

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginandgetdata = async () => {
            try {
                const resp = await axiosInstance.post('api/login/', {
                    user_name: formData.user_name,
                    password: formData.password
                });
                localStorage.setItem('access_token', resp.data.access);
				localStorage.setItem('refresh_token', resp.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
                props.showalert("logged in successfully", "success");
                history('/profile', {
                    state: {
                        user_name: resp.data.user_name
                    }
                });
                
            } catch (err) {
                props.showalert("please enter valid credentials", "danger");
            }
        }
        loginandgetdata();

    };


    return (
        <>
            <div className='abcd1'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/register">Register</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='anmol'>
                <div className="container sm my-3">

                    <div style={{color:"black"}}>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">username</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" onChange={handleChange} aria-describedby="emailHelp" name="user_name" placeholder="Enter Username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleChange} name="password" placeholder="Password" />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-sm">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default Login
