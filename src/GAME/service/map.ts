import { MapData, mapSize, NowLocation, Player } from '../data';
import * as readline from 'readline';
import { CreateEnemy, CreateObject } from './create';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class MakeMap {
  constructor(
    private nowLocation: NowLocation,
    private mapData: MapData,
    private createObject: CreateObject,
  ) {}

  // 맵을 만드는 함수
  public makeMap(size: number) {
    const startPlace = this.mapData.startPoint(size);

    for (let i = 0; i < size; i++) {
      this.mapData.map.push([]);
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i === startPlace && j === startPlace) {
          this.mapData.map[i][j] = { map: '광장' };
        } else {
          this.mapData.map[i][j] = this.createObject.randomPlace();
        }
      }
    }

    this.nowLocation.nowX = startPlace;
    this.nowLocation.nowY = startPlace;
  }
}

export class Move {
  constructor(private nowLocation: NowLocation, private mapData: MapData) {}

  selectMove(input: string) {
    let nowLocation;

    switch (input) {
      case '동':
        this.nowLocation.nowX += 1;
        nowLocation =
          this.mapData.map[this.nowLocation.nowX][this.nowLocation.nowY];
        console.log(nowLocation);
        return nowLocation;
      case '서':
        this.nowLocation.nowX -= 1;
        nowLocation =
          this.mapData.map[this.nowLocation.nowX][this.nowLocation.nowY];
        console.log(nowLocation);
        return nowLocation;
      case '남':
        this.nowLocation.nowY -= 1;
        nowLocation =
          this.mapData.map[this.nowLocation.nowX][this.nowLocation.nowY];
        console.log(nowLocation);
        return nowLocation;
      case '북':
        this.nowLocation.nowY += 1;
        nowLocation =
          this.mapData.map[this.nowLocation.nowX][this.nowLocation.nowY];
        console.log(nowLocation);
        return nowLocation;
      case '귀환':
        this.nowLocation.nowX = this.mapData.startPoint(mapSize);
        this.nowLocation.nowY = this.mapData.startPoint(mapSize);
        console.log(
          '\n ==================== 광장으로 귀환했습니다 ==================== \n',
        );
        return;
      default:
        console.log(
          "\n ========== '동', '서', '남', '북', '귀환' 중에서 골라주세요 ========== \n",
        );
        return;
    }
  }
}

export class Meet {
  constructor(
    private player: Player,
    private nowLocation: NowLocation,
    private mapData: MapData,
    private createEnemy: CreateEnemy,
  ) {}

  getItem(data: any) {
    const name = data.name;
    if (name === '회복약') {
      this.player.player.HP += this.player.player.totalHp * 0.5;
      if (this.player.player.HP > this.player.player.totalHp) {
        this.player.player.HP = this.player.player.totalHp;
      }
      console.log(
        `\n ========== 체력 ${this.player.player.HP}회복 ========== \n`,
      );
      console.log(`\n ==========현재 체력 ${this.player.player.HP} ==========`);
    } else if (name === '공격력 증가') {
      const randomNum = Math.floor(Math.random() * 10 + 1);
      this.player.player.ATK += randomNum;
      console.log(`\n ========== 공격력 ${randomNum} 증가 ========== \n`);
      console.log(
        `\n ========== 현재 공격력 ${this.player.player.ATK} ==========`,
      );
    }
    return;
  }

  meetEnemyActions(input: string, data: any) {
    if (input === '1') {
      console.log('공격공격');
      console.log('적이 쓰러졌습니다');
      this.mapData.map[this.nowLocation.nowX][this.nowLocation.nowY] = [
        '이곳에는 아직 아무것도 없습니다',
      ];
      setTimeout(() => {
        this.mapData.map[this.nowLocation.nowX][this.nowLocation.nowY] =
          this.createEnemy.randomEnemy();
      }, 30000);
      return;
    } else if (input === '2') {
      console.log('도망도망');
      return;
    } else {
      console.log('저런... 보기 중에서 골라주세요. 우선 광장으로 돌려보낼게요');
      this.nowLocation.nowX = this.mapData.startPoint(mapSize);
      this.nowLocation.nowY = this.mapData.startPoint(mapSize);
      console.log(
        '\n ==================== 광장으로 귀환했습니다 ==================== \n',
      );
    }
  }
}
