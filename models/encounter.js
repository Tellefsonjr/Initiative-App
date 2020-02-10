class Encounter {
  constructor(id, title, campaign, description, difficulty, party, monsters, allies){
    this.id = id;
    this.title = title;
    this.campaign = campaign;
    this.description = description;
    this.difficulty = difficulty;
    this.party = party;
    this.monsters = monsters;
    this.allies = allies;
  }
}

export default Encounter;
