'use client';

import { Download } from 'lucide-react';

export default function DownloadButton() {
  const handleDownload = () => {
    // Mock download functionality for demo
    alert('Recovery Timeline PDF would be downloaded here. This is a demo.');
  };

  return (
    <button 
      onClick={handleDownload}
      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center gap-2"
    >
      <Download className="w-5 h-5" />
      Download Recovery Timeline
    </button>
  );
}