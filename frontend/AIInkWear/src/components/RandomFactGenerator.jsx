import React, { useState, useEffect } from 'react';

const RandomFactGenerator = () => {
  const [randomFact, setRandomFact] = useState('');

  const randomFacts = [
    "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
    "The national animal of Scotland is the unicorn.",
    "Bananas are berries, but strawberries are not.",
    "The Eiffel Tower can be 15 cm taller during the summer, due to thermal expansion of the metal.",
    "The Great Wall of China is not visible from space with the naked eye.",
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
    "The average person will spend six months of their life waiting for red lights to turn green.",
    "Cats have five toes on their front paws, but only four toes on their back paws.",
    "Octopuses have three hearts.",
    "Polar bears are left-handed.",
    "The dot over the letter 'i' is called a tittle.",
    "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
    "The national animal of Scotland is the unicorn.",
    "Bananas are berries, but strawberries are not.",
    "The Eiffel Tower can be 15 cm taller during the summer, due to thermal expansion of the metal.",
    "The Great Wall of China is not visible from space with the naked eye.",
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
    "The average person will spend six months of their life waiting for red lights to turn green.",
    "Cats have five toes on their front paws, but only four toes on their back paws.",
    "Octopuses have three hearts.",
    "Polar bears are left-handed.",
    "The dot over the letter 'i' is called a tittle.",
    "Elephants are the only animals that can't jump.",
    "The word 'nerd' was first coined by Dr. Seuss in 'If I Ran the Zoo'.",
    "A flock of crows is known as a murder.",
    "The only letter that doesn't appear in any U.S. state name is the letter Q.",
    "The unicorn is the national animal of Scotland.",
    "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
    "A 'jiffy' is an actual unit of time: 1/100th of a second.",
    "The average person walks the equivalent of three times around the world in a lifetime.",
    "A group of flamingos is called a flamboyance.",
    "Ketchup was sold in the 1830s as medicine.",
    "The Great Wall of China is not visible from space with the naked eye."
  ];
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * randomFacts.length);
      setRandomFact(randomFacts[randomIndex]);
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>While you wait... Did you know...</h1>
      <h2>{randomFact}</h2>
    </div>
  );
};

export default RandomFactGenerator;
