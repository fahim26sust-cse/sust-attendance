import './ShinyText.css';
import { useEffect, useState } from 'react';

const ShinyText = ({ text, disabled = false, speed = 10, className = '', fontSize = '25px', fontWeight = '800',}) => {
  const [responsiveFontSize, setResponsiveFontSize] = useState(fontSize);

  const handleResize = () => {
    // Calculate fontSize based on the screen width
    const screenWidth = window.innerWidth;
    if (screenWidth <= 576) {
      setResponsiveFontSize('13px');
    } else if (screenWidth <= 768) {
      setResponsiveFontSize('15px');
    } else if (screenWidth <= 992) {
      setResponsiveFontSize('16px');
    } else if (screenWidth <= 1200) {
      setResponsiveFontSize('18px');
    } else {
      setResponsiveFontSize(fontSize); // Default fontSize or passed prop
    }
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Cleanup on component unmount
  }, []);

  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{ animationDuration, fontSize: responsiveFontSize , fontWeight: fontWeight,}}
    >
      {text}
    </div>
  );
};

export default ShinyText;
