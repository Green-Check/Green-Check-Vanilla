// MainContent.jsx
import { useState } from 'react';
import { Upload, Camera, Search, CheckCircle } from 'lucide-react';
import './HomePage.css'

const HomePage = () => {
 
  return (
   <div className='bg-white text-black min-h-screen w-screen flex justify-center'>
    <div className='heading border-2 border-amber-400'>
      <p className='text-[2.25rem]'>Ready to Scan ? </p>
      <p className='text-gray-500'>Enter a barcode below or use your camera!</p>
    </div>

   </div>
  );
};

export default HomePage;
