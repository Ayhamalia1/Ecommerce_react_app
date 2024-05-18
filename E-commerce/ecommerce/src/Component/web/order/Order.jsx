import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { CartContext } from '../cart/Cart'
import { Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import Inputs from '../inputs/Inputs';
import { useFormik } from 'formik';
import axios from 'axios';



function Order() {
    const { getCartProductContext } = useContext(CartContext)
    const { data } = useQuery("catr data", getCartProductContext)
    let token=localStorage.getItem("token")

    const initialValues = {
        couponName: "",
        address: "",
        phone: "",
    };
    const onSubmit = async () => {
        console.log(formik.values)
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/order`,
            formik.values,
                { headers:{authorization: `Tariq__${token}` } }
            )
                }
        catch (e) {
            // toast.error(`${e.response.data.message}`, {
            //     position: "top-center",
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // });
            
        }

    }
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit,
    })


    const inputs = [
        {
            name: "address",
            type: "text",
            label: "User Address",
            value: formik.values.address
        },
        {
            name: "phone",
            type: "text",
            label: "Phone Number",
            value: formik.values.phone
        },
        {
            name: "couponName",
            type: "text",
            label: "Coupon",
            value: formik.values.couponName
        }
    ]

    const render = inputs.map((input, index) => {
        return <Inputs key={index}
            label={input.label}
            id="username"
            name={input.name}
            type={input.type}
            value={input.value}
            onChange={formik.handleChange}
            errors={formik.errors}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            inputStyle={"loginInput form-control"}
        />
    })


    return (
        <>
            <div className="order container">
                <Row className=' mt-4'>
                    {
                        data && data.products.map((product) =>
                            <Col md={4} >
                                <Card className="bg-dark text-white  ">
                                    <Card.Img src={product.details.mainImage.secure_url} className='' alt="Card image" />
                                    <Card.ImgOverlay>
                                        <Card.Text className=' fs-4 mt-5 bg-primary text ' > {product.quantity}</Card.Text>
                                    </Card.ImgOverlay>
                                </Card>
                            </Col>
                        )
                    }
                </Row>
                {render}

                <div className='d-flex justify-content-between'>
                    <button className='RegBtn ms-4' onClick={onSubmit}>Order now</button>
                </div>

            </div>
            <ToastContainer />

        </>
    )
}

export default Order