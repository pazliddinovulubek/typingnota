import React, { useState, useEffect } from 'react';
import Data from '../static/Data';
import '../style/Sound.css';

function SoundText() {
  const [text, setText] = useState('');
  const [activeKey, setActiveKey] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const allKeys = [...Data.row1, ...Data.row2, ...Data.row3];

  const playSound = (char) => {
    const nota = allKeys.find(item => item.key.toLowerCase() === char.toLowerCase());
    if (nota) {
      const audio = new Audio(nota.sound);
      audio.play().catch(e => console.log("Audio error:", e));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 400);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleKeyDown = (e) => {
      if (window.innerWidth <= 400) return;

      const key = e.key;
      if (key === 'Backspace') {
        setText(prev => prev.slice(0, -1));
        return;
      }
      if (key === ' ') {
        setText(prev => prev + ' ');
        playSound(' ');
        setActiveKey(' ');
        setTimeout(() => setActiveKey(null), 200);
        return;
      }
      if (key.length === 1) {
        setText(prev => prev + key);
        playSound(key);
        setActiveKey(key.toLowerCase());
        setTimeout(() => setActiveKey(null), 200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMobileInput = (e) => {
    const val = e.target.value;
    const lastChar = val[val.length - 1];
    setText(val);
    if (lastChar) {
      playSound(lastChar);
      setActiveKey(lastChar.toLowerCase());
      setTimeout(() => setActiveKey(null), 200);
    }
  };

  return (
    <div>
      <div className="text-cart">
        {isMobile ? (
          <textarea
            className="input-box"
            value={text}
            onChange={handleMobileInput}
            placeholder="Yozing..."
          />
        ) : (
          <h1 className="text-main">
            {text}
            <span className="flying-cursor">|</span>
          </h1>
        )}
      </div>

      {!isMobile && (
        <div className="klavish-container">
          {[Data.row1, Data.row2, Data.row3].map((row, rowIndex) => (
            <div key={rowIndex} className="klavish-row">
              {row.map((item, keyIndex) => (
                <div
                  key={keyIndex}
                  className={`cart-klavish ${activeKey === item.key.toLowerCase() ? 'active' : ''}`}
                >
                  <h1 className="klavish-text">{item.key}</h1>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SoundText;
