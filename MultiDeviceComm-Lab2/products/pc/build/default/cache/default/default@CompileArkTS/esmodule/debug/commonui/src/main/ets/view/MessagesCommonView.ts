if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type uiObserver from "@ohos:arkui.observer";
import type window from "@ohos:window";
import { DividerShowType } from "@hms:hds.hdsBaseComponent";
import { hdsMaterial } from "@hms:hds.hdsMaterial";
import { HdsNavDestination } from "@hms:hds.hdsBaseComponent";
import type { HdsNavigationTitleBarOptions } from "@hms:hds.hdsBaseComponent";
import { ScrollEffectType } from "@hms:hds.hdsBaseComponent";
import type { HdsNavDestinationAttribute } from "@hms:hds.hdsBaseComponent";
import deviceInfo from "@ohos:deviceInfo";
import type common from "@ohos:app.ability.common";
import { CommonConstants, GlassCircle, NavigationStackUtil, PageTitleModifier, WindowUtil } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import { MessageListView } from "@normalized:N&&&message/Index&1.0.0";
import type { MessageModel } from 'message/src/main/ets/model/MessageModel';
import MessageListViewModel from "@normalized:N&&&message/src/main/ets/viewmodel/MessageListViewModel&1.0.0";
export class MessagesCommonView extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.pathStack = new NavPathStack();
        this.initParam("activeIndex", (params && "activeIndex" in params) ? params.activeIndex : undefined);
        this.selectedIndex = [0];
        this.hdsTitleBar = {};
        this.moduleName = '';
        this.scroller = new Scroller();
        this.messageListViewModel = new MessageListViewModel();
        this.firstMessage = {
            name: { "id": 83886103, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
            msg: { "id": 83886103, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
            time: '',
            icon: { "id": 83886171, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
        };
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.onWindowSizeChange = (_: window.Size) => {
            let width: WidthBreakpoint = this.getUIContext().getWindowWidthBreakpoint();
            if (width === WidthBreakpoint.WIDTH_MD || width === WidthBreakpoint.WIDTH_LG) {
                if (this.activeIndex !== CommonConstants.TAB_MESSAGE_INDEX) {
                    return;
                }
                NavigationStackUtil.StackModeToSplitMode(this.pathStack, { name: 'MessageDetailView', param: this.firstMessage });
            }
        };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetConsumer("pathStack", new NavPathStack());
        this.resetParam("activeIndex", (params && "activeIndex" in params) ? params.activeIndex : undefined);
        this.selectedIndex = [0];
        this.resetMonitorsOnReuse();
    }
    @Env(SystemProperties.BREAK_POINT)
    readonly breakpoint: uiObserver.WindowSizeLayoutBreakpointInfo;
    @Consumer()
    pathStack: NavPathStack;
    @Param
    readonly activeIndex: number;
    @Provider()
    selectedIndex: number[];
    private hdsTitleBar: HdsNavigationTitleBarOptions;
    private moduleName: string;
    private scroller: Scroller;
    private messageListViewModel: MessageListViewModel;
    private firstMessage: MessageModel;
    private context: common.UIAbilityContext;
    private onWindowSizeChange: (windowSize: window.Size) => void;
    @Monitor('activeIndex')
    onActiveIndex(mon: IMonitor) {
        const value: IMonitorValue<number> | undefined = mon.value();
        if (!value) {
            return;
        }
        if (value.now as number === CommonConstants.TAB_MESSAGE_INDEX) {
            this.selectedIndex = [];
            this.selectedIndex.push(0);
            if (this.moduleName === CommonConstants.DEVICE_TYPE_PC) {
                NavigationStackUtil.SplitModeDefaultStack(this.pathStack, this.breakpoint.widthBreakpoint, { name: 'MessageDetailView', param: this.firstMessage });
                return;
            }
            NavigationStackUtil.SplitModeDefaultStack(this.pathStack, this.breakpoint.widthBreakpoint, { name: 'MessageDetailView', param: this.firstMessage });
        }
    }
    aboutToAppear(): void {
        this.messageListViewModel.loadMessages();
        let messages = this.messageListViewModel.messages;
        if (messages.length > 0) {
            this.firstMessage = messages[0];
        }
        if (deviceInfo.distributionOSApiVersion >= 60100) {
            this.hdsTitleBar = {
                style: {
                    scrollEffectOpts: {
                        scrollEffectType: ScrollEffectType.GRADIENT_BLUR,
                    },
                    systemMaterialEffect: {
                        materialType: hdsMaterial.MaterialType.IMMERSIVE,
                        materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
                    }
                },
                content: {
                    title: {
                        mainTitle: { "id": 83886103, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
                    },
                    divider: { showType: DividerShowType.OFF },
                    menu: {
                        value: [
                            {
                                content: {
                                    icon: { "id": 83886167, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
                                }
                            },
                            {
                                content: {
                                    icon: { "id": 83886161, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
                                }
                            }
                        ]
                    }
                }
            };
        }
        this.moduleName = this.context.abilityInfo.moduleName;
        if (this.moduleName === CommonConstants.DEVICE_TYPE_PC) {
            NavigationStackUtil.SplitModeDefaultStack(this.pathStack, this.breakpoint.widthBreakpoint, { name: 'MessageDetailView', param: this.firstMessage });
            return;
        }
        WindowUtil.getInstance().setWindowSizeChangeListener(this.onWindowSizeChange);
    }
    aboutToDisappear(): void {
        WindowUtil.getInstance().offWindowSizeChangeListener();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (deviceInfo.distributionOSApiVersion >= CommonConstants.API_VERSION_23 &&
                this.moduleName !== CommonConstants.DEVICE_TYPE_PC) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        HdsNavDestination.create(() => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Scroll.create(this.scroller);
                                Scroll.edgeEffect(EdgeEffect.Spring);
                                Scroll.scrollBar(BarState.Off);
                                Scroll.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
                            }, Scroll);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Blank.create();
                                Blank.height(56);
                            }, Blank);
                            Blank.pop();
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new MessageListView(this, { messagesViewModel: this.messageListViewModel }, undefined, elmtId, () => { }, { page: "features/commonui/src/main/ets/view/MessagesCommonView.ets", line: 142, col: 13 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                messagesViewModel: this.messageListViewModel
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            messagesViewModel: this.messageListViewModel
                                        });
                                    }
                                }, { name: "MessageListView" });
                            }
                            Column.pop();
                            Scroll.pop();
                        }, { moduleName: "multidevicecommunicationpcsample", pagePath: "features/commonui/src/main/ets/view/MessagesCommonView" });
                        HdsNavDestination.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
                        HdsNavDestination.titleBar(this.hdsTitleBar);
                        HdsNavDestination.hideBackButton(true);
                        HdsNavDestination.onReady(() => {
                            NavigationStackUtil.SplitModeDefaultStack(this.pathStack, this.breakpoint.widthBreakpoint, { name: 'MessageDetailView', param: this.firstMessage });
                        });
                    }, HdsNavDestination);
                    HdsNavDestination.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        NavDestination.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new MessageListView(this, { messagesViewModel: this.messageListViewModel }, undefined, elmtId, () => { }, { page: "features/commonui/src/main/ets/view/MessagesCommonView.ets", line: 158, col: 9 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                messagesViewModel: this.messageListViewModel
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            messagesViewModel: this.messageListViewModel
                                        });
                                    }
                                }, { name: "MessageListView" });
                            }
                        }, { moduleName: "multidevicecommunicationpcsample", pagePath: "features/commonui/src/main/ets/view/MessagesCommonView" });
                        NavDestination.title({ builder: () => {
                                this.TitleBuilder.call(this);
                            } });
                        NavDestination.backgroundColor({ "id": 83886129, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                        NavDestination.onReady(() => {
                            NavigationStackUtil.SplitModeDefaultStack(this.pathStack, this.breakpoint.widthBreakpoint, { name: 'MessageDetailView', param: this.firstMessage });
                        });
                    }, NavDestination);
                    NavDestination.pop();
                });
            }
        }, If);
        If.pop();
    }
    TitleBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 83886103, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Text.attributeModifier.bind(this)(new PageTitleModifier(CommonConstants.PAGE_TITLE_TYPE_0));
            Text.margin({ left: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.moduleName === CommonConstants.DEVICE_TYPE_PC) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 83886167, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                        Image.width(24);
                        Image.height(24);
                        Image.objectFit(ImageFit.Contain);
                        Image.margin({ right: 8 });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 83886161, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                        Image.width(24);
                        Image.height(24);
                        Image.objectFit(ImageFit.Contain);
                        Image.margin({ right: 16 });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ right: 8 });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new GlassCircle(this, { imageSrc: { "id": 83886167, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" } }, undefined, elmtId, () => { }, { page: "features/commonui/src/main/ets/view/MessagesCommonView.ets", line: 188, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        imageSrc: { "id": 83886167, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    imageSrc: { "id": 83886167, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
                                });
                            }
                        }, { name: "GlassCircle" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ right: 16 });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new GlassCircle(this, { imageSrc: { "id": 83886161, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" } }, undefined, elmtId, () => { }, { page: "features/commonui/src/main/ets/view/MessagesCommonView.ets", line: 190, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        imageSrc: { "id": 83886161, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    imageSrc: { "id": 83886161, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
                                });
                            }
                        }, { name: "GlassCircle" });
                    }
                    __Common__.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("activeIndex" in params) {
            this.updateParam("activeIndex", params.activeIndex);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export function MessagesPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new MessagesCommonView(parent ? parent : this, { activeIndex: CommonConstants.TAB_MESSAGE_INDEX }, undefined, elmtId, () => { }, { page: "features/commonui/src/main/ets/view/MessagesCommonView.ets", line: 202, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {
                        activeIndex: CommonConstants.TAB_MESSAGE_INDEX
                    };
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {
                    activeIndex: CommonConstants.TAB_MESSAGE_INDEX
                });
            }
        }, { name: "MessagesCommonView" });
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("MessagesPage", wrapBuilder(MessagesPageBuilder));
    }
})();
