import { useEffect, useRef, useState } from "react";
import "./Overlay.css"

const Overlay = ({ children, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={handleClick}>{children}</div>
      {isOpen && (
        <div ref={overlayRef} className="overlay">
          {content}
        </div>
      )}
    </div>
  );
};

export default Overlay;
