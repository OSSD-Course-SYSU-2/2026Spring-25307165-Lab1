import type { RowModifier } from "@ohos:arkui.modifier";
import { CommonConstants } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import { WidthBreakpointType } from "@normalized:N&&&commonmultidevicecommunication/src/main/ets/model/WidthBreakpointType&1.0.0";
export class RowSelectModifier implements AttributeModifier<RowModifier> {
    private type: number = 0;
    private widthBreakpoint: WidthBreakpoint = WidthBreakpoint.WIDTH_LG;
    private selectedIndex: string = '';
    private index: string = '';
    constructor(type: number, widthBreakpoint: WidthBreakpoint, selectedIndex: string, index: string) {
        this.type = type;
        this.widthBreakpoint = widthBreakpoint;
        this.selectedIndex = selectedIndex;
        this.index = index;
    }
    applyNormalAttribute(instance: RowModifier): void {
        if (this.widthBreakpoint !== WidthBreakpoint.WIDTH_SM) {
            instance
                .backgroundColor(this.selectedIndex === this.index ? { "id": 83886132, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" } : { "id": 83886129, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
        }
        if (this.type === CommonConstants.TAB_MESSAGE_INDEX) {
            instance
                .margin({
                left: new WidthBreakpointType(8, 12, 16, 12).getValue(this.widthBreakpoint),
                right: new WidthBreakpointType(8, 12, 16, 12).getValue(this.widthBreakpoint)
            });
        }
    }
}
