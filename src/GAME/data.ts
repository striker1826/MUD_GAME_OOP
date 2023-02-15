export class Status {
  LV!: number;
  HP!: number;
  ATK!: number;
}

export class NowLocation {
  nowX!: number;
  nowY!: number;
}

export class MapData {
  map: any = [];

  public startPoint(size: number) {
    if (size % 2 === 0) {
      return size / 2;
    } else {
      return (size - 1) / 2;
    }
  }
}

export class ObjectList {
  npcList = ['의사', '노인', '사냥꾼'];
  itemList = ['회복약', '공격력 증가'];
}

export class Player {
  player!: {
    class: string;
    level: number;
    totalHp: number;
    HP: number;
    ATK: number;
    Exp: number;
  };
}

export class PlayerClass {
  playerClassList = [
    {
      id: '1',
      class: '전사',
      level: 1,
      totalHp: 100,
      HP: 100,
      ATK: 10,
      Exp: 0,
    },
  ];
}

export const mapSize = 21;
