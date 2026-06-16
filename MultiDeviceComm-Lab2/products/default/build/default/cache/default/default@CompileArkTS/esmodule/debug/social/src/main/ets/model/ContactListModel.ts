import { BuildDirtyDataUtil } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import type { ContactModel } from './ContactModel';
export default class ContactListModel {
    public contacts: ContactModel[] = [];
    constructor(contacts: ContactModel[]) {
        this.contacts = contacts;
    }
    loadContacts(): ContactModel[] {
        const dirtyName: string[] = BuildDirtyDataUtil.dirtyName;
        const dirtyIcon: string[] = BuildDirtyDataUtil.dirtyIcon;
        if (dirtyName.length === dirtyIcon.length) {
            for (let i = 0; i < dirtyName.length; i++) {
                this.contacts.push({ name: dirtyName[i], icon: { get id() {
                            return typeof __getResourceId__ === "function" ? __getResourceId__(this) : -1;
                        }, "type": -1, params: [dirtyIcon[i]], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" } });
            }
        }
        return [...this.contacts];
    }
}
