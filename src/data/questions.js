// src/data/questions.js
// Edit this file to add, remove, or change grounding questions.
// Each sense has multiple variants; pickQuestions() selects one per sense per session.

const QUESTION_POOL = [
  {
    sense: 'Air & Wind',
    icon: '🌬',
    variants: [
      {
        question: 'What does the air feel like on your skin right now?',
        hint: 'Is it warm or cool? Still or moving? Does wind touch your face, your arms?',
        chips: ['Cool & still', 'Warm & humid', 'Gentle breeze', 'Cold & sharp', 'Stuffy', 'Fresh'],
      },
      {
        question: 'Is there any movement in the air where you are?',
        hint: 'A draft from a vent? A breeze through a window? Or perfectly still?',
        chips: ['Completely still', 'Slight draft', 'Gentle breeze', 'Windy', 'Air conditioning', 'Fresh outside air'],
      },
      {
        question: 'Take a slow breath. How does the air feel entering your lungs?',
        hint: 'Cool or warm? Dry or moist?',
        chips: ['Cool & clean', 'Warm & heavy', 'Dry', 'Humid', 'Fresh', 'Stale'],
      },
    ],
  },
  {
    sense: 'Sound',
    icon: '👂',
    variants: [
      {
        question: 'Close your eyes. What is the farthest sound you can hear?',
        hint: 'Cars? Birds? Wind in trees? Someone\'s voice? A hum of a machine?',
        chips: ['Traffic', 'Birds', 'Wind', 'Voices', 'Silence', 'Music', 'Rain', 'My own breath'],
      },
      {
        question: 'What sound is closest to you right now?',
        hint: 'Your own breathing? A device? The rustle of your clothes?',
        chips: ['My breath', 'A device hum', 'My own movement', 'Someone nearby', 'Almost nothing'],
      },
      {
        question: 'If you had to name the mood of all the sounds around you — what word comes to mind?',
        hint: 'Busy? Quiet? Tense? Peaceful?',
        chips: ['Peaceful', 'Busy', 'Lonely', 'Cozy', 'Tense', 'Neutral', 'Wild'],
      },
    ],
  },
  {
    sense: 'Smell',
    icon: '🌿',
    variants: [
      {
        question: 'What does the air smell like right now?',
        hint: 'Take a slow breath through your nose. Food? Earth? Rain? Nothing at all?',
        chips: ['Fresh air', 'Food nearby', 'Petrichor', 'Flowers', 'Smoke', 'Coffee', 'Nothing'],
      },
      {
        question: 'Breathe in slowly. What is the first scent that arrives?',
        hint: 'Don\'t search — just notice what your nose catches first.',
        chips: ['Clean air', 'Something cooking', 'Earth', 'Soap or laundry', 'Coffee', 'Nothing clear'],
      },
      {
        question: 'Is there a smell here that feels familiar or comforting?',
        hint: 'Home, food, nature — does anything here smell like something?',
        chips: ['Feels like home', 'Like outside', 'Like food', 'Like someone I know', 'Unfamiliar', 'No smell'],
      },
    ],
  },
  {
    sense: 'Body',
    icon: '🫀',
    variants: [
      {
        question: 'Where in your body do you feel your heartbeat?',
        hint: 'Place a hand on your chest. Can you feel it? In your throat? Temples? Fingertips?',
        chips: ['Chest', 'Throat', 'Fingertips', 'Temples', 'Stomach', 'Wrists'],
      },
      {
        question: 'Where does your body feel heavy right now?',
        hint: 'Shoulders? Lower back? Behind your eyes?',
        chips: ['Shoulders', 'Lower back', 'Eyes', 'Chest', 'Legs', 'Nowhere — I feel light'],
      },
      {
        question: 'Take one slow breath. What part of your body moves most?',
        hint: 'Chest, belly, shoulders? Feel the rise and fall.',
        chips: ['Belly', 'Chest', 'Shoulders', 'All of me', 'Hard to tell'],
      },
    ],
  },
  {
    sense: 'Light',
    icon: '☀️',
    variants: [
      {
        question: 'Describe the light around you right now.',
        hint: 'Is it bright or dim? Natural or artificial? What color does it cast on things near you?',
        chips: ['Golden sunlight', 'Grey & soft', 'Harsh white', 'Warm lamp', 'Blue screen', 'Dark'],
      },
      {
        question: 'What is the brightest thing in your field of vision?',
        hint: 'A window, a screen, a light source? Let your eyes settle on it.',
        chips: ['The sky', 'A screen', 'A lamp', 'A window', 'Sunlight', 'Nothing stands out'],
      },
      {
        question: 'Does the light here feel harsh, soft, or somewhere in between?',
        hint: 'Notice how it lands on things near you.',
        chips: ['Soft & diffused', 'Bright & sharp', 'Warm & dim', 'Cool & flat', 'Natural', 'Artificial'],
      },
    ],
  },
  {
    sense: 'Ground',
    icon: '🪨',
    variants: [
      {
        question: 'What do your feet and body touch right now?',
        hint: 'Feel the chair, the floor, your clothes. Are you supported? What textures?',
        chips: ['Solid floor', 'Soft chair', 'Grass / ground', 'Bed', 'Rough surface', 'Smooth & cool'],
      },
      {
        question: 'Feel the surface beneath you. Is it firm or giving?',
        hint: 'Press your weight down slightly. Does it push back? Hold you steadily?',
        chips: ['Firm & solid', 'Soft & sinking', 'Cool & hard', 'Warm & padded', 'Uneven', 'Steady'],
      },
      {
        question: 'What textures can you feel without moving your hands?',
        hint: 'Clothing against skin, a seat, a floor. What is most noticeable?',
        chips: ['Smooth fabric', 'Rough surface', 'Soft cushion', 'Hard & cool', 'Warm wood', 'Textured floor'],
      },
    ],
  },
  {
    sense: 'Aliveness',
    icon: '✨',
    variants: [
      {
        question: 'What is one thing that makes you feel you are here — alive — in this exact moment?',
        hint: 'It can be tiny. A smell, a sound, the weight of your own body. What anchors you to now?',
        chips: [],
      },
    ],
  },
]

export function pickQuestions() {
  return QUESTION_POOL.map(({ sense, icon, variants }) => ({
    sense,
    icon,
    ...variants[Math.floor(Math.random() * variants.length)],
  }))
}

export const MOODS = [
  '🌊 Calm',
  '🌱 Grounded',
  '✨ Alive',
  '💭 Reflective',
  '🌫 Foggy',
  '🔥 Restless',
  '🕊 Peaceful',
  '🌧 Heavy',
]
