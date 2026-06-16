import { CommonConstants } from "@normalized:N&&&commonmultidevicecommunication/src/main/ets/constants/CommonConstants&1.0.0";
export class PageTitleModifier implements AttributeModifier<TextAttribute> {
    public type: number = 0;
    constructor(type: number) {
        this.type = type;
    }
    applyNormalAttribute(instance: TextAttribute): void {
        instance
            .fontWeight(FontWeight.Bold)
            .fontSize(this.type === CommonConstants.PAGE_TITLE_TYPE_0 ? 26 : 20)
            .lineHeight(this.type === 0 ? 35 : 27)
            .fontColor({ "id": 83886147, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" })
            .opacity(0.9);
    }
}
