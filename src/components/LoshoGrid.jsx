import React, { useRef } from 'react';
import html2canvas from 'html2canvas-pro';

const LoshoGrid = () => {
  const printRef = useRef(null);

  const handleExportClick = async () => {
    const element = printRef.current;

    if (!element) return;

    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2
    });

    const data = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = data;
    link.download = 'my-lo-shu-grid.png';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const inputStyles = `
    w-16 h-16 md:w-20 md:h-20 
    text-center text-xl md:text-2xl font-bold 
    text-purple-900 
    bg-gradient-to-br from-amber-50 to-amber-100 
    focus:from-amber-100 focus:to-amber-200
    border-2 border-transparent
    focus:border-amber-400
    outline-none 
    transition-all duration-300
    placeholder:text-amber-300
  `;

  return (
    <div className="card-mystic p-6">
      <div ref={printRef} className="flex flex-col items-center py-4">
        <h2 className="mb-5 text-xl font-bold text-purple-900 flex items-center gap-2">
          <span className="text-2xl">🔮</span> The Lo Shu Grid
        </h2>

        <div className="relative p-1.5 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-lg">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl blur-lg opacity-30"></div>

          <div className="relative grid grid-cols-3 gap-1 bg-gradient-to-br from-purple-700 to-purple-900 p-1 rounded-lg">
            {/* Row 1 */}
            <input
              type="text"
              className={`rounded-tl-lg ${inputStyles}`}
              defaultValue="4"
              maxLength="3"
            />
            <input
              type="text"
              className={inputStyles}
              defaultValue="9"
              maxLength="3"
            />
            <input
              type="text"
              className={`rounded-tr-lg ${inputStyles}`}
              defaultValue="2"
              maxLength="3"
            />

            {/* Row 2 */}
            <input
              type="text"
              className={inputStyles}
              defaultValue="3"
              maxLength="3"
            />
            <input
              type="text"
              className={`${inputStyles} ring-2 ring-amber-400/50`}
              defaultValue="5"
              maxLength="3"
            />
            <input
              type="text"
              className={inputStyles}
              defaultValue="7"
              maxLength="3"
            />

            {/* Row 3 */}
            <input
              type="text"
              className={`rounded-bl-lg ${inputStyles}`}
              defaultValue="8"
              maxLength="3"
            />
            <input
              type="text"
              className={inputStyles}
              defaultValue="1"
              maxLength="3"
            />
            <input
              type="text"
              className={`rounded-br-lg ${inputStyles}`}
              defaultValue="6"
              maxLength="3"
            />
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-500 text-center">
          ✏️ Edit the grid to customize your Lo Shu
        </p>
      </div>

      <button
        onClick={handleExportClick}
        className="w-full btn-secondary flex items-center justify-center gap-2 mt-4"
      >
        <span>📸</span>
        <span>Download as Image</span>
      </button>
    </div>
  );
};

export default LoshoGrid;