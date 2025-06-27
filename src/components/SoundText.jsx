import React, { useEffect, useState } from 'react';
import Data from '../static/Data';
import '../style/Sound.css';

function SoundText() {
  const [text, setText] = useState('');

  useEffect(() => {
    const handle = (e) => {
      const key = e.key.toLowerCase();
      const allKeys = [...Data.row1, ...Data.row2, ...Data.row3];

      if (e.key === 'Backspace') {
        setText(prev => prev.slice(0, -1));
        return;
      }

      if (e.key === ' ') {
        setText(prev => prev + ' ');
        return;
      }

      if (e.key.length === 1) {
        const Nota = allKeys.find(item => item.key.toLowerCase() === key);
        if (Nota) {
          const audio = new Audio(Nota.sound);
          audio.play().catch(e => console.log("Audio error:", e));
        }
        setText(prev => prev + key);
      }
    };

    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);

  return (
    <>
      <div className="text-cart">
        <h1 className='text-main'>
          {text}
          <span className="flying-cursor">|</span>
        </h1>
      </div>

      <div className="klavish-container">
        {[Data.row1, Data.row2, Data.row3].map((row, i) => (
          <div key={i} className="klavish-row">
            {row.map((item, index) => (
              <div key={index} className="cart-klavish">
                <h1 className="klavish-text">{item.key}{item.note}</h1>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default SoundText;
