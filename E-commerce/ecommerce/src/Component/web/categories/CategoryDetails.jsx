import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { NavLink, useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Categories from './Categories';
import Loader from '../../loader/Loader';
import { CartContext } from '../cart/Cart';

function CategoryDetails() {
    const { id } = useParams();
    const getProducts = async () => {
        let { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`);
        return data.products;
    };
    const {addToCartContext}=useContext(CartContext)
    const addToCart=async(id)=>{
      await  addToCartContext(id)
   }


    const { data,isLoading } = useQuery('catrgort products', getProducts);

    // State to manage "Show more" status for each product
    const [showMoreMap, setShowMoreMap] = useState({});

    const toggleShowMore = (productId) => {
        setShowMoreMap(prevState => ({
            ...prevState,
            [productId]: !prevState[productId] 
        }));
    };

    return (
        <>
        {
            isLoading ? (<Loader/>) :(      
             <div className="container mb-4">
            <div className="row">
                {data ? data.map((product) => (
                    <div className="col-md-4" key={product._id}>
                        <Card style={{ width: '25rem', marginTop: '20px' }}>
                            <Card.Img variant="top" src={product.mainImage.secure_url} />
                            <Card.Body>
                                <Card.Title style={{ width: '390px' }}>{product.name}</Card.Title>
                                <Card.Text style={{
                                    width: '350px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: showMoreMap[product._id] ? 'normal' : 'nowrap',
                                }}>
                                    {product.description}
                                </Card.Text>
                                <Button variant="primary" onClick={() => toggleShowMore(product._id)}>
                                    {showMoreMap[product._id] ? 'Show less' : 'Show more'}
                                </Button>
                                <Button className='ms-1' variant="primary" onClick={()=>addToCart(product._id)}>Add to Cart</Button>

                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Price : {product.price} $</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <NavLink to={`/product/${product._id}`}>Show Details</NavLink>
                            </Card.Body>
                        </Card>
                    </div>
                )):<h2>no categories found</h2>}
            </div>
        </div>)
        }
        </>


    );
}

export default CategoryDetails;
