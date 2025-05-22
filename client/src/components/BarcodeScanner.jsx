import React, { useRef, useEffect, useState } from 'react';
import Quagga from 'quagga'; // Make sure Quagga is installed
import Button from '@mui/material/Button';

import './BarcodeScanner.css'; // For scan-line animation

export default function BarcodeScanner({scanning, setScanning, product, setProduct}) {
  const videoRef = useRef(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    if (scanning) {
      console.log('Initializing Quagga...');
      Quagga.init({
        inputStream: {
          type: 'LiveStream',
          target: videoRef.current,
          constraints: {
            facingMode: 'environment',
          },
        },
        // locator: {
        //   patchSize: 'medium',
        //   halfSample: true,
        // },
        locator: {
          patchSize: 'x-large', // Try 'large' or 'x-large'
          halfSample: false,
        },
        numOfWorkers: navigator.hardwareConcurrency || 4,
        decoder: {
          readers: [
                'code_128_reader',
                'ean_reader',
                'ean_8_reader',
                'code_39_reader',
                'upc_reader',
                'upc_e_reader',
                'codabar_reader'
                ],      
        },
        locate: true,
        debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true,
        },
      }, err => {
        if (err) {
          console.error('Quagga init error:', err);
          return;
        }
        console.log('Quagga initialized. Starting scanner...');
        Quagga.start();
      });

      Quagga.onDetected(handleDetected);

      Quagga.onProcessed(result => {
        console.log('Processing frame...', result);
      });
    }

    return () => {
      Quagga.offDetected(handleDetected);
      if (scanning) {
        console.log('Stopping Quagga...');
        Quagga.stop();
      }
    };
  }, [scanning]);

  function handleDetected(data) {
    const code = data?.codeResult?.code;
    if (code) {
      console.log('Detected:', code);
      setResult(code);
      setScanning(false);
      alert(`Barcode scanned: ${code}`);
    }
  }

  function startScanning() {
    setResult('');
    setScanning(true);
  }

  function stopScanning() {
    setScanning(false);
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        {/* <button onClick={startScanning} disabled={scanning} style={{ marginRight: '0.5rem' }}>
          Scan
        </button> */}
        <Button onClick={stopScanning} disabled={!scanning} variant="outlined" color="secondary">
            Cancel
        </Button>
      </div>

      {scanning && (
        <div style={{ position: 'relative' }}>
          <div ref={videoRef} style={{ width: '100%', height: '400px', overflow: 'hidden' }} />

          {/* Scan-line overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
          >
            <div className="scan-line" />
          </div>
        </div>
      )}

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <h2>Result: {result}</h2>
        </div>
      )}
    </div>
  );
}
