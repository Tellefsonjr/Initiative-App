class Player {
  constructor(id, name, className, level, hp, initiativeBonus, initiative ){
    this.id = id;
    this.name = name;
    this.className = className;
    this.level = level;
    this.hp = hp;
    // this.user = user;
    this.initiativeBonus = initiativeBonus;
    this.initiative = initiative;
  }
};

export default Player;
