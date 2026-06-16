import { CommonConstants } from "@normalized:N&&&commonmultidevicecommunication/src/main/ets/constants/CommonConstants&1.0.0";
export class MessageBubbleModifier implements AttributeModifier<ColumnAttribute> {
    private type: number = 0;
    constructor(type: number) {
        this.type = type;
    }
    applyNormalAttribute(instance: ColumnAttribute): void {
        instance
            .height('100%')
            .margin({ left: 8 })
            .backgroundColor({ "id": 83886140, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" })
            .border({
            radius: {
                topLeft: 2,
                topRight: 24,
                bottomLeft: 24,
                bottomRight: 24
            }
        });
        if (this.type === CommonConstants.MESSAGE_BUBBLE_STYLE_1) {
            instance
                .width(214);
            return;
        }
        if (this.type === CommonConstants.MESSAGE_BUBBLE_STYLE_2) {
            instance
                .width(248);
            return;
        }
        if (this.type === CommonConstants.MESSAGE_BUBBLE_STYLE_3) {
            instance
                .width(164)
                .backgroundColor({ "id": 83886128, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" })
                .margin({ left: 0, right: 8 })
                .border({
                radius: {
                    topLeft: 24,
                    topRight: 2,
                    bottomLeft: 24,
                    bottomRight: 24
                }
            });
        }
    }
}
