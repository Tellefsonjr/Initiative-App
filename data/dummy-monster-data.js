import Monster from '../models/monster';
const MONSTERS = [
  new Monster('m1', 'Kobold', 'Humanoid', 'Small', '1/8', 5, 5, 12, 2, 0),
  new Monster('m2', 'Acolyte', 'Humanoid', 'Medium', '1/4', 9, 9, 10, 0, 0),
  new Monster('m3', 'Cultist', 'Humanoid', 'Medium', '1/8', 9, 9, 12, 1, 0),
  new Monster('m4', 'Drake', 'Dragon', 'Large', '2', 20, 20, 15, 3, 0),
  new Monster('m5', 'Adult Blue Dragon', 'Dragon', 'Huge', '16', 225, 225, 19, 0, 0),
];

export default MONSTERS;
