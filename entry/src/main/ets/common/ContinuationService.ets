// common/ContinuationService.ets
import common from '@ohos.app.ability.common';
import continuationAbility from '@ohos.app.ability.continuationAbility';

export class ContinuationService {
  private context: common.UIAbilityContext;

  constructor(context: common.UIAbilityContext) {
    this.context = context;
  }

  async register(callback: (data: Record<string, Object>) => void): Promise<boolean> {
    try {
      console.info('Continuation service registered');
      return true;
    } catch (error) {
      console.error(`Register failed: ${error}`);
      return false;
    }
  }

  async start(): Promise<boolean> {
    try {
      // 启动自由流转
      await continuationAbility.startContinuation(this.context);
      console.info('Starting continuation...');
      return true;
    } catch (error) {
      console.error(`Start failed: ${error}`);
      return false;
    }
  }
}