import { mapSize } from '../data';
import * as readline from 'readline';
import { Character } from '../service/character';
import { MakeMap, Meet, Move } from '../service/map';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class UserInput {
  constructor(
    private character: Character,
    private move: Move,
    private meet: Meet,
    private makeMap: MakeMap,
  ) {}
  async startGame() {
    console.log('\n ========== 게임 시작 ========== \n');
    rl.question('\n 아무 버튼이나 눌러주세요 \n', (input) => {
      this.makeMap.makeMap(mapSize);
      this.character.showCharacterList();
      this.inputSelectCharactor();
    });
  }

  inputSelectCharactor() {
    rl.question('\n 원하는 직업의 id를 입력해주세요 : ', (input) => {
      try {
        this.character.selectCharacter(input);
        this.inputSelectWay();
      } catch (err) {
        console.log('\n ===== 목록 중에서 선택해주세요 ===== \n');
        this.inputSelectCharactor();
      }
    });
  }

  inputSelectWay() {
    rl.question(
      "\n '동', '서', '남', '북', '귀환', '현재 위치 보기' 중 이동할 방향을 선택해주세요 : ",
      (input) => {
        const result = this.move.selectMove(input);

        if (!result) {
          this.inputSelectWay();
        } else if (result.map === 'item') {
          this.meet.getItem(result);
          this.inputSelectWay();
        } else if (result.map === 'npc') {
          console.log('\n ========== npc ========== \n');
          console.log(`\n ${result.class} 이(가) 지나갑니다 \n`);
          this.inputSelectWay();
        } else if (result.map === 'enemy') {
          this.inputMeetEnemy(result);
        } else {
          this.inputSelectWay();
        }
      },
    );
  }

  inputMeetEnemy(data: any) {
    const { LV, ATK, HP } = data;
    console.log('\n ========================= \n');
    console.log(`적 등장! 레벨: ${LV} 공격력: ${ATK} 체력: ${HP}`);
    console.log('\n ========================= ');
    rl.question(
      `\n 적을 마주쳤습니다 어떻게 하시겠습니까?\n 1.공격한다 \n 2.도망친다`,
      (input) => {
        this.meet.meetEnemyActions(input, data);
        this.inputSelectWay();
      },
    );
  }
}
