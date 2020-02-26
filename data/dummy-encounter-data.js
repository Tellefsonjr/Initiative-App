import Encounter from '../models/encounter';

const ENCOUNTERS = [
  new Encounter('e1', 'Short Encounter', "Campaign 1", "Encounter at Greenest", 30,
    {id: 'pt1', title: 'First Party',
      players: [ 'p1', 'p2', 'p3', 'p4' ]
    },
    [ {id: 'm1', count: 1}, {id: 'm2', count: 1} ],
    [],
    { autoRoll: { monsters: true, players: true } },
    false,
    { round: 0, turn: 0, order: []},
    [],
  ),
  new Encounter('e2', 'Long Encounter', "Campaign 1", "", 50,
    {id: 'pt2', title: 'Second Party',
      players: [ 'p1', 'p2', 'p3', 'p4', 'p5' ]
    },
    [ { id:'m1', count:1}, { id:'m2', count:2}, { id:'m3', count:1}, { id:'m4', count:1}, { id:'m5', count:1} ],
    [],
    { autoRoll: { monsters: true, players: true } },
    false,
    { round: 0, turn: 0, order: []},
    [],
  ),
  new Encounter('e3', 'Test Encounter', "Campaign 1", "", 50,
    {id: 'pt2', title: 'Second Party',
      players: [ 'p1', 'p2', 'p3', 'p4', 'p5' ]},
      [ {id: 'm1', count: 1}, {id: 'm2', count: 2}, {id: 'm3', count: 1}, {id: 'm4', count: 1}, {id: 'm5', count: 1} ],
      [],
      { autoRoll: { monsters: true, players: false } },
      false,
      { round: 0, turn: 0, order: []},
      [],
    ),
];

export default ENCOUNTERS
