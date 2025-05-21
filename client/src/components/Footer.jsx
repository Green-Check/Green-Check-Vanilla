// components/Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white pt-10 pb-4">
      <div className="w-full p-4 m-4  mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-around">

        {/* Brand Info */}
        <div className="border-2">
          <h2 className="text-2xl font-bold mb-3 text-green-300">Green-Check-Vanilla</h2>
          <p className="text-sm leading-relaxed">
            Scan product barcodes to get detailed nutritional insights, ratings, and better alternatives tailored to your income level.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-green-300">Home</a></li>
            <li><a href="#about" className="hover:text-green-300">About</a></li>
            <li><a href="#features" className="hover:text-green-300">Features</a></li>
            <li><a href="#contact" className="hover:text-green-300">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2"><FaEnvelope /> support@greencheck.com</li>
            <li>Phone: +91-12345-67890</li>
            <li>WhatsApp: +91-12345-67890</li>
          </ul>
          <div className="flex space-x-4 mt-3 text-lg">
            <a href="#" className="hover:text-green-300"><FaGithub /></a>
            <a href="#" className="hover:text-green-300"><FaLinkedin /></a>
            <a href="#" className="hover:text-green-300"><FaTwitter /></a>
            <a href="#" className="hover:text-green-300"><FaFacebook /></a>
          </div>
        </div>

        {/* Address and Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Office Address</h3>
          <p className="text-sm">
            Green-Check Technologies Pvt. Ltd.<br />
            2nd Floor, Innovation Tower<br />
            Kukatpally, Hyderabad, Telangana - 500072<br />
            India
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <a href="#" className="hover:text-green-300">Privacy Policy</a><br />
            <a href="#" className="hover:text-green-300">Terms of Service</a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-700 mt-10 pt-4 text-center text-sm text-green-200">
        © {new Date().getFullYear()} Green-Check. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
