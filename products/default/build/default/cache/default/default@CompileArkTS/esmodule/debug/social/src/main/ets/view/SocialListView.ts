if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type uiObserver from "@ohos:arkui.observer";
import { WidthBreakpointType } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import type { SocialModel } from '../model/SocialModel';
import SocialListViewModel from "@normalized:N&&&social/src/main/ets/viewmodel/SocialListViewModel&1.0.0";
export class SocialListView extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.socialsViewModel = new SocialListViewModel();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.socialsViewModel = new SocialListViewModel();
    }
    @Env(SystemProperties.BREAK_POINT)
    readonly breakpoint: uiObserver.WindowSizeLayoutBreakpointInfo;
    @Local
    socialsViewModel: SocialListViewModel;
    aboutToAppear(): void {
        this.socialsViewModel.loadSocials();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 24 });
            List.padding({
                left: new WidthBreakpointType(16, 24, 32, 24).getValue(this.breakpoint.widthBreakpoint),
                right: new WidthBreakpointType(16, 24, 32, 24).getValue(this.breakpoint.widthBreakpoint)
            });
            List.backgroundColor({ "id": 67108913, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            List.scrollBar(BarState.Off);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new SocialView(this, { social: item, breakpoint: this.breakpoint }, undefined, elmtId, () => { }, { page: "features/social/src/main/ets/view/SocialListView.ets", line: 33, col: 11 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            social: item,
                                            breakpoint: this.breakpoint
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        social: item, breakpoint: this.breakpoint
                                    });
                                }
                            }, { name: "SocialView" });
                        }
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.socialsViewModel.socials, forEachItemGenFunction, (item: SocialModel, index: number) => index + JSON.stringify(item), false, true);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class SocialView extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("social", (params && "social" in params) ? params.social : undefined);
        this.initParam("breakpoint", (params && "breakpoint" in params) ? params.breakpoint : undefined);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("social", (params && "social" in params) ? params.social : undefined);
        this.resetParam("breakpoint", (params && "breakpoint" in params) ? params.breakpoint : undefined);
    }
    @Param
    readonly social: SocialModel;
    @Param
    readonly breakpoint: uiObserver.WindowSizeLayoutBreakpointInfo;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Top);
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 67108956, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Image.width(40);
            Image.height(40);
            Image.borderRadius(5);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.layoutWeight(1);
            Column.margin({ left: 8 });
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.social.name);
            Text.fontSize(16);
            Text.lineHeight(21);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 67108930, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.social.msg);
            Text.fontSize(16);
            Text.lineHeight(21);
            Text.fontWeight(FontWeight.Regular);
            Text.fontColor({ "id": 67108929, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.layoutDirection(GridDirection.Row);
            Grid.rowsTemplate('1fr 1fr');
            Grid.columnsTemplate('1fr 1fr 1fr');
            Grid.rowsGap(5);
            Grid.columnsGap(5);
            Grid.width(this.breakpoint.widthBreakpoint === WidthBreakpoint.WIDTH_LG ||
                this.breakpoint.widthBreakpoint === WidthBreakpoint.WIDTH_XL ? '65%' : '100%');
            Grid.aspectRatio(1.5);
            Grid.margin({ top: 8 });
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item);
                            Image.objectFit(ImageFit.Cover);
                        }, Image);
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.social.lastUpdate, forEachItemGenFunction, (item: number, index: number) => JSON.stringify(item) + index, false, true);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ right: 10 });
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.social.time);
            Text.fontSize(14);
            Text.lineHeight(19);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Color.Black);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.width(24);
            Column.height(24);
            Column.borderRadius(4);
            Column.backgroundColor({ "id": 67108914, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create({ "id": 125831713, "type": 40000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, SymbolGlyph);
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ right: 10 });
            Column.margin({ top: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({ left: 8, right: 8 });
            Column.width('100%');
            Column.height(new WidthBreakpointType(88, 69, 69, 69).getValue(this.breakpoint.widthBreakpoint));
            Column.borderRadius(4);
            Column.backgroundColor({ "id": 67108914, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create({ "id": 125831544, "type": 40000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            SymbolGlyph.width(18);
            SymbolGlyph.height(18);
            SymbolGlyph.fontColor([{ "id": 67108929, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }]);
        }, SymbolGlyph);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 67108905, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Text.fontSize(14);
            Text.lineHeight(17);
            Text.fontWeight(FontWeight.Regular);
            Text.fontColor({ "id": 67108930, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height('1px');
            Row.backgroundColor({ "id": 67108927, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Row.margin({ top: 8 });
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 67108904, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Text.fontSize(14);
            Text.lineHeight(17);
            Text.fontWeight(FontWeight.Regular);
            Text.fontColor({ "id": 67108930, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Column.pop();
        Row.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("social" in params) {
            this.updateParam("social", params.social);
        }
        if ("breakpoint" in params) {
            this.updateParam("breakpoint", params.breakpoint);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
