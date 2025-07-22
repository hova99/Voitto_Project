import React from 'react';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  overlayText?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  overlayText 
}) => {
  return (
    <div 
      className="relative bg-cover bg-center py-24"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 35, 73, 0.7), rgba(0, 35, 73, 0.7)), url(${backgroundImage})`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-4">
          {subtitle}
        </p>
        {overlayText && (
          <div className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            {overlayText}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;