import * as yup from 'yup';

export const RegisterSchema = yup.object({
    userName:yup.string().required("user name is requried").min(3,"user name at least 3 characters"),
    email:yup.string().email().required("email is requried"),
    password:yup.string().required("password is requried").min(8,"password at least 8 characters").max(16,"password at most 16 characters"),
    image:yup.mixed().required("image is requried")
  });