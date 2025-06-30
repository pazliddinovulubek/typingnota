import React, { useEffect, useState } from 'react';
import Data from '../static/Data'; // Harflar va audio joylashgan obyekt
import '../style/Sound.css'; // CSS uslublar

function SoundText() {
  const [text, setText] = useState('');
  const [activeKey, setActiveKey] = useState(null); // Faol (bosilgan) tugma

  const allKeys = [...Data.row1, ...Data.row2, ...Data.row3];

  const playSound = (char) => {
    const nota = allKeys.find(item => item.key.toLowerCase() === char.toLowerCase());
    if (nota) {
      const audio = new Audio(nota.sound);
      audio.play().catch(e => console.log("Audio error:", e));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      // faqat bitta belgili tugmalarni ishlaymiz (a-z, 0-9 va boshqalar)
      if (key.length === 1) {
        const nota = allKeys.find(item => item.key.toLowerCase() === key);
        if (nota) {
          setText(prev => prev + key);
          playSound(key);
          setActiveKey(key); // tugma bosildi — qizil qil
          setTimeout(() => setActiveKey(null), 300); // 300ms dan so'ng tozalaymiz
        }
      }

      if (e.key === 'Backspace') {
        setText(prev => prev.slice(0, -1));
      }

      if (e.key === ' ') {
        setText(prev => prev + ' ');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div>
      <div className="text-cart">
        <h1 className="text-main">
          {text}
          <span className="flying-cursor">|</span>
        </h1>
      </div>

      <div className="klavish-container">
        {[Data.row1, Data.row2, Data.row3].map((row, rowIndex) => (
          <div key={rowIndex} className="klavish-row">
            {row.map((item, keyIndex) => (
              <div
                key={keyIndex}
                className={`cart-klavish ${
                  activeKey === item.key.toLowerCase() ? 'active' : ''
                }`}
              >
                <h1 className="klavish-text">{item.key}</h1>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SoundText;
