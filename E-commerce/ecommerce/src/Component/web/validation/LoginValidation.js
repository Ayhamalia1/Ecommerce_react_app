import * as yup from 'yup';

export const LoginSchema = yup.object({
    email:yup.string().email().required("email is requried"),
    password:yup.string().required("password is requried").min(8,"password at least 8 characters").max(16,"password at most 16 characters"),
  });
  export const sendCode = yup.object({
    email:yup.string().email().required("email is requried"),

  });
  export const forgotPassword = yup.object({
    email:yup.string().email().required("email is requried"),
    password:yup.string().required("password is requried").min(8,"password at least 8 characters").max(16,"password at most 16 characters"),
    code:yup.string().required().length(4,"Code length must be 4")
  });