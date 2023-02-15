import * as util from 'util';
import { Player, PlayerClass } from '../data';

export class Character {
  constructor(private playerClass: PlayerClass, private player: Player) {}

  showCharacterList() {
    console.log(
      `직업 목록 : ${util.inspect(this.playerClass.playerClassList)}`,
    );
    return;
  }

  selectCharacter(input: string) {
    for (const playerClass of this.playerClass.playerClassList) {
      if (input === playerClass.id) {
        this.player.player = playerClass;
        console.log(
          `\n ========== ${this.player.player.class} 직업이 선택되었습니다 ========== \n`,
        );
        break;
      }
    }
    if (this.player.player === undefined) {
      throw new Error('===== 목록 중에서 선택해주세요 =====');
    }
    return;
  }
}
