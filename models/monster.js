class Monster {
  constructor(id, name, type, size, cr, hp, ac, initiativeBonus, initiative){
    this.id = id;
    this.name = name;
    this.type = type;
    this.size = size;
    this.cr = cr;
    this.hp = hp;
    this.ac = ac;
    // this.userId = user.id;
    this.initiativeBonus = initiativeBonus;
    this.initiative = initiative;
  }
}

export default Monster;
