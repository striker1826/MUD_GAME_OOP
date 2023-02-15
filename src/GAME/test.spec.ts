import {
  MapData,
  NowLocation,
  ObjectList,
  Player,
  PlayerClass,
} from './data';
import { Character } from './service/character';
import {
  CreateEnemy,
  CreateItem,
  CreateNpc,
  CreateObject,
} from './service/create';
import { MakeMap, Meet, Move } from './service/map';

const nowLocation = new NowLocation();
const mapData = new MapData();
const objectList = new ObjectList();
const createEnemy = new CreateEnemy();
const createNpc = new CreateNpc(objectList);
const createItem = new CreateItem(objectList);
const createObject = new CreateObject(createEnemy, createNpc, createItem);
const makeMap = new MakeMap(nowLocation, mapData, createObject);
const playerClass = new PlayerClass();
const player = new Player();
const character = new Character(playerClass, player);
const move = new Move(nowLocation, mapData);
const meet = new Meet(player, nowLocation, mapData, createEnemy);

describe('MakeMap Class Test', () => {
  it('makeMap에 입력된 숫자가 N 일때 mapData의 배열이 N x N이 되는지', () => {
    makeMap.makeMap(21);
    for (let i = 0; i < 21; i++) {
      expect(mapData.map[i].length).toBe(21);
    }
  });

  it('가운데 맵이 광장인지 확인', () => {
    makeMap.makeMap(21);
    expect(mapData.map[10][10].map).toBe('광장');
  });
});

describe('Character', () => {
  it('showCharacter', () => {
    expect(character.selectCharacter).toBeDefined();
  });
});

describe('Character Class Test', () => {
  it('selectCharacter에서 목록에 없는 player일 경우 undefined ', () => {
    expect(character.selectCharacter('목록에 없는 숫자')).toBe(undefined);
  });

  it('selectCharater에서 목록이 있는 직업일 경우 해당 직업 리턴', () => {
    character.selectCharacter('1');
    expect(player.player.class).toBe(playerClass.playerClassList[0].class);
  });
});

describe('Move Class Test', () => {
  makeMap.makeMap(21);

  it(" 방향이 '동'일 경우", () => {
    const nowX = nowLocation.nowX;

    move.selectMove('동');
    expect(nowLocation.nowX).toBe(nowX + 1);
  });
  it("방향이 '서'일 경우", () => {
    const nowX = nowLocation.nowX;
    move.selectMove('서');
    expect(nowLocation.nowX).toBe(nowX - 1);
  });
  it("방향이 '남'일 경우", () => {
    const nowY = nowLocation.nowY;
    move.selectMove('남');
    expect(nowLocation.nowY).toBe(nowY - 1);
  });
  it("방향이 '북'일 경우", () => {
    const nowY = nowLocation.nowY;
    move.selectMove('북');
    expect(nowLocation.nowY).toBe(nowY + 1);
  });
});

describe('Meet Class Item Test', () => {
  character.selectCharacter('1');
  describe('회복약', () => {
    it('HP가 피의 절반 미만일 경우', () => {
      player.player.HP = 30;
      let nowHp = player.player.HP;
      meet.getItem({ name: '회복약' });
      expect(player.player.HP).toBe((nowHp += player.player.totalHp * 0.5));
    });

    it('HP가 피의 절반 이상일 경우', () => {
      player.player.HP = 50;
      let nowHp = player.player.HP;
      meet.getItem({ name: '회복약' });
      expect(player.player.HP).toBe(player.player.totalHp);
    });
  });

  describe('공격력 증가', () => {
    it('공격력 증가', () => {
      player.player.ATK = 10;
      let nowAtk = player.player.ATK;
      meet.getItem({ name: '공격력 증가' });
      expect(player.player.ATK > nowAtk).toBeTruthy();
    });
  });
});
