import { useState } from 'react';
import { Search, CheckCircle, Camera } from 'lucide-react';
import BarcodeScanner from '../components/BarcodeScanner';
import ProductDisplay from '../components/ProductDisplay';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CameraIcon from '@mui/icons-material/CameraAlt';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const HomePage = () => {
  const [barcode, setBarcode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [product, setProduct] = useState(null);

  const [showIncomeDropdown, setShowIncomeDropdown] = useState(false);
  const [incomeRange, setIncomeRange] = useState('');


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Submitted barcode:', barcode);
    console.log('Income range:', incomeRange);
    try {
      console.log("H1");
      const res = await axios.get('/api/products/getProduct', { barcode, incomeRange }, {withCredentials: true});
      console.log("H2");
      console.log(res.data);
      // setProduct(res.data);
    } catch (err) {
      console.error(err);
    }  
  
  };
  const handleBarcodeDetected = (code) => {
    setBarcode(code);
    setScanning(false);
    console.log('Scanned:', code);
    handleBarcodeSearch(code); // Trigger DB search here
  };


  return (
    <main className="min-h-screen w-full bg-[#FFF9F5] text-black flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-[#3C2A21] mb-2">Ready to Scan?</h1>
        <p className="text-gray-500 text-lg">Enter a barcode below or use your camera!</p>
      </div>

      {/* Card */}
     <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6 space-y-6
                transform hover:-translate-y-1 hover:shadow-xl transition-transform duration-300 ease-in-out">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Barcode Input and Check Button */}
          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Enter barcode..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-md"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
            </div>
           <Button
                type="submit"
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}  // MUI icon handles sizing well here
                className="transform hover:-translate-y-1 hover:shadow-xl transition-transform duration-300 ease-in-out"
                sx={{ 
                  px: 5, 
                  py: 1.5, 
                  borderRadius: '0.5rem', 
                  borderBottom: '2px solid #3C2A21',
                }}
              >
                Check
            </Button>
            
          </div>

          {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <div className="relative">
            <Button
              variant="outlined"
              startIcon={<WalletIcon />}
              onClick={() => setShowIncomeDropdown(!showIncomeDropdown)}
              sx={{
                backgroundColor: '#F5F5DC',
                color: 'black',
                borderColor: 'black',
                '&:hover': {
                  backgroundColor: '#EDE7D0',
                  borderColor: 'black',
                },
                px: 3,
                py: 1.5,
                borderRadius: '12px',
                borderBottom: '4px solid #3C2A21',
                fontWeight: '600',
                textTransform: 'none',
              }}
            >
              {incomeRange ? incomeRange : 'Set Income Range'}
            </Button>

            {/* Dropdown menu */}
            <div
              className={`absolute top-full mt-2 left-0 w-60 bg-white border border-gray-300 rounded-xl shadow-lg z-10 transform transition-all duration-300 ease-in-out origin-top ${
                showIncomeDropdown
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              {['Less than 30K', '30K to 70K', 'More than 70K'].map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setIncomeRange(option);
                    setShowIncomeDropdown(false);
                  }}
                  className="px-5 py-3 hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-800 transition-colors duration-200"
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outlined"
            startIcon={<CameraIcon />}
            onClick={() => setScanning(true)}
            sx={{
              backgroundColor: '#F5F5DC',
              color: 'black',
              borderColor: 'black',
              '&:hover': {
                backgroundColor: '#EDE7D0',
                borderColor: 'black',
              },
              px: 3,
              py: 1.5,
              borderRadius: '12px',
              borderBottom: '4px solid #3C2A21', // bottom border
            }}
          >
            Scan Barcode
          </Button>
        </div>
        </form>
        {scanning && (
            <BarcodeScanner scanning={scanning} setScanning={setScanning} product={product} setProduct={setProduct}/>
        )}

        {/* Product Display */}
        {product && <ProductDisplay product={product} />}


        {/* Inspiration Tags */}
        <div className="text-center text-sm text-gray-600 mt-2">
          Need inspiration? Try an example:
        </div>
        <div className="flex justify-center gap-3 flex-wrap text-sm text-gray-700">
          <span className="bg-gray-100 px-4 py-1 rounded-full">Dark Chocolate Bar</span>
          <span className="bg-gray-100 px-4 py-1 rounded-full">Milk Chocolate Biscuits</span>
          <span className="bg-gray-100 px-4 py-1 rounded-full">Organic Fruit & Nut Bar</span>
        </div>
      </div>

{/* Products display */}
       {product && <ProductCard barcode={barcode}/>}


      {/* CTA */}
      <div className="mt-10 text-center">
        <div className="bg-blue-100 text-blue-700 px-6 py-4 rounded-lg text-md font-medium max-w-md mx-auto">
          Get instant health scores & discover nutritious alternatives for your food.
        </div>
      </div>

     
    </main>
  );
};

export default HomePage;
