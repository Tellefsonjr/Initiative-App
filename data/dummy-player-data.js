import Player from '../models/player';

const PLAYERS = [
  new Player('p1', null, 'Okaros', 'Goliath', 'Blood Hunter',
  {
    level: 3,
    maxHp: 21,
    hp: 21,
    ac: 16,
    initiativeBonus: 1,
    deathSaves: { succeeded: 0, failed: 0 },
    abilityScores: {
      strength: 16,
      dexterity: 14,
      constitution: 16,
      intelligence: 17,
      wisdom: 11,
      charisma: 13
    },
    abilityScoreBonus: {
      strength: 2,
      dexterity: 1,
      constitution: 2,
      intelligence: 3,
      wisdom: 1,
      charisma: 1
    }
  }),
  new Player('p2', null, 'Vethis', 'Aasimar', 'Cleric',
  {
    level: 3,
    maxHp: 23,
    hp: 23,
    ac: 17,
    initiativeBonus: 2,
    deathSaves: { succeeded: 0, failed: 0 },
    abilityScores: {
      strength: 16,
      dexterity: 14,
      constitution: 16,
      intelligence: 13,
      wisdom: 17,
      charisma: 12
    },
    abilityScoreBonus: {
      strength: 2,
      dexterity: 1,
      constitution: 2,
      intelligence: 1,
      wisdom: 3,
      charisma: 1
    },
  }),
  new Player('p3', null, 'Scree', 'Aarakocra', 'Monk',
  {
    level: 3,
    maxHp: 24,
    hp: 24,
    ac: 16,
    initiativeBonus: 3,
    deathSaves: { succeeded: 0, failed: 0 },
    abilityScores: {
      strength: 13,
      dexterity: 17,
      constitution: 16,
      intelligence: 14,
      wisdom: 15,
      charisma: 12
    },
    abilityScoreBonus: {
      strength: 2,
      dexterity: 3,
      constitution: 2,
      intelligence: 2,
      wisdom: 2,
      charisma: 1
    },
  },),
  new Player('p4', null, 'Whisp', 'Kenku', 'Warlock',
  {
    level: 3,
    maxHp: 19,
    hp: 19,
    ac: 15,
    initiativeBonus: 1,
    deathSaves: { succeeded: 0, failed: 0 },
    abilityScores: {
      strength: 11,
      dexterity: 13,
      constitution: 16,
      intelligence: 14,
      wisdom: 13,
      charisma: 17
    },
    abilityScoreBonus: {
      strength: 1,
      dexterity: 1,
      constitution: 2,
      intelligence: 3,
      wisdom: 1,
      charisma: 3
    },
  },),
  new Player('p5', null, 'Kallista', 'Tiefling', 'Rogue', 
  {
    level: 3,
    maxHp: 21,
    hp: 21,
    ac: 16,
    initiativeBonus: 1,
    deathSaves: { succeeded: 0, failed: 0 },
    abilityScores: {
      strength: 12,
      dexterity: 17,
      constitution: 16,
      intelligence: 15,
      wisdom: 15,
      charisma: 15
    },
    abilityScoreBonus: {
      strength: 2,
      dexterity: 4,
      constitution: 2,
      intelligence: 2,
      wisdom: 2,
      charisma: 2
    },
  }
  ),
];
export default PLAYERS;
