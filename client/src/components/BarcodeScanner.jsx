// client/src/components/BarcodeScanner.jsx
import { BrowserMultiFormatReader } from '@zxing/browser';
import { useEffect, useRef } from 'react';
import './BarcodeScanner.css'; // import custom CSS for the scanner overlay

const BarcodeScanner = ({ onDetected, onClose }) => {
  const videoRef    = useRef(null);
  const readerRef   = useRef(null);
  const controlsRef = useRef(null);
  const streamRef   = useRef(null);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;

    (async () => {
      try {
        // Try environment (back) camera first, fallback to user (selfie) camera
        let stream;
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } } });
        } catch (e) {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        }
        // If environment camera fails, fallback to user camera
        if (!stream) {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        }
        streamRef.current = stream;
        const track = stream.getVideoTracks()[0];
        const settings = track.getSettings();
        const deviceId = settings.deviceId;

        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current.play();

        const controls = await reader.decodeFromVideoDevice(
          deviceId,
          videoRef.current,
          (result) => result && onDetected(result.getText())
        );
        controlsRef.current = controls;
      } catch (err) {
        console.error("🛑 Scanner setup failed:", err);
        onClose();
      }
    })();

    return () => {
      if (controlsRef.current) controlsRef.current.stop();
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [onDetected, onClose]);

  const handleClose = () => {
    if (controlsRef.current) controlsRef.current.stop();
    else if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    onClose();
  };

  return (
    <div className="scanner-overlay fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-full max-h-full p-4 flex items-center justify-center">
        <div className="video-container w-full h-3/4 md:h-auto">
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-md"
            autoPlay
            playsInline
            muted
          />
          {/* Scanner animation overlay */}
          <div className="scan-line-container absolute inset-0 pointer-events-none">
            <div className="scan-line"></div>
          </div>
        </div>
      </div>
      <button
        onClick={handleClose}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Cancel
      </button>
    </div>
  );
};

export default BarcodeScanner;