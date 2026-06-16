import type { HdsNavigationAttribute } from "@hms:hds.hdsBaseComponent";
export class HdsNavigationModifier implements AttributeModifier<HdsNavigationAttribute> {
    private widthBreakpoint: WidthBreakpoint = WidthBreakpoint.WIDTH_LG;
    private navigationMode: NavigationMode = NavigationMode.Auto;
    constructor(widthBreakpoint: WidthBreakpoint, navigationMode: NavigationMode) {
        this.widthBreakpoint = widthBreakpoint;
        this.navigationMode = navigationMode;
    }
    applyNormalAttribute(instance: HdsNavigationAttribute): void {
        instance
            .navBarWidth(this.widthBreakpoint === WidthBreakpoint.WIDTH_LG ? '36%' : '50%')
            .mode(this.navigationMode)
            .hideTitleBar(true)
            .hideToolBar(true)
            .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
    }
}
