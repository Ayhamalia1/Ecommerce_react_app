import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Inputs from '../web/inputs/Inputs';
import { ToastContainer, toast } from 'react-toastify';
import { forgotPassword } from '../web/validation/LoginValidation'
import axios from 'axios';
 


function ForgotPassword() {
    let navigate =useNavigate()
    const initialValues = {
        email:"",
        password:"",
        code:""
        };
        const onSubmit = async values=>{
            try{
                const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,values);
                 if(data.message=="success"){
                    formik.resetForm(); 
                    toast.success('Password rested successfully', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });   
                        navigate('/')
                       }
            }
            catch(e){
              toast.error(`${e.response.data.message}`, {
                  position: "top-center",
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
  
            }
          }
       const formik=useFormik({
          initialValues:initialValues,
          onSubmit,
          validationSchema:forgotPassword
      })
      const inputs=[
        {
            name:"email",
            type:"email",
            label:"User Email",
            value:formik.values.email
        },
        {
            name:"password",
            type:"password",
            label:"User Password",
            value:formik.values.password
        },
        {
            name:"code",
            type:"text",
            label:"Code",
            value:formik.values.code
        }
    ]
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
                <button type='submit' className='RegBtn loginBtn'disabled={!formik.isValid} >Rest Passsword</button>
            </form >

        </div>
    </div>
    }
    <ToastContainer/>    </>  )
}

export default ForgotPassword