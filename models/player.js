class Player {
  constructor(id, name, className, hp, initiativeBonus, initiative ){
    this.id = id;
    this.name = name;
    this.className = className;
    this.hp = hp;
    // this.user = user;
    this.initiativeBonus = initiativeBonus;
    this.initiative = initiative;
  }
};

export default Player;
