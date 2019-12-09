import Encounter from '../models/encounter';

const ENCOUNTERS = [
  new Encounter('e1', 'Short Encounter', "Campaign 1", "Encounter at Greenest", [ 'p1', 'p2', 'p3', 'p4' ], [ 'e1', 'e2' ], []),
  new Encounter('e2', 'Long Encounter', "Campaign 1", "", [ 'p1', 'p2', 'p3', 'p4', 'p5' ], [ 'e1', 'e2', 'e2', 'e3', 'e4', 'e5' ], []),
];

export default ENCOUNTERS
