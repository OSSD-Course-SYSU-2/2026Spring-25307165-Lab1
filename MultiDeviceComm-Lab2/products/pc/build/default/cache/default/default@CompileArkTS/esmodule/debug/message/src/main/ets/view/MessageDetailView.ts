if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { DividerShowType } from "@hms:hds.hdsBaseComponent";
import { hdsMaterial } from "@hms:hds.hdsMaterial";
import { HdsNavDestination } from "@hms:hds.hdsBaseComponent";
import type { HdsNavigationTitleBarOptions } from "@hms:hds.hdsBaseComponent";
import { ScrollEffectType } from "@hms:hds.hdsBaseComponent";
import type { HdsNavDestinationAttribute } from "@hms:hds.hdsBaseComponent";
import type common from "@ohos:app.ability.common";
import commonEventManager from "@ohos:commonEventManager";
import deviceInfo from "@ohos:deviceInfo";
import i18n from "@ohos:i18n";
import type uiObserver from "@ohos:arkui.observer";
import { CommonConstants, GlassCircle, Logger, MessageBubbleModifier, PageTitleModifier, WidthBreakpointType } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import type { MessageModel } from '../model/MessageModel';
const TAG = 'MessageDetailView';
export class MessageDetailView extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.pathStack = new NavPathStack();
        this.messageModel = {
            name: { "id": 83886103, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
            msg: { "id": 83886103, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
            time: '',
            icon: { "id": 83886171, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
        };
        this.moduleName = '';
        this.systemLanguage = i18n.System.getSystemLanguage();
        this.hdsTitleBar = {};
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.subscriber = undefined;
        this.subscribeInfo = {
            events: ['usual.event.LOCALE_CHANGED']
        };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetConsumer("pathStack", new NavPathStack());
        this.messageModel = {
            name: { "id": 83886103, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
            msg: { "id": 83886103, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" },
            time: '',
            icon: { "id": 83886171, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
        };
        this.moduleName = '';
        this.systemLanguage = i18n.System.getSystemLanguage();
        this.hdsTitleBar = {};
    }
    @Env(SystemProperties.BREAK_POINT)
    readonly breakpoint: uiObserver.WindowSizeLayoutBreakpointInfo;
    @Consumer()
    pathStack: NavPathStack;
    @Local
    messageModel: MessageModel;
    @Local
    moduleName: string;
    @Local
    systemLanguage: string;
    @Local
    hdsTitleBar: HdsNavigationTitleBarOptions;
    private context: common.UIAbilityContext;
    private subscriber: commonEventManager.CommonEventSubscriber | undefined;
    private subscribeInfo: commonEventManager.CommonEventSubscribeInfo;
    aboutToAppear(): void {
        this.moduleName = this.context.abilityInfo.moduleName;
        this.systemLanguage = i18n.System.getSystemLanguage();
        commonEventManager.createSubscriber(this.subscribeInfo)
            .then((commonEventSubscriber: commonEventManager.CommonEventSubscriber) => {
            this.subscriber = commonEventSubscriber;
            commonEventManager.subscribe(this.subscriber, (err: BusinessError) => {
                if (err) {
                    Logger.error('MessageDetailView', `Subscribe failed`);
                    return;
                }
                this.systemLanguage = i18n.System.getSystemLanguage();
            });
        });
    }
    aboutToDisappear(): void {
        commonEventManager.unsubscribe(this.subscriber, (err: BusinessError) => {
            if (err) {
                Logger.error(TAG, `Unsubscribe failed`);
            }
        });
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
                                Column.create();
                                Column.width('100%');
                                Column.height('100%');
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Scroll.create();
                                Scroll.align(Alignment.Top);
                                Scroll.edgeEffect(EdgeEffect.Spring);
                                Scroll.scrollBar(BarState.Off);
                                Scroll.layoutWeight(1);
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
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                                Column.padding({
                                    left: new WidthBreakpointType(16, 16, 32, 24).getValue(this.breakpoint.widthBreakpoint),
                                    right: new WidthBreakpointType(16, 16, 32, 24).getValue(this.breakpoint.widthBreakpoint)
                                });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.alignItems(VerticalAlign.Top);
                                Row.margin({ top: 24 });
                                Row.width('100%');
                                Row.height(231);
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create(this.messageModel.icon);
                                Image.width(40);
                                Image.height(40);
                                Image.onClick(() => {
                                    this.jumpUserView(this.messageModel.name);
                                });
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.attributeModifier.bind(this)(new MessageBubbleModifier(CommonConstants.MESSAGE_BUBBLE_STYLE_1));
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.margin({ top: 12 });
                                Row.width('100%');
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create(this.systemLanguage === 'zh-Hans' ? { "id": 83886169, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" } : { "id": 83886170, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                                Image.width(16);
                                Image.height(16);
                                Image.margin({ left: 12 });
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create({ "id": 83886126, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                                Text.fontSize(12);
                                Text.lineHeight(16);
                                Text.fontWeight(FontWeight.Regular);
                                Text.fontColor({ "id": 83886136, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                                Text.margin({ left: 6 });
                            }, Text);
                            Text.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create();
                                Text.fontSize(14);
                                Text.lineHeight(19);
                                Text.fontWeight(FontWeight.Regular);
                                Text.fontColor({ "id": 83886136, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                                Text.margin({ left: 12, top: 4 });
                            }, Text);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create(this.messageModel.name);
                            }, Span);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create({ "id": 83886111, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                            }, Span);
                            Text.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 83886174, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                                Image.width(186);
                                Image.height(138);
                                Image.margin({ top: 8 });
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create({ "id": 83886115, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                                Text.fontSize(10);
                                Text.lineHeight(12);
                                Text.fontWeight(FontWeight.Regular);
                                Text.fontColor({ "id": 83886141, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                                Text.margin({ left: 12, top: 8 });
                            }, Text);
                            Text.pop();
                            Row.pop();
                            Column.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.height(58);
                                Row.width('100%');
                                Row.margin({ top: 24 });
                                Row.alignItems(VerticalAlign.Top);
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create(this.messageModel.icon);
                                Image.width(40);
                                Image.height(40);
                                Image.onClick(() => {
                                    this.jumpUserView(this.messageModel.name);
                                });
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.justifyContent(FlexAlign.Center);
                                Column.attributeModifier.bind(this)(new MessageBubbleModifier(CommonConstants.MESSAGE_BUBBLE_STYLE_2));
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width(224);
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create({ "id": 83886105, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                                Text.fontSize(14);
                                Text.lineHeight(19);
                                Text.fontWeight(FontWeight.Regular);
                                Text.fontColor({ "id": 83886136, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                                Text.maxLines(2);
                                Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                Text.width('100%');
                            }, Text);
                            Text.pop();
                            Row.pop();
                            Column.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.messageModel.time);
                                Text.fontSize(10);
                                Text.lineHeight(14);
                                Text.fontWeight(FontWeight.Regular);
                                Text.fontColor({ "id": 83886136, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                                Text.margin({ top: 12 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.reverse(true);
                                Row.height(40);
                                Row.width('100%');
                                Row.margin({ top: 12 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 83886158, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                                Image.width(40);
                                Image.height(40);
                                Image.onClick(() => {
                                    this.jumpUserView({ "id": 83886110, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                                });
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.justifyContent(FlexAlign.Center);
                                Column.attributeModifier.bind(this)(new MessageBubbleModifier(CommonConstants.MESSAGE_BUBBLE_STYLE_3));
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create({ "id": 83886114, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                                Text.fontSize(14);
                                Text.lineHeight(19);
                                Text.fontWeight(FontWeight.Regular);
                                Text.fontColor({ "id": 83886135, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                            }, Text);
                            Text.pop();
                            Column.pop();
                            Row.pop();
                            Column.pop();
                            Column.pop();
                            Scroll.pop();
                            this.TextInputBuilder.bind(this)();
                            Column.pop();
                        }, { moduleName: "multidevicecommunicationpcsample", pagePath: "features/message/src/main/ets/view/MessageDetailView" });
                        HdsNavDestination.titleBar(this.hdsTitleBar);
                        HdsNavDestination.backgroundColor({ "id": 83886130, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                        HdsNavDestination.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
                        HdsNavDestination.onReady((context: NavDestinationContext) => {
                            this.messageModel = context.pathInfo.param as MessageModel;
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
                                            mainTitle: this.messageModel.name
                                        },
                                        divider: { showType: DividerShowType.OFF },
                                        menu: {
                                            value: [
                                                {
                                                    content: {
                                                        icon: { "id": 83886165, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                };
                            }
                        });
                        HdsNavDestination.onBackPressed(() => {
                            return this.onBack();
                        });
                    }, HdsNavDestination);
                    HdsNavDestination.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        NavDestination.create(() => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                                Column.height('100%');
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Scroll.create();
                                Scroll.align(Alignment.Top);
                                Scroll.edgeEffect(EdgeEffect.Spring);
                                Scroll.scrollBar(BarState.Off);
                                Scroll.layoutWeight(1);
                            }, Scroll);
                            this.MessageBuilder.bind(this)(this.messageModel);
                            Scroll.pop();
                            this.TextInputBuilder.bind(this)();
                            Column.pop();
                        }, { moduleName: "multidevicecommunicationpcsample", pagePath: "features/message/src/main/ets/view/MessageDetailView" });
                        NavDestination.title({ builder: () => {
                                this.TitleBuilder.call(this);
                            } });
                        NavDestination.hideBackButton(true);
                        NavDestination.menus({ builder: () => {
                                this.MenuBuilder.call(this);
                            } });
                        NavDestination.backgroundColor({ "id": 83886130, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                        NavDestination.onReady((context: NavDestinationContext) => {
                            this.messageModel = context.pathInfo.param as MessageModel;
                        });
                        NavDestination.onBackPressed(() => {
                            return this.onBack();
                        });
                    }, NavDestination);
                    NavDestination.pop();
                });
            }
        }, If);
        If.pop();
    }
    onBack(): boolean {
        if (this.pathStack.size() > 1) {
            this.pathStack.pop('back');
            return true;
        }
        return false;
    }
    TitleBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(56);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.moduleName === CommonConstants.DEVICE_TYPE_PC) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        SymbolGlyph.create({ "id": 125832679, "type": 40000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                        SymbolGlyph.fontSize(24);
                        SymbolGlyph.margin({ left: new WidthBreakpointType(16, 16, 32, 24).getValue(this.breakpoint.widthBreakpoint) });
                        SymbolGlyph.onClick(() => {
                            this.handleBack();
                        });
                    }, SymbolGlyph);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ left: new WidthBreakpointType(16, 16, 32, 24).getValue(this.breakpoint.widthBreakpoint) });
                        __Common__.onClick(() => {
                            this.handleBack();
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new GlassCircle(this, {
                                    imageSrc: { "id": 83886162, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
                                }, undefined, elmtId, () => { }, { page: "features/message/src/main/ets/view/MessageDetailView.ets", line: 309, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        imageSrc: { "id": 83886162, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    imageSrc: { "id": 83886162, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
                                });
                            }
                        }, { name: "GlassCircle" });
                    }
                    __Common__.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.messageModel.name);
            Text.attributeModifier.bind(this)(new PageTitleModifier(CommonConstants.PAGE_TITLE_TYPE_1));
            Text.margin({ left: 16 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    handleBack() {
        let pathStackSize = this.pathStack.size();
        if (this.breakpoint.widthBreakpoint === WidthBreakpoint.WIDTH_XS ||
            this.breakpoint.widthBreakpoint === WidthBreakpoint.WIDTH_SM && pathStackSize > 0) {
            this.pathStack.pop();
            return;
        }
        if (pathStackSize > 1) {
            this.pathStack.pop();
        }
    }
    MenuBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.moduleName === CommonConstants.DEVICE_TYPE_PC) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 83886165, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
                        Image.width(24);
                        Image.height(24);
                        Image.objectFit(ImageFit.Contain);
                        Image.margin({ right: 140, top: 16 });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ right: 16, top: 8 });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new GlassCircle(this, { imageSrc: { "id": 83886165, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" } }, undefined, elmtId, () => { }, { page: "features/message/src/main/ets/view/MessageDetailView.ets", line: 346, col: 7 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        imageSrc: { "id": 83886165, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    imageSrc: { "id": 83886165, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }
                                });
                            }
                        }, { name: "GlassCircle" });
                    }
                    __Common__.pop();
                });
            }
        }, If);
        If.pop();
    }
    MessageBuilder(messageModel: MessageModel, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({
                left: new WidthBreakpointType(16, 16, 32, 24).getValue(this.breakpoint.widthBreakpoint),
                right: new WidthBreakpointType(16, 16, 32, 24).getValue(this.breakpoint.widthBreakpoint)
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Top);
            Row.margin({ top: 24 });
            Row.width('100%');
            Row.height(231);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(messageModel.icon);
            Image.width(40);
            Image.height(40);
            Image.onClick(() => {
                this.jumpUserView(messageModel.name);
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.attributeModifier.bind(this)(new MessageBubbleModifier(CommonConstants.MESSAGE_BUBBLE_STYLE_1));
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 12 });
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.systemLanguage === 'zh-Hans' ? { "id": 83886169, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" } : { "id": 83886170, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Image.width(16);
            Image.height(16);
            Image.margin({ left: 12 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 83886126, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Text.fontSize(12);
            Text.lineHeight(16);
            Text.fontWeight(FontWeight.Regular);
            Text.fontColor({ "id": 83886136, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Text.margin({ left: 6 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.fontSize(14);
            Text.lineHeight(19);
            Text.fontWeight(FontWeight.Regular);
            Text.fontColor({ "id": 83886136, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Text.margin({ left: 12, top: 4 });
        }, Text);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create(messageModel.name);
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create({ "id": 83886111, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
        }, Span);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 83886174, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Image.width(186);
            Image.height(138);
            Image.margin({ top: 8 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 83886115, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Text.fontSize(10);
            Text.lineHeight(12);
            Text.fontWeight(FontWeight.Regular);
            Text.fontColor({ "id": 83886141, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Text.margin({ left: 12, top: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(58);
            Row.width('100%');
            Row.margin({ top: 24 });
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(messageModel.icon);
            Image.width(40);
            Image.height(40);
            Image.onClick(() => {
                this.jumpUserView(messageModel.name);
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.attributeModifier.bind(this)(new MessageBubbleModifier(CommonConstants.MESSAGE_BUBBLE_STYLE_2));
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(224);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 83886105, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Text.fontSize(14);
            Text.lineHeight(19);
            Text.fontWeight(FontWeight.Regular);
            Text.fontColor({ "id": 83886136, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.width('100%');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(messageModel.time);
            Text.fontSize(10);
            Text.lineHeight(14);
            Text.fontWeight(FontWeight.Regular);
            Text.fontColor({ "id": 83886136, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.reverse(true);
            Row.height(40);
            Row.width('100%');
            Row.margin({ top: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 83886158, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Image.width(40);
            Image.height(40);
            Image.onClick(() => {
                this.jumpUserView({ "id": 83886110, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.attributeModifier.bind(this)(new MessageBubbleModifier(CommonConstants.MESSAGE_BUBBLE_STYLE_3));
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 83886114, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Text.fontSize(14);
            Text.lineHeight(19);
            Text.fontWeight(FontWeight.Regular);
            Text.fontColor({ "id": 83886135, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    TextInputBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 83886164, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Image.width(24);
            Image.height(24);
            Image.fillColor({ "id": 83886139, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.borderRadius(this.moduleName === CommonConstants.DEVICE_TYPE_PC ? 8 : 18);
            Row.backgroundColor({ "id": 83886140, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Row.height(34);
            Row.layoutWeight(1);
            Row.margin({ left: 16, right: 16 });
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 83886161, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Image.width(24);
            Image.height(24);
            Image.fillColor({ "id": 83886139, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
        }, Image);
        Row.pop();
    }
    jumpUserView(name: Resource) {
        this.pathStack.pushPath({ name: 'UserView', param: name });
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export function MessageDetailBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new MessageDetailView(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "features/message/src/main/ets/view/MessageDetailView.ets", line: 507, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "MessageDetailView" });
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("MessageDetailView", wrapBuilder(MessageDetailBuilder));
    }
})();
