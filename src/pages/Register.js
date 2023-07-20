import React from 'react';
import {useState, useEffect} from "react";
import {Form,message} from "antd";
import Input from 'antd/es/input/Input';
import { Link,useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import "../resources/authentication.css";
import axios from "axios";
function Register() {
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();
    const onFinish =async (values) => {
      try {
        setLoading(true);
        await axios.post("/api/users/register",values)
        setLoading(false);
        message.success("Registration Successfull")
      } catch (error) {
        setLoading(false)
       message.error("Something went wrong")
      }
    }
    useEffect(()=>{
      if(localStorage.getItem("money-manager-user")){
          navigate("/")
      } 
      })
  return (
    <div className='register'>
        {loading && <Spinner />}
        <div className='row justify-content-center align-items-center w-100 h-100'>
            <div className='col-md-5'>
            <div className="lottie">
            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_OdVhgq.json"  background="transparent"  speed="0.5"  loop  autoplay></lottie-player>
            </div>
            </div>
            <div className='col-md-4'>
             <Form layout='vertical'onFinish={onFinish}>
                <h3 className="auth-title">Money Manager Registeration</h3>
                <hr />
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password"/>
                </Form.Item>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/login">Already Registered? Click here to Login</Link>
                    <button className='primary' type="submit">Register</button>
                </div>
             </Form>
            </div>
        </div>
    </div>
  )
}

export default Register