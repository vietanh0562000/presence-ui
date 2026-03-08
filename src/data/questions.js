// src/data/questions.js
// Edit this file to add, remove, or change grounding questions.

export const QUESTIONS = [
  {
    sense: 'Air & Wind',
    icon: '🌬',
    question: 'What does the air feel like on your skin right now?',
    hint: 'Is it warm or cool? Still or moving? Does wind touch your face, your arms?',
    chips: ['Cool & still', 'Warm & humid', 'Gentle breeze', 'Cold & sharp', 'Stuffy', 'Fresh'],
  },
  {
    sense: 'Sound',
    icon: '👂',
    question: 'Close your eyes. What is the farthest sound you can hear?',
    hint: 'Cars? Birds? Wind in trees? Someone\'s voice? A hum of a machine?',
    chips: ['Traffic', 'Birds', 'Wind', 'Voices', 'Silence', 'Music', 'Rain', 'My own breath'],
  },
  {
    sense: 'Smell',
    icon: '🌿',
    question: 'What does the air smell like right now?',
    hint: 'Take a slow breath through your nose. Food? Earth? Rain? Nothing at all?',
    chips: ['Fresh air', 'Food nearby', 'Petrichor', 'Flowers', 'Smoke', 'Coffee', 'Nothing'],
  },
  {
    sense: 'Body',
    icon: '🫀',
    question: 'Where in your body do you feel your heartbeat?',
    hint: 'Place a hand on your chest. Can you feel it? In your throat? Temples? Fingertips?',
    chips: ['Chest', 'Throat', 'Fingertips', 'Temples', 'Stomach', 'Wrists'],
  },
  {
    sense: 'Light',
    icon: '☀️',
    question: 'Describe the light around you right now.',
    hint: 'Is it bright or dim? Natural or artificial? What color does it cast on things near you?',
    chips: ['Golden sunlight', 'Grey & soft', 'Harsh white', 'Warm lamp', 'Blue screen', 'Dark'],
  },
  {
    sense: 'Ground',
    icon: '🪨',
    question: 'What do your feet and body touch right now?',
    hint: 'Feel the chair, the floor, your clothes. Are you supported? What textures?',
    chips: ['Solid floor', 'Soft chair', 'Grass / ground', 'Bed', 'Rough surface', 'Smooth & cool'],
  },
  {
    sense: 'Aliveness',
    icon: '✨',
    question: 'What is one thing that makes you feel you are here — alive — in this exact moment?',
    hint: 'It can be tiny. A smell, a sound, the weight of your own body. What anchors you to now?',
    chips: [],
  },
]

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
