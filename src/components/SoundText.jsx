import React, { useEffect, useState } from 'react';
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

  const handleInput = (e) => {
    const char = e.nativeEvent.data;
    if (char && char.length === 1) {
      setText(prev => prev + char);
      playSound(char);
      setActiveKey(char.toLowerCase());
      setTimeout(() => setActiveKey(null), 300);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key.length === 1) {
        const nota = allKeys.find(item => item.key.toLowerCase() === key);
        if (nota) {
          setText(prev => prev + key);
          playSound(key);
          setActiveKey(key);
          setTimeout(() => setActiveKey(null), 300);
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
        <textarea
          className="text-main input-box"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onInput={handleInput}
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
