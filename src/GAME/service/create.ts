import { ObjectList } from '../data';

export class CreateItem {
  constructor(private objectList: ObjectList) {}
  randomItem() {
    const randomNum = Math.floor(Math.random() * 2);
    if (randomNum === 0) {
      return { map: 'item', name: this.objectList.itemList[randomNum] };
    } else if (randomNum === 1) {
      return { map: 'item', name: this.objectList.itemList[randomNum] };
    }
  }
}

export class CreateEnemy {
  randomEnemy() {
    const randomNum = Math.floor(Math.random() * 10 + 1);
    const LV = randomNum;
    const HP = 30 * randomNum;
    const ATK = 5 * randomNum;
    return { map: 'enemy', LV, HP, ATK };
  }
}

export class CreateNpc {
  constructor(private objectList: ObjectList) {}
  randomNpc() {
    const randomNum = Math.floor(Math.random() * 3);
    if (randomNum === 0) {
      return { map: 'npc', class: this.objectList.npcList[randomNum] };
    } else if (randomNum === 1) {
      return { map: 'npc', class: this.objectList.npcList[randomNum] };
    } else if (randomNum === 2) {
      return { map: 'npc', class: this.objectList.npcList[randomNum] };
    }
  }
}

export class CreateObject {
  constructor(
    private createEnemy: CreateEnemy,
    private createNpc: CreateNpc,
    private createItem: CreateItem,
  ) {}

  randomPlace() {
    const num = Math.floor(Math.random() * 3);
    if (num === 0) {
      return this.createEnemy.randomEnemy();
    } else if (num === 1) {
      return this.createNpc.randomNpc();
    } else if (num === 2) {
      return this.createItem.randomItem();
    }
  }
}
