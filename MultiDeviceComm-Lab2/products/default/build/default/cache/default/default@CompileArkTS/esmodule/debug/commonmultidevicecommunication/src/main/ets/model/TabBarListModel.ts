import { CommonConstants } from "@normalized:N&&&commonmultidevicecommunication/src/main/ets/constants/CommonConstants&1.0.0";
export class TabBarListModel {
    loadTabs(): TabBarModel[] {
        return [
            {
                index: CommonConstants.TAB_MESSAGE_INDEX,
                img: { "id": 125831774, "type": 40000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" },
                title: { "id": 67108887, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }
            },
            {
                index: CommonConstants.TAB_CONTACT_INDEX,
                img: { "id": 125832144, "type": 40000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" },
                title: { "id": 67108876, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }
            },
            {
                index: CommonConstants.TAB_SOCIAL_INDEX,
                img: { "id": 125831757, "type": 40000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" },
                title: { "id": 67108888, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }
            },
            {
                index: CommonConstants.TAB_MINE_INDEX,
                img: { "id": 125831250, "type": 40000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" },
                title: { "id": 67108886, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }
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
