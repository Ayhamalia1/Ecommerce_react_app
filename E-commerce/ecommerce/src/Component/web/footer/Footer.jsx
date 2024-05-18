import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoLogoWhatsapp } from "react-icons/io";


function Footer() {
  return (
    <div className='footer-container'>
      <div className="contact">

        <div className="social-icons">
          <FaFacebook className='icon' />
          <FaInstagram className='icon' />
          <FaLinkedin className='icon' />
          <IoLogoWhatsapp className='icon' />

        </div>
        <div className="email-input">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
