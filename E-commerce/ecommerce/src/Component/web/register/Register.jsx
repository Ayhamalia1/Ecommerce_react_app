import React from 'react'
import Inputs from '../inputs/Inputs'
import img from '../../../../public/images/reg.avif'
import { useFormik } from 'formik'
import { RegisterSchema } from '../validation/RegisterValation'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Register() {

    const initialValues = {
        userName:"",
        email:"",
        password:"",
        image:""
        };
        //Handle image
        const handleImage=(e)=>{
            formik.setFieldValue("image",e.target.files[0])

        }
        const onSubmit = async values=>{
          const formData=new FormData();
          formData.append("userName", values.userName)
          formData.append("email", values.email)
          formData.append("password", values.password)
          formData.append("image", values.image)
          try{
            const {data}= await axios.post('https://ecommerce-node4.vercel.app/auth/signup',formData);
            if(data.message=="success"){
                toast.success('Account created successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });   
                    formik.resetForm(); 
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
        validationSchema:RegisterSchema
    })
    const inputs=[
        {
            name:"userName",
            type:"text",
            label:"User Name",
            value:formik.values.userName
        },
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
            name:"image",
            type:"file",
            label:"User image",
            onChange:handleImage

        }
    ]
   const render= inputs.map((input,index)=>{
       return  <Inputs key={index}
        label={input.label} 
        id="username"  
        name={input.name}
         type={input.type} 
         value={input.value}
         onChange={input.onChange || formik.handleChange}
         errors={formik.errors}
         onBlur={formik.handleBlur}
         touched={formik.touched}
         inputStyle="inputs form-control"
         />
    })
  return (
    <>
    <div className=" mt-4 register d-flex">
        <img src={img}></img>
        <div className="registerInputs">
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                {render}
                <button type='submit' className='RegBtn'disabled={!formik.isValid} >Submit</button>
            </form >
        </div>
    </div>
    <ToastContainer />

    </>
  )
}
