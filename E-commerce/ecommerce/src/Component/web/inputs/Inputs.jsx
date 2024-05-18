import React from 'react'

export default function Inputs({label,name,type,value,onChange,errors,onBlur,touched,inputStyle}) {

  return (
    <>
    <div className='input'>
    <span className='label'>{label}<span className='span'>*</span></span>
    <br />
    <input className={inputStyle}
    type={type} name={name} 
    value={value} onChange={onChange}
     errors={errors} onBlur={onBlur}
     touched={touched}
     
     />
     
     {errors[name]&&touched[name]&&<p className='alert alert-danger mt-2 '>{errors[name]}</p>}
    </div>

    </>
  )
}
