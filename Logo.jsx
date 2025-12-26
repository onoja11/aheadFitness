import React from 'react';

const Logo = ({ onClick }) => {
  return (
    <div className="flex-shrink-0 cursor-pointer z-50" onClick={onClick}>
      <img 
        src="https://aheadfitness.ng/img/logo2.png" 
        alt="Ahead Fitness" 
        className="h-10 md:h-12 w-auto object-contain brightness-200" 
      />
    </div>
  );
};

export default Logo;