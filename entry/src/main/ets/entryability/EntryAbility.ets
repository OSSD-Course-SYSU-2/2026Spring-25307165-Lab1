<<<<<<< HEAD
// EntryAbility.ets
import { UIAbility, AbilityConstant, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
    // 检查是否从自由流转恢复
    if (launchParam.launchReason === AbilityConstant.LaunchReason.CONTINUATION) {
      const params = want.parameters;
      if (params) {
        this.restoreGameState(params);
      }
    }
    hilog.info(0x0000, 'Gomoku', 'Ability onCreate');
  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    hilog.info(0x0000, 'Gomoku', 'Ability onWindowStageCreate');

    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'Gomoku', 'Failed to load content: ' + JSON.stringify(err));
        return;
      }
      hilog.info(0x0000, 'Gomoku', 'Succeeded in loading content');
    });
  }

  // 源端：保存迁移数据（点击"自由流转"时触发）
  onContinue(wantParam: Record<string, Object>) {
    hilog.info(0x0000, 'Gomoku', 'onContinue called');

    // 从 AppStorage 获取当前游戏状态
    const board = AppStorage.get<number[][]>('gameBoard');
    const currentPlayer = AppStorage.get<number>('gameCurrentPlayer');
    const gameOver = AppStorage.get<boolean>('gameGameOver');
    const winner = AppStorage.get<number>('gameWinner');

    if (board) {
      wantParam["board"] = board;
      wantParam["currentPlayer"] = currentPlayer;
      wantParam["gameOver"] = gameOver;
      wantParam["winner"] = winner;
      hilog.info(0x0000, 'Gomoku', 'Game state saved for continuation');
    }

    return AbilityConstant.OnContinueResult.AGREE;
  }

  // 对端：恢复数据（热启动）
  onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam) {
    if (launchParam.launchReason === AbilityConstant.LaunchReason.CONTINUATION) {
      const params = want.parameters;
      if (params) {
        this.restoreGameState(params);
      }
    }
  }

  // 恢复游戏状态到全局
  private restoreGameState(params: Record<string, Object>) {
    const board = params["board"] as number[][];
    const currentPlayer = params["currentPlayer"] as number;
    const gameOver = params["gameOver"] as boolean;
    const winner = params["winner"] as number;

    if (board) {
      AppStorage.setOrCreate('gameBoard', board);
      AppStorage.setOrCreate('gameCurrentPlayer', currentPlayer);
      AppStorage.setOrCreate('gameGameOver', gameOver);
      AppStorage.setOrCreate('gameWinner', winner);
      AppStorage.setOrCreate('needRestore', true);
      hilog.info(0x0000, 'Gomoku', 'Game state restored');
    }
  }

  onDestroy() {
    hilog.info(0x0000, 'Gomoku', 'Ability onDestroy');
=======
import { AbilityConstant, ConfigurationConstant, UIAbility, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';

const DOMAIN = 0x0000;

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    try {
      this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET);
    } catch (err) {
      hilog.error(DOMAIN, 'testTag', 'Failed to set colorMode. Cause: %{public}s', JSON.stringify(err));
    }
    hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onCreate');
  }

  onDestroy(): void {
    hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    // Main window is created, set main page for this ability
    hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageCreate');

    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) {
        hilog.error(DOMAIN, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
        return;
      }
      hilog.info(DOMAIN, 'testTag', 'Succeeded in loading the content.');
    });
  }

  onWindowStageDestroy(): void {
    // Main window is destroyed, release UI related resources
    hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground(): void {
    // Ability has brought to foreground
    hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onForeground');
  }

  onBackground(): void {
    // Ability has back to background
    hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onBackground');
>>>>>>> 9e6216c3319450af190960906cddf24e7f8c2d40
  }
}