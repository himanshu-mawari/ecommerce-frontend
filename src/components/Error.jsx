import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className=" pt-12 pb-24 lg:pt-24 lg:pb-40 flex flex-col items-center justify-center px-6 bg-white border-t border-gray-300">
      <div className="text-center">
        {/* Abstract 404 Visual */}
        <div className="relative inline-block">
          <h1 className="text-[12rem] font-bold text-gray-100 leading-none select-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <span className="inline-block bg-white border border-gray-200 px-4 py-1 text-xs uppercase tracking-[0.3em] font-medium text-gray-400 rotate-[-5deg] shadow-sm">
              Page Not Found
            </span>
          </div>
        </div>

        {/* Messaging */}
        <div className="mt-4">
          <h2 className="text-2xl font-light tracking-tight text-gray-900 uppercase sm:text-3xl">
            Lost in the clouds?
          </h2>
          <p className="mt-3 text-gray-500 font-light max-w-sm mx-auto">
            The page you are looking for doesn't exist or has been moved to a new URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            to="/"
            className="w-full sm:w-48 py-3 bg-black text-white text-sm font-medium rounded-3xl uppercase tracking-widest transition-all duration-300 active:scale-95"
          >
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-48 py-3 bg-white text-black text-sm font-medium rounded-3xl uppercase tracking-widest border border-gray-900 hover:bg-gray-50 transition-all duration-300 active:scale-95"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;