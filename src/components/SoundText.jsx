import React, { useState } from 'react';
import Data from '../static/Data';
import '../style/Sound.css';

function SoundText() {
  const [text, setText] = useState('');
  const [activeKey, setActiveKey] = useState(null);

  const allKeys = [...Data.row1, ...Data.row2, ...Data.row3];

  const playSound = (char) => {
    const nota = allKeys.find(item => item.key.toLowerCase() === char.toLowerCase());
    if (nota) {
      const audio = new Audio(nota.sound);
      audio.play().catch(e => console.log("Audio error:", e));
    }
  };

  const handleKeyDown = (e) => {
    const key = e.key;

    if (key === 'Backspace' || key === 'Delete') {
      // faqat activeKey uchun ishlatamiz
      setActiveKey(null);
      return;
    }

    if (key === ' ') {
      playSound(' ');
      setActiveKey(' ');
      setTimeout(() => setActiveKey(null), 200);
      return;
    }

    if (key.length === 1) {
      playSound(key);
      setActiveKey(key.toLowerCase());
      setTimeout(() => setActiveKey(null), 200);
    }
  };

  return (
    <div>
      <div className="text-cart">
        <textarea
          className="text-main input-box"
          value={text}
          onChange={(e) => setText(e.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder="Yozing..."
        />
        <span className="flying-cursor">|</span>
      </div>

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
    </div>
  );
}

export default SoundText;
