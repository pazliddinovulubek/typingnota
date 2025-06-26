import React, { useEffect } from 'react';
import Data from '../static/Data/Data';
import '../style/Sound.css'
function SoundText() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressedKey = e.key.toLowerCase();
      const foundNote = Data.find(item => item.key === pressedKey);
      if (foundNote) {
        const audio = new Audio(foundNote.sound);
        audio.play();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='klavish'>
      {Data.map((item, index) => (
        <div key={index} className='cart-klavish'>
          <p><strong>{item.note}</strong> ({item.key})</p>
          <audio src={item.sound} controls></audio>
        </div>
      ))}
    </div>

  );
}

export default SoundText;
