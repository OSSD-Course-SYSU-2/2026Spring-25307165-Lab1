import type { SocialModel } from './SocialModel';
export default class SocialListModel {
    public socials: SocialModel[] = [];
    constructor(socials: SocialModel[]) {
        this.socials = socials;
    }
    loadSocials(): SocialModel[] {
        let social: SocialModel = {
            name: { "id": 83886123, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
            icon: { "id": 83886172, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
            msg: { "id": 83886122, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
            time: { "id": 83886124, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
            common: { "id": 83886120, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
            lastUpdate: [{ "id": 83886182, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }, { "id": 83886183, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }, { "id": 83886184, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }, { "id": 83886179, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }, { "id": 83886180, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }, { "id": 83886181, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }]
        };
        for (let i = 0; i < 10; i++) {
            this.socials.push(social);
        }
        return this.socials;
    }
}
