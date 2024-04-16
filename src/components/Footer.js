
import React from 'react';
import './Footer.css';
import logo from '../image.png'; 

export default function Footer() {
  return (
    <footer className="text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <h4>About Us</h4>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur molestias quasi architecto est obcaecati hic quos totam porro, corporis delectus. 
            </p>
          </div>
          <div className="col-lg-4 col-md-6">
            <h4>Legal</h4>
            <ul className="list-unstyled">
              <li className="text-white">Terms of use</li>
              <li className="text-white">Privacy policy</li>
              <li className="text-white">DMCA</li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6">
            <img src={logo} alt="Logo" style={{ maxWidth: '300px' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
