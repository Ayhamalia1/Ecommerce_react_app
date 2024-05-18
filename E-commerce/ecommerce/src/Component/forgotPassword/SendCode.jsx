import { useFormik } from 'formik';
import React from 'react'
import Inputs from '../web/inputs/Inputs';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { sendCode } from '../web/validation/LoginValidation'
import axios from 'axios';

function SendCode() {
    let navigate =useNavigate()
    
    
    const initialValues = {
        email:"",
        };
        const onSubmit = async values=>{
            try{
                
              const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,values);
              if(data.message=="success"){
                  navigate("/forgotPassword");  
                  formik.resetForm(); 
                       }
            }
            catch(e){
            }
          }
          const formik=useFormik({
            initialValues:initialValues,
            onSubmit,
            validationSchema:sendCode
        })
        const inputs=[
            {
                name:"email",
                type:"email",
                label:"User Email",
                value:formik.values.email
            } ]
            const render= inputs.map((input,index)=>{
                return  <Inputs key={index}
                 label={input.label} 
                 id="username"  
                 name={input.name}
                  type={input.type} 
                  value={input.value}
                  onChange={ formik.handleChange}
                  errors={formik.errors}
                  onBlur={formik.handleBlur}
                  touched={formik.touched}
                  inputStyle={"loginInput form-control"}
                  />
             })

  return (
    <>
    {
        <div className="login d-flex">
        <div className="loginContent">
            <form onSubmit={formik.handleSubmit} >
                {render}
                <button type='submit' className='RegBtn loginBtn'disabled={!formik.isValid} >Send Code</button>
            </form >
        </div>
    </div>
    }
    <ToastContainer/>   </>  )
}
 

export default SendCode