if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type uiObserver from "@ohos:arkui.observer";
import type common from "@ohos:app.ability.common";
import { CommonConstants, RowSelectModifier, WidthBreakpointType } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import type { MessageModel } from '../model/MessageModel';
import MessageListViewModel from "@normalized:N&&&message/src/main/ets/viewmodel/MessageListViewModel&1.0.0";
export class MessageListView extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.pathStack = new NavPathStack();
        this.initParam("messagesViewModel", (params && "messagesViewModel" in params) ? params.messagesViewModel : new MessageListViewModel());
        this.moduleName = '';
        this.selectedIndex = [0];
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetConsumer("pathStack", new NavPathStack());
        this.resetParam("messagesViewModel", (params && "messagesViewModel" in params) ? params.messagesViewModel : new MessageListViewModel());
        this.moduleName = '';
        this.resetConsumer("selectedIndex", [0]);
    }
    @Env(SystemProperties.BREAK_POINT)
    readonly breakpoint: uiObserver.WindowSizeLayoutBreakpointInfo;
    @Consumer()
    pathStack: NavPathStack;
    @Param
    readonly messagesViewModel: MessageListViewModel;
    @Local
    moduleName: string;
    @Consumer()
    selectedIndex: number[];
    private context: common.UIAbilityContext;
    aboutToAppear(): void {
        this.moduleName = this.context.abilityInfo.moduleName;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.backgroundColor({ "id": 83886129, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            List.scrollBar(BarState.Off);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
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
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            __Common__.create();
                            __Common__.onClick(() => {
                                this.selectedIndex.push(index);
                                const targetParam = this.pathStack.getParamByName('MessageDetailView') as MessageModel[];
                                if (targetParam[targetParam.length - 1] === item) {
                                    return;
                                }
                                this.pathStack.pushPath({
                                    name: 'MessageDetailView', param: item, onPop: () => {
                                        this.selectedIndex.pop();
                                    }
                                });
                            });
                        }, __Common__);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new MessageView(this, {
                                        message: item,
                                        index: index,
                                        breakpoint: this.breakpoint,
                                        moduleName: this.moduleName,
                                    }, undefined, elmtId, () => { }, { page: "features/message/src/main/ets/view/MessageListView.ets", line: 38, col: 11 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            message: item,
                                            index: index,
                                            breakpoint: this.breakpoint,
                                            moduleName: this.moduleName
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        message: item,
                                        index: index,
                                        breakpoint: this.breakpoint,
                                        moduleName: this.moduleName
                                    });
                                }
                            }, { name: "MessageView" });
                        }
                        __Common__.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.messagesViewModel.messages, forEachItemGenFunction, (item: MessageModel, index: number) => index + JSON.stringify(item), true, true);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("messagesViewModel" in params) {
            this.updateParam("messagesViewModel", params.messagesViewModel);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class MessageView extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("message", (params && "message" in params) ? params.message : undefined);
        this.initParam("index", (params && "index" in params) ? params.index : undefined);
        this.selectedIndex = [0];
        this.initParam("breakpoint", (params && "breakpoint" in params) ? params.breakpoint : undefined);
        this.initParam("moduleName", (params && "moduleName" in params) ? params.moduleName : undefined);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("message", (params && "message" in params) ? params.message : undefined);
        this.resetParam("index", (params && "index" in params) ? params.index : undefined);
        this.resetConsumer("selectedIndex", [0]);
        this.resetParam("breakpoint", (params && "breakpoint" in params) ? params.breakpoint : undefined);
        this.resetParam("moduleName", (params && "moduleName" in params) ? params.moduleName : undefined);
    }
    @Param
    readonly message: MessageModel;
    @Param
    readonly index: number;
    @Consumer()
    selectedIndex: number[];
    @Param
    readonly breakpoint: uiObserver.WindowSizeLayoutBreakpointInfo;
    @Param
    readonly moduleName: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(72);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            ViewStackProcessor.visualState("pressed");
            Row.backgroundColor({ "id": 83886132, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Row.borderRadius(16);
            ViewStackProcessor.visualState("normal");
            Row.backgroundColor({ "id": 83886129, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Row.borderRadius(0);
            ViewStackProcessor.visualState();
            Row.attributeModifier.bind(this)(new RowSelectModifier(CommonConstants.TAB_MESSAGE_INDEX, this.breakpoint.widthBreakpoint, this.selectedIndex[this.selectedIndex.length - 1].toString(), this.index.toString()));
            Row.borderRadius(this.moduleName === CommonConstants.DEVICE_TYPE_PC ? 8 : 16);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.message.icon);
            Image.height(40);
            Image.width(40);
            Image.margin({ left: new WidthBreakpointType(8, 12, 16, 12).getValue(this.breakpoint.widthBreakpoint) });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({ left: 16, right: new WidthBreakpointType(8, 12, 16, 12).getValue(this.breakpoint.widthBreakpoint) });
            Column.height('100%');
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(22);
            Row.margin({ top: 14 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.message.name);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.lineHeight(21);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(33);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.message.time);
            Text.fontSize(12);
            Text.fontWeight(FontWeight.Regular);
            Text.lineHeight(21);
            Text.fontColor(Color.Grey);
        }, Text);
        Text.pop();
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.message.msg);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Regular);
            Text.lineHeight(19);
            Text.fontColor(Color.Grey);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.margin({ top: 2 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height('1px');
            Row.backgroundColor({ "id": 83886133, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Row.margin({ top: 14 });
        }, Row);
        Row.pop();
        Column.pop();
        Row.pop();
        Row.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("message" in params) {
            this.updateParam("message", params.message);
        }
        if ("index" in params) {
            this.updateParam("index", params.index);
        }
        if ("breakpoint" in params) {
            this.updateParam("breakpoint", params.breakpoint);
        }
        if ("moduleName" in params) {
            this.updateParam("moduleName", params.moduleName);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
