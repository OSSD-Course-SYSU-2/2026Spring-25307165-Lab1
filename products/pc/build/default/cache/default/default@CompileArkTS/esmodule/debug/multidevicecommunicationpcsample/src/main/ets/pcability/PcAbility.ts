import UIAbility from "@ohos:app.ability.UIAbility";
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import type window from "@ohos:window";
import deviceInfo from "@ohos:deviceInfo";
import { CommonConstants, DeviceInfo, Logger, WindowUtil } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
const TAG = 'PcAbility';
export default class PcAbility extends UIAbility {
    private info: DeviceInfo | undefined = AppStorageV2.connect<DeviceInfo>(DeviceInfo, () => new DeviceInfo());
    onCreate(): void {
        Logger.info(TAG, '%{public}s', 'Ability onCreate');
    }
    onDestroy(): void {
        Logger.info(TAG, '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        // Main window is created, set main page for this ability
        Logger.info(TAG, '%{public}s', 'Ability onWindowStageCreate');
        windowStage.loadContent('pages/Index', (err) => {
            if (err.code) {
                Logger.error(TAG, 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
                return;
            }
            Logger.info(TAG, 'Succeeded in loading the content.');
            if (this.info) {
                this.info.distributionOSApiVersion = deviceInfo.distributionOSApiVersion;
            }
            try {
                WindowUtil.getInstance().setMainWindow(windowStage.getMainWindowSync());
                WindowUtil.getInstance()
                    .setPCImmersive(CommonConstants.PC_DECOR_HEIGHT, CommonConstants.PC_STATUS_BAR_ICON_SIZE);
            }
            catch (error) {
                Logger.error(TAG, 'Get window failed. %{public}s', JSON.stringify(error));
            }
        });
    }
    onWindowStageDestroy(): void {
        WindowUtil.getInstance().release();
        // Main window is destroyed, release UI related resources
        Logger.info(TAG, '%{public}s', 'Ability onWindowStageDestroy');
    }
    onForeground(): void {
        // Ability has brought to foreground
        Logger.info(TAG, '%{public}s', 'Ability onForeground');
    }
    onBackground(): void {
        // Ability has back to background
        Logger.info(TAG, '%{public}s', 'Ability onBackground');
    }
}
