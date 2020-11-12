//建造房子场景
//建造者 - 施工团队
let Builder = function () {
  //成员01 -- 决定厅室
  function Rooms(member) {
    if (member <= 0) {
      throw new Error("入住人数错误！");
    }
    this.rooms = member >= 4 ? 4 : member;
  }
  //成员02 -- 决定面积
  function FloorSpace(budget) {
    if ((typeof budget !== "number") || Number.isNaN(budget) || (budget < 60)) {
      throw new Error("预算过低或错误！");
    }
    this.budget = budget;
  } //成员03 -- 整体风格
  function Style(style) {
    this.style = style || "常规风格";
  }
  return class {
    //住几人，预算多少(万)，风格
    constructor(member, budget, style) {
      Rooms.call(this, member);
      FloorSpace.call(this, budget);
      Style.call(this, style);
    }
  };
}(); //包工头获取客户需求，然后建造房子
let house1 = new Builder(1, 100, "小清新"); //客户1的需求
let house2 = new Builder(4, 200, "欧美"); //客户2的需求