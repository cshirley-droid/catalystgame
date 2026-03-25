// src/systems/AudioSystem.js

// Placeholder Sounds (You can update these URLs later)
const SFX = {
  click: new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'),
  harvest: new Audio('https://assets.mixkit.co/active_storage/sfx/2044/2044-preview.mp3'),
  success: new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'),
  error: new Audio('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'),
  tick: new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'), // A light mechanical click
  deliver: new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3'), // A nice paper/stamp success sound
};

const bgMusic = new Audio('https://assets.mixkit.co/active_storage/sfx/1217/1217-preview.mp3'); 
bgMusic.loop = true;
bgMusic.volume = 0.3;

// Internal State
let isSystemMuted = true;

export const AudioSystem = {
  // 1. Check mute before playing SFX
  playSFX: (key) => {
    if (isSystemMuted) return; // STOP HERE if muted

    if (SFX[key]) {
      const sound = SFX[key].cloneNode();
      sound.volume = 0.5;
      sound.play().catch(e => console.log("Audio play blocked", e));
    }
  },

  // 2. Handle the global toggle
  setMuted: (muted) => {
    isSystemMuted = muted;
    
    if (muted) {
      bgMusic.pause();
    } else {
      bgMusic.play().catch(e => console.log("Autoplay blocked", e));
    }
  }
};