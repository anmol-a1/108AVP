import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../Axios';
import { useNavigate } from 'react-router';
import '../css/main.css'
import { Link } from 'react-router-dom';
const Profile = (props) => {
    const history = useNavigate();
    const location = useLocation();
    const [load, setload] = useState(false);
    const [data, setdata] = useState({});
    const { user_name } = location.state;
    useEffect(() => {
        async function fetchExamUpcoming() {
            let response = await fetch('http://127.0.0.1:8000/profiledetails/' + user_name)
            let data = await response.json();
            setdata(data[0]);
            setload(true);
        }
        fetchExamUpcoming();
    }, [user_name]);
    const handleLogout= (e) => {
        e.preventDefault();
        const logout = async () => {
            try {
                const response = axiosInstance.post('api/logout/blacklist/', {
                    refresh_token: localStorage.getItem('refresh_token'),
                });
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axiosInstance.defaults.headers['Authorization'] = null;
                props.showalert("logout successfully", "success");
                history('/');
                
            } catch (err) {
                console.log(err);
                props.showalert("some error ocuured", "danger");
            }
        }
        logout();

    };
    return (

        <div className='abcd1'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">


                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <button onClick={handleLogout} className="btn btn-outline-success" type="submit">Logout</button>
                    </form>
                </div>
            </nav>
            {
                load ? <div className='anmol2'>
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <label className='col-lg-5 mb-2'>first_name :</label>
                            <label>{data.first_name}</label>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className='col-lg-5 mb-2'>username :</label>
                            <label>{data.user_name}</label>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className='col-lg-5 mb-2'>Email :</label>
                            <label>{data.email}</label>
                        </div>
                    </div>
                    <hr />
                    <p className='mx-3' >Address Details</p>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label className='col-lg-5 mb-2'>Street Address :</label>
                            <label>{data.street_address}</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <label className='col-lg-5 mb-2'>City :</label>
                            <label>{data.city}</label>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className='col-lg-5 mb-2'>State :</label>
                            <label>{data.state}</label>
                        </div>
                        <div className="col-md-4 mb-2">
                            <label className='col-lg-5 mb-2'>PIN CODE :</label>
                            <label>{data.Pin_Code}</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <label className='col-lg-5 mb-2'>Contact :</label>
                            <label>{data.contact}</label>
                        </div>
                    </div>



                </div> : <p></p>
            }
        </div>
    )
}

export default Profile
