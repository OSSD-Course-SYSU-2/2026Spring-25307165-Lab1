import type { SocialModel } from './SocialModel';
export default class SocialListModel {
    public socials: SocialModel[] = [];
    constructor(socials: SocialModel[]) {
        this.socials = socials;
    }
    loadSocials(): SocialModel[] {
        let social: SocialModel = {
            name: { "id": 67108907, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" },
            icon: { "id": 67108956, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" },
            msg: { "id": 67108906, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" },
            time: { "id": 67108908, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" },
            common: { "id": 67108904, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" },
            lastUpdate: [{ "id": 67108966, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }, { "id": 67108967, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }, { "id": 67108968, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }, { "id": 67108963, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }, { "id": 67108964, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }, { "id": 67108965, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }]
        };
        for (let i = 0; i < 10; i++) {
            this.socials.push(social);
        }
        return this.socials;
    }
}
