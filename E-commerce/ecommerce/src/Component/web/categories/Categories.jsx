import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Loader from '../../loader/Loader';
import { useQuery } from 'react-query';
import { Navigation, Pagination} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import CategoryDetails from './CategoryDetails';
export default function Categories() {

  const getCategories=async()=>{
      const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=7`)
      return data
  }
  let {data,isLoading}=useQuery("Web categories",getCategories)
  return (
    <>
    {isLoading ? (
        <Loader />
    ) : (
      <div>
        <div className='swiperBackground '>
        <div className="container ">
            <h2 className='text-center p-4'>Categories</h2>
            <Swiper
                className='pt-4'
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {data?.categories && data?.categories.map((cat, index) => (
                    <SwiperSlide key={cat.id}>
                        <Link to={`/products/category/${cat.id}`} >
                            <img src={cat.image.secure_url} alt={`Category ${index}`} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        </div>

        </div>
    )}
</>
  )


}
