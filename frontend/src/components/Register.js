import React from 'react'
import '../css/main.css'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'
const Register = (props) => {
    const history = useNavigate();
    const [formData, updateFormData] = useState({ email: "", user_name: "", first_name: "", street_address: "", city: "", state: "", Pin_Code: "", contact: "", password: "" });
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    };
    const handleChange1 = async (e) => {
        if(document.getElementById("pass2").value !== formData.password){
            document.getElementById("passed2").innerText="passwords are not  matching";
        }
        else{
            var asd=document.getElementById("passed2");
            asd.innerText="";
            if(document.getElementById("pass2").value.length <8 || document.getElementById("pass1").value.length<8){
                asd.innerText="passwords must be 8 letter long"
            }
            else{
                document.getElementById('submit').classList.remove("disabled");
            }
            
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        function ValidateEmail(mail) {
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return (true)
            }
            props.showalert("You have entered an invalid email address!", "danger");
            return (false)
        }
        function ValidateContact(contact) {
            if (contact.length===10) {
                return (true)
            }
            props.showalert("Invalid Contact !", "danger")
            return (false)
        }
        function ValidatePIN(pin) {
            if (pin > 9999 && pin <= 999999) {
                return (true)
            }
            props.showalert("Invalid Pin Code !", "danger")
            return (false)
        }
        function ValidateAddress(address) {
            if (address.length>=25) {
                return (true)
            }
            props.showalert("Provide Address in Details i.e it must be atleart 25 letters long!", "danger")
            return (false)
        }
        function City(city) {
            if (city.length>=3) {
                return (true)
            }
            props.showalert("Provide City Name Correctly!", "danger")
            return (false)
        }
        function State(state) {
            if (state.length>=3) {
                return (true)
            }
            props.showalert("Provide State Name Correctly!", "danger")
            return (false)
        }
        function Username(user_name) {
            if (user_name.length>=3) {
                return (true)
            }
            props.showalert("User_Name must be atleast 3 letters long!", "danger")
            return (false)
        }
        function Firstname(first_name) {
            if (first_name.length>=3) {
                return (true)
            }
            props.showalert("Name must be atleast 3 letters long!", "danger")
            return (false)
        }
     
        if (Firstname(formData.first_name) && ValidateEmail(formData.email) && Username(formData.user_name) &&  ValidateContact(formData.contact) && ValidateAddress(formData.street_address) && City(formData.city) && State(formData.state) && ValidatePIN(formData.Pin_Code)) {
            const signupdata = async () => {
                const was = await fetch('http://127.0.0.1:8000/create/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        formData
                    )
                })
                if(was.status===500){
                    props.showalert("user_name or email already token", "danger");
                }
                else{
                    props.showalert("signup success", "success");
                    history('/');
                }
                
            }

            signupdata();
        
        }
    };


    return (
        <>
            <div className='abcd1'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='anmol1'>
                    <div className="container sm my-3">

                        <div style={{ color: "black" }}>
                            <form>

                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label >Name</label>
                                        <input type="email" className="form-control" onChange={handleChange} aria-describedby="emailHelp" name="first_name" placeholder="Enter Name" />

                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Email Address</label>
                                        <input type="email" className="form-control" onChange={handleChange} aria-describedby="emailHelp" name="email" placeholder="Enter email" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label >User-Name</label>
                                            <input type="text" className="form-control" onChange={handleChange} name="user_name" placeholder="Enter Username" />
                                            <small className="form-text text-muted">If you don't have college code, then contact with your respective exam co-ordinator</small>

                                        </div>

                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Contact No</label>
                                        <input type="email" className="form-control" onChange={handleChange} aria-describedby="emailHelp" name="contact" placeholder="Enter email" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                        <label >Address</label>
                                        <input type="text" className="form-control" onChange={handleChange} name="street_address" placeholder="Enter Address Here" />

                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-md-4 mb-3">
                                        <label >City</label>
                                        <input type="text" className="form-control" onChange={handleChange} name="city" placeholder="Enter City Name" />

                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <label>State</label>
                                        <input type="text" className="form-control" onChange={handleChange} name="state" placeholder="Enter State Name" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label>PIN CODE</label>
                                        <input type="text" className="form-control" onChange={handleChange} name="Pin_Code" placeholder="Enter Address PIN" />
                                    </div>
                                </div>
                            
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label >Password</label>
                                            <input id='pass1' type="password" className="form-control" onChange={handleChange} name="password" placeholder="Password" />
                                            <small id='passed1' className="form-text text-muted">Password Must be Atleast 8 Letters Long</small>
                                        </div>

                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label >Confirm Password</label>
                                            <input id="pass2" type="password" className="form-control" onChange={handleChange1}  placeholder="Password" />
                                            <small id='passed2' className="form-text text-muted"></small>
                                        </div>

                                    </div>

                                </div>

                                <div className="d-flex justify-content-end">
                                    <button id='submit' type="submit" onClick={handleSubmit} className="btn btn-primary btn-sm disabled">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
