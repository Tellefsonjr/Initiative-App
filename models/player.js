class Player {
  constructor(id, name, className, level, maxHp, hp, ac, initiativeBonus ){
    this.id = id;
    this.name = name;
    this.className = className;
    this.level = level;
    this.ac = ac;
    this.maxHp = maxHp;
    this.hp = hp;
    // this.user = user;
    this.initiativeBonus = initiativeBonus;
  }
};

export default Player;
