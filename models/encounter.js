class Encounter {
  constructor(id, title, campaign, description, difficulty, partyId, monsters, allies, settings, active, state, combatants){
    this.id = id;
    this.title = title;
    this.campaign = campaign;
    this.description = description;
    this.difficulty = difficulty;
    this.partyId = partyId;
    this.monsters = monsters;
    this.allies = allies;
    this.settings = settings;
    this.active = active;
    this.state = state;
    this.combatants = combatants;
  }
}

export default Encounter;
