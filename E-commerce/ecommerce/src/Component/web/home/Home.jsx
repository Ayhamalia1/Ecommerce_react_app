import React from 'react'
import Categories from '../categories/Categories'

export default function Home() {
  return (
    <div>
      <div className="background " >
          <h3>Welcome to My Store, where shopping meets delight! 🛍️ Explore our curated collection of the latest trends"</h3>
          <button className='RegBtn '>Get Started</button>
        </div>
        <Categories/>
  
    </div>
  )
}
