import type { ContactModel } from '../model/ContactModel';
import ContactListModel from "@normalized:N&&&social/src/main/ets/model/ContactListModel&1.0.0";
@ObservedV2
export default class ContactListViewModel {
    @Trace
    public contacts: Record<string, Array<ContactModel>> = {};
    @Trace
    public nameFirstLetter: string[] = [];
    loadContacts() {
        let contactList = new ContactListModel([]);
        let contactSource = contactList.loadContacts();
        let sortedContactList = contactSource.sort((a: ContactModel, b: ContactModel) => a.name.localeCompare(b.name));
        for (let i = 0; i < sortedContactList.length; i++) {
            if (!sortedContactList[i].name || sortedContactList[i].name.length === 0) {
                continue;
            }
            const firstLetter = sortedContactList[i].name.substring(0, 1);
            if (!this.contacts[firstLetter]) {
                this.contacts[firstLetter] = [];
            }
            this.contacts[firstLetter].push(sortedContactList[i]);
        }
        this.nameFirstLetter = Object.keys(this.contacts).sort();
    }
}
