import Encounter from '../models/encounter';

const ENCOUNTERS = [
  new Encounter('e1', 'Short Encounter', "Campaign 1", "Encounter at Greenest", 30, {id: 'pt1', title: 'First Party', players: [ 'p1', 'p2', 'p3', 'p4' ]}, [ 'e1', 'e2' ], []),
  new Encounter('e2', 'Long Encounter', "Campaign 1", "", 50, {id: 'pt2', title: 'Second Party', players: [ 'p1', 'p2', 'p3', 'p4', 'p5' ]}, [ 'e1', 'e2', 'e2', 'e3', 'e4', 'e5' ], []),
  new Encounter('e3', 'Test Encounter', "Campaign 1", "", 50, {id: 'pt2', title: 'Second Party', players: [ 'p1', 'p2', 'p3', 'p4', 'p5' ]}, [ 'e1', 'e2', 'e2', 'e3', 'e4', 'e5' ], []),
];

export default ENCOUNTERS
