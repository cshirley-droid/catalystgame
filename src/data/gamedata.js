// src/data/gamedata.js

export const FRIEND_PERSONA = {
  id: 'friend',
  name: 'A Friend',
  title: 'Local Rival',
  cost: 0,
  reward: 0,
  desc: 'Share your device. Pass and play for honor.',
  difficulty: null,
  type: 'HUMAN',
  avatar: 'https://github.com/cshirley-droid/catalyst/blob/main/portrait_friend_man.png?raw=true'
};

export const AI_LADDERS = {
'terni-lapilli': [
  { 
      id: 'ai_easy', 
      name: "Commodus", 
      title: "The Gladiator", 
      cost: 10, reward: 20, 
      desc: "A reckless ruler. He plays for the spectacle rather than safety.", 
      difficulty: 'easy', 
      avatar: "https://github.com/cshirley-droid/catalyst/blob/main/portrait_commodus.png?raw=true" 
  },
  { 
      id: 'ai_med', 
      name: "Scipio", 
      title: "The Tactician", 
      cost: 25, reward: 50, 
      desc: "A disciplined general. He balances offense and defense efficiently.", 
      difficulty: 'medium', 
      avatar: "https://github.com/cshirley-droid/catalyst/blob/main/portrait_scipio.png?raw=true" 
  },
  { 
      id: 'ai_hard', 
      name: "M. Aurelius", 
      title: "Philosopher King", 
      cost: 50, reward: 100, 
      desc: "A stoic master of logic. He controls the center and rarely errs.", 
      difficulty: 'hard', 
      avatar: "https://github.com/cshirley-droid/catalyst/blob/main/portrait_marcus.png?raw=true" 
  }
],
'pong-hau-ki': [
  { id: 'ai_easy', name: "Liu Shan", title: "The Adou", cost: 10, reward: 20, desc: "He lacks initiative and relies too heavily on others.", difficulty: 'easy', avatar: "https://github.com/cshirley-droid/catalyst/blob/main/portrait_adou.png?raw=true" }, 
  { id: 'ai_med', name: "Guan Yu", title: "The General", cost: 25, reward: 50, desc: "Honorable and formidable. He attacks with direct strength.", difficulty: 'medium', avatar: "https://github.com/cshirley-droid/catalyst/blob/main/portrait_guanyu.png?raw=true" },
  { id: 'ai_hard', name: "Sun Tzu", title: "The Strategist", cost: 50, reward: 100, desc: "The master of deception. To beat him is a true feat.", difficulty: 'hard', avatar: "https://github.com/cshirley-droid/catalyst/blob/main/portrait_suntzu.png?raw=true" }
],
'seega': [
  { id: 'ai_easy', name: "Tutankhamun", title: "The Boy King", cost: 10, reward: 20, desc: "Young and inexperienced. He leaves openings in his defense.", difficulty: 'easy', avatar: "https://github.com/cshirley-droid/catalyst/blob/main/portrait_tut.png?raw=true" }, 
  { id: 'ai_med', name: "Hatshepsut", title: "Builder Queen", cost: 25, reward: 50, desc: "She builds a strong position with patience and calculation.", difficulty: 'medium', avatar: "https://github.com/cshirley-droid/catalyst/blob/main/portrait_hatshepsut.png?raw=true" },
  { id: 'ai_hard', name: "Ramesses II", title: "The Great", cost: 50, reward: 100, desc: "A conqueror whose will is absolute. He overwhelms his opponents.", difficulty: 'hard', avatar: "https://github.com/cshirley-droid/catalyst/blob/main/portrait_ramesses.png?raw=true" }
]
};

export const RULES_TEXT = {
'map': "Select a region on the map to begin.",
'terni-lapilli': "1. DROP: Place 3 stones each.\n2. MOVE: Slide to adjacent empty spots.\n3. WIN: Align 3 stones in a row.",
'pong-hau-ki': "1. MOVE: Slide along lines.\n2. GOAL: Trap the opponent so they cannot move.",
'seega': "1. DROP: Place 2 stones at a time.\n2. MOVE: Slide to adjacent squares.\n3. CAPTURE: Sandwich enemy stones to remove them."
};