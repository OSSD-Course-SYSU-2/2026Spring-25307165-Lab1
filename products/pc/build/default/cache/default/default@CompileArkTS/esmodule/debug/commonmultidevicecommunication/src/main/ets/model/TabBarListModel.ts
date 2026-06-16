import { CommonConstants } from "@normalized:N&&&commonmultidevicecommunication/src/main/ets/constants/CommonConstants&1.0.0";
export class TabBarListModel {
    loadTabs(): TabBarModel[] {
        return [
            {
                index: CommonConstants.TAB_MESSAGE_INDEX,
                img: { "id": 125831774, "type": 40000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
                title: { "id": 83886103, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
            },
            {
                index: CommonConstants.TAB_CONTACT_INDEX,
                img: { "id": 125832144, "type": 40000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
                title: { "id": 83886092, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
            },
            {
                index: CommonConstants.TAB_SOCIAL_INDEX,
                img: { "id": 125831757, "type": 40000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
                title: { "id": 83886104, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
            },
            {
                index: CommonConstants.TAB_MINE_INDEX,
                img: { "id": 125831250, "type": 40000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
                title: { "id": 83886102, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
            }
        ];
    }
    ;
}
export interface TabBarModel {
    index: number;
    img: Resource;
    title: Resource;
}
