import Monster from '../models/monster';
const MONSTERS = [
  new Monster('m1', null, 'Kobold', 'Humanoid', 'Small', '1/8',
  {
    maxHp: 5,
    hp: 5,
    ac: 12,
    initiativeBonus: 2,
    deathSaves: { succeeded: 0, failed: 0 },
    abilityScores: {
      strength: 7,
      dexterity: 15,
      constitution: 9,
      intelligence: 8,
      wisdom: 7,
      charisma: 8
    },
    abilityScoreBonus: {
      strength: -2,
      dexterity: 2,
      constitution: -1,
      intelligence: -2,
      wisdom: -2,
      charisma: -2
    },
    skills: {
      acrobatics: 0,
      animalHandling: 0,
      arcana: 0,
      athletics: 0,
      deception: 0,
      history: 0,
      insight: 0,
      intimidation: 0,
      investigation: 0,
      medicine: 0,
      nature: 0,
      perception: 0,
      performance: 0,
      persuasion: 0,
      religion: 0,
      sleightOfHand: 0,
      stealth: 0,
      survival: 0,                                                                                                                                            }
  },),
  new Monster('m2', null, 'Acolyte', 'Humanoid', 'Medium', '1/4',
  {
    maxHp: 9,
    hp: 9,
    ac: 10,
    initiativeBonus: 0,
    deathSaves: { succeeded: 0, failed: 0 },
    abilityScores: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 14,
      charisma: 11
    },
    abilityScoreBonus: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 2,
      charisma: 1
    },
    skills: {
      acrobatics: 0,
      animalHandling: 0,
      arcana: 0,
      athletics: 0,
      deception: 0,
      history: 0,
      insight: 0,
      intimidation: 0,
      investigation: 0,
      medicine: 4,
      nature: 0,
      perception: 0,
      performance: 0,
      persuasion: 0,
      religion: 2,
      sleightOfHand: 0,
      stealth: 0,
      survival: 0,                                                                                                                                            }
  },),
  new Monster('m3', null, 'Cultist', 'Humanoid', 'Medium', '1/8',
  {
    maxHp: 9,
    hp: 9,
    ac: 12,
    initiativeBonus: 2,
    deathSaves: { succeeded: 0, failed: 0 },
    abilityScores: {
      strength: 11,
      dexterity: 12,
      constitution: 10,
      intelligence: 10,
      wisdom: 11,
      charisma: 10
    },
    abilityScoreBonus: {
      strength: 1,
      dexterity: 2,
      constitution: 0,
      intelligence: 0,
      wisdom: 1,
      charisma: 0
    },
    skills: {
      acrobatics: 0,
      animalHandling: 0,
      arcana: 0,
      athletics: 0,
      deception: 2,
      history: 0,
      insight: 0,
      intimidation: 0,
      investigation: 0,
      medicine: 0,
      nature: 0,
      perception: 0,
      performance: 0,
      persuasion: 0,
      religion: 2,
      sleightOfHand: 0,
      stealth: 0,
      survival: 0,                                                                                                                                            }
  },),
  new Monster('m4', null, 'Drake', 'Dragon', 'Large', '2',
  {
    maxHp: 21,
    hp: 21,
    ac: 15,
    initiativeBonus: 3,
    deathSaves: { succeeded: 0, failed: 0 },
    abilityScores: {
      strength: 12,
      dexterity: 15,
      constitution: 14,
      intelligence: 10,
      wisdom: 10,
      charisma: 9
    },
    abilityScoreBonus: {
      strength: 2,
      dexterity: 3,
      constitution: 2,
      intelligence: 0,
      wisdom: 0,
      charisma: 9
    },
    skills: {
      acrobatics: 0,
      animalHandling: 0,
      arcana: 0,
      athletics: 0,
      deception: 0,
      history: 0,
      insight: 0,
      intimidation: 0,
      investigation: 0,
      medicine: 0,
      nature: 0,
      perception: 2,
      performance: 0,
      persuasion: 0,
      religion: 0,
      sleightOfHand: 0,
      stealth: 2,
      survival: 0,                                                                                                                                            }
  },),
  new Monster('m5', null, 'Adult Blue Dragon', 'Dragon', 'Huge', '16',
  {
    maxHp: 225,
    hp: 225,
    ac: 19,
    initiativeBonus: 0,
    deathSaves: { succeeded: 0, failed: 0 },
    abilityScores: {
      strength: 25,
      dexterity: 0,
      constitution: 23,
      intelligence: 16,
      wisdom: 15,
      charisma: 19
    },
    abilityScoreBonus: {
      strength: 8,
      dexterity: 0,
      constitution: 7,
      intelligence: 3,
      wisdom: 2,
      charisma: 3
    },
    skills: {
      acrobatics: 0,
      animalHandling: 0,
      arcana: 0,
      athletics: 0,
      deception: 0,
      history: 0,
      insight: 0,
      intimidation: 0,
      investigation: 0,
      medicine: 0,
      nature: 0,
      perception: 12,
      performance: 0,
      persuasion: 0,
      religion: 0,
      sleightOfHand: 0,
      stealth: 5,
      survival: 0,                                                                                                                                            }
  },),
];

export default MONSTERS;
