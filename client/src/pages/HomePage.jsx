import { useState } from 'react';
import { Search, CheckCircle, Camera } from 'lucide-react';
import BarcodeScanner from '../components/BarcodeScanner';
import ProductDisplay from '../components/ProductDisplay';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CameraIcon from '@mui/icons-material/CameraAlt';


const HomePage = () => {
  const [barcode, setBarcode] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [product, setProduct] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted barcode:', barcode);
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
          <Button
            variant="outlined"
            startIcon={<WalletIcon />}
            onClick={() => setOpenDialog(!scanning)}
            sx={{
              backgroundColor: '#F5F5DC',      // beige background
              color: 'black',                  // black text
              borderColor: 'black',            // black border
              '&:hover': {
                backgroundColor: '#EDE7D0',   // darker beige on hover
                borderColor: 'black',
              },
              px: 3,  // padding x (left-right)
              py: 1.5, // padding y (top-bottom)
              borderRadius: '12px', // rounded corners
              borderBottom: '4px solid #3C2A21', // bottom border
            }}
          >
            Set Income Range
          </Button>

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

      {/* CTA */}
      <div className="mt-10 text-center">
        <div className="bg-blue-100 text-blue-700 px-6 py-4 rounded-lg text-md font-medium max-w-md mx-auto">
          Get instant health scores & discover nutritious alternatives for your food.
        </div>
      </div>

      {/* Dialog */}
      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Set Income Range</h2>
            <p className="text-sm text-gray-600 mb-4">Feature coming soon...</p>
            <button
              onClick={() => setOpenDialog(false)}
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
