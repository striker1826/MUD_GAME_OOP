import { MapData, NowLocation, ObjectList, Player, PlayerClass } from './data';
import { UserInput } from './input/input';
import { Character } from './service/character';
import {
  CreateEnemy,
  CreateItem,
  CreateNpc,
  CreateObject,
} from './service/create';

import { MakeMap, Move, Meet } from './service/map';

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
const meet = new Meet(player, nowLocation, mapData, createEnemy);
const move = new Move(nowLocation, mapData);
const gameInput = new UserInput(character, move, meet, makeMap);

gameInput.startGame();
