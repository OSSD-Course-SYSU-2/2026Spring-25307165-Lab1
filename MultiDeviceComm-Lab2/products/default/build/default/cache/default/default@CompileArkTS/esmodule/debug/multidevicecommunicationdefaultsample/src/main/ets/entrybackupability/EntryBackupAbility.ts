import BackupExtensionAbility from "@ohos:application.BackupExtensionAbility";
import type { BundleVersion } from "@ohos:application.BackupExtensionAbility";
import { Logger } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
const TAG = 'EntryBackupAbility';
export default class EntryBackupAbility extends BackupExtensionAbility {
    async onBackup() {
        Logger.info(TAG, 'onBackup ok');
        await Promise.resolve();
    }
    async onRestore(bundleVersion: BundleVersion) {
        Logger.info(TAG, 'onRestore ok %{public}s', JSON.stringify(bundleVersion));
        await Promise.resolve();
    }
}
