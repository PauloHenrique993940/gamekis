import React from 'react';

interface BlackHoleProps {
  level: number;
}

const BlackHoleBackground: React.FC<BlackHoleProps> = ({ level }) => {
  return (
    <div className={`black-hole-container level-${level}`}>
      <div className="black-hole"></div>
      <div className="accretion-disk"></div>
    </div>
  );
};

export default BlackHoleBackground;
