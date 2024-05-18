import React, { useContext } from 'react'
import Inputs from '../inputs/Inputs'
import { useFormik } from 'formik'
import { LoginSchema } from '../validation/LoginValidation'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../userContext/UserContext'

export default function Login() {

    let {DecodeUserToken}=useContext(UserContext)
    let navigate =useNavigate()
    const token=localStorage.getItem('token')

    const initialValues = {
        email:"",
        password:"",
        };
        const onSubmit = async values=>{
          try{
            const {data}= await axios.post('https://ecommerce-node4.vercel.app/auth/signin',values);
            if(data.message=="success"){
                localStorage.setItem("token",data.token);
                DecodeUserToken();
                navigate("/");  
                formik.resetForm(); 
                     }
          }
          catch(e){
            console.log(e)
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
        validationSchema:LoginSchema
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
                <button type='submit' className='RegBtn loginBtn'disabled={!formik.isValid} >Login</button>
            </form >
            <Link className='Link' to='/sendCode'>Rest Password ?</Link>

        </div>
    </div>
    }
    <ToastContainer />    </>
  )
}
