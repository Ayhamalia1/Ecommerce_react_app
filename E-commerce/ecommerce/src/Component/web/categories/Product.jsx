import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import Loader from '../../loader/Loader';
import { CartContext } from '../cart/Cart';


function Product() {
    let { id } = useParams()

    const getProductDetails = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
        return data.product
    }
    const { data, isLoading } = useQuery('Product_data', getProductDetails)
    const {addToCartContext}=useContext(CartContext)
    const addToCart=async(id)=>{
      await  addToCartContext(id)
   }
    return (
        <>
            {
                isLoading ? (<Loader />) : (
                    <Container>
                        <Row className='mt-3 mb-4'>
                            <Col md={6} >
                                {/* Main product image */}
                                <img className='' src={data.mainImage.secure_url}/>

                            </Col>
                            <Col md={6}>
                                {/* Product details */}
                                <h2>{data.name}</h2>
                                <p className='mt-4 w-75'>  <strong>Description :</strong> {data.description}</p>
                                <p><strong>Price :</strong>  $ {data.price}</p>
                                <Button variant="primary" onClick={()=>addToCart(data._id)}>Add to Cart</Button>
                                <Row className='mt-4'>
                                    {data.subImages.map((img) =>
                                        <Col xs={6} md={3}>
                                            <Image src={img.secure_url} thumbnail />
                                        </Col>
                                    )}
                                    {/* Add more sub-images as needed */}
                                </Row>

                            </Col>
                        </Row>
                        {/* Sub-images (thumbnails) */}

                        <Row>
                        </Row>
                        {/* Review section */}
                        <Row>

                            {/* Review form */}
                            <Col>
                                <Form >
                                    <Form.Group controlId="formAuthormb-2">
                                        <Form.Label>Your Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" />
                                    </Form.Group>
                                    <Form.Group controlId="formRating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as="select">
                                            <option>5</option>
                                            <option>4</option>
                                            <option>3</option>
                                            <option>2</option>
                                            <option>1</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formComment">
                                        <Form.Label>Your Review</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Write your review" />
                                    </Form.Group>
                                    <Button type="submit" className='mt-2 btn mb-2'>
                                        Submit Review
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>

                )
            }


        </>
    )
}

export default Product