import React, { useRef } from 'react';
import html2canvas from 'html2canvas-pro';

const LoshoGrid = () => {
  // 1. Create a reference to the DOM element we want to capture
  const printRef = useRef(null);

  // 2. The Export Function
  const handleExportClick = async () => {
    const element = printRef.current;
    
    if (!element) return;

    // Generate the canvas
    const canvas = await html2canvas(element, {
        backgroundColor: null,
      scale: 2 // Captures at 2x resolution for better quality on retina screens
    });

    // Convert canvas to image URL
    const data = canvas.toDataURL('image/png');

    // Create a fake link to trigger the download
    const link = document.createElement('a');
    link.href = data;
    link.download = 'my-lo-shu-grid.png';

    // Click the link programmatically
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Styles reused for consistency
  const inputStyles = "w-20 h-20 text-center text-2xl font-bold text-amber-900 bg-amber-50 focus:bg-white outline-none transition-colors";

  return (
    <div className="flex flex-col items-center justify-center p-10 min-h-screen bg-stone-100">
      
      {/* 3. The "Capture Zone" - Only content inside this div will be in the image */}
      <div ref={printRef} className="p-8 bg-stone-100 flex flex-col items-center rounded-xl">
        <h2 className="mb-6 text-2xl font-serif text-amber-900 font-bold">The Lo Shu Grid</h2>
        
        <div className="relative p-2 bg-amber-800 rounded-lg shadow-2xl">
          <div className="grid grid-cols-3 gap-1 bg-amber-800 border-2 border-amber-800">
            {/* Row 1 */}
            <input type="text" className={`rounded-tl-md ${inputStyles}`} defaultValue="4" />
            <input type="text" className={inputStyles} defaultValue="9" />
            <input type="text" className={`rounded-tr-md ${inputStyles}`} defaultValue="2" />

            {/* Row 2 */}
            <input type="text" className={inputStyles} defaultValue="3" />
            <input type="text" className={inputStyles} defaultValue="5" />
            <input type="text" className={inputStyles} defaultValue="7" />

            {/* Row 3 */}
            <input type="text" className={`rounded-bl-md ${inputStyles}`} defaultValue="8" />
            <input type="text" className={inputStyles} defaultValue="1" />
            <input type="text" className={`rounded-br-md ${inputStyles}`} defaultValue="6" />
          </div>
        </div>
      </div>

      {/* 4. The Button - This stays OUTSIDE the printRef so it doesn't appear in the photo */}
      <button 
        onClick={handleExportClick}
        className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2"
      >
        <span>📸 Download as Image</span>
      </button>

    </div>
  );
};

export default LoshoGrid;