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
import deviceInfo from "@ohos:deviceInfo";
import { CommonConstants, PageTitleModifier } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import { SocialListView } from "@normalized:N&&&social/Index&1.0.0";
export class SocialCommonView extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("activeIndex", (params && "activeIndex" in params) ? params.activeIndex : undefined);
        this.pathStack = new NavPathStack();
        this.moduleName = '';
        this.hdsTitleBar = {};
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("activeIndex", (params && "activeIndex" in params) ? params.activeIndex : undefined);
        this.resetConsumer("pathStack", new NavPathStack());
        this.moduleName = '';
        this.resetMonitorsOnReuse();
    }
    @Param
    readonly activeIndex: number;
    @Consumer()
    pathStack: NavPathStack;
    @Local
    moduleName: string;
    private hdsTitleBar: HdsNavigationTitleBarOptions;
    private context: common.UIAbilityContext;
    @Monitor('activeIndex')
    onActiveIndex(mon: IMonitor) {
        const value: IMonitorValue<number> | undefined = mon.value();
        if (!value) {
            return;
        }
        if (value.now === CommonConstants.TAB_SOCIAL_INDEX) {
            if (this.pathStack.size() > 0) {
                this.pathStack.clear();
            }
        }
    }
    aboutToAppear(): void {
        this.moduleName = this.context.abilityInfo.moduleName;
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
                        mainTitle: { "id": 67108888, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }
                    },
                    divider: { showType: DividerShowType.OFF }
                }
            };
        }
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
                                Scroll.create();
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
                                        let componentCall = new SocialListView(this, {}, undefined, elmtId, () => { }, { page: "features/commonui/src/main/ets/view/SocialCommonView.ets", line: 79, col: 13 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "SocialListView" });
                            }
                            Column.pop();
                            Scroll.pop();
                        }, { moduleName: "multidevicecommunicationdefaultsample", pagePath: "features/commonui/src/main/ets/view/SocialCommonView" });
                        HdsNavDestination.titleBar(this.hdsTitleBar);
                        HdsNavDestination.hideBackButton(true);
                        HdsNavDestination.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
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
                            }, Column);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new SocialListView(this, {}, undefined, elmtId, () => { }, { page: "features/commonui/src/main/ets/view/SocialCommonView.ets", line: 92, col: 11 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "SocialListView" });
                            }
                            Column.pop();
                        }, { moduleName: "multidevicecommunicationdefaultsample", pagePath: "features/commonui/src/main/ets/view/SocialCommonView" });
                        NavDestination.backgroundColor({ "id": 67108913, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
                        NavDestination.title({ builder: () => {
                                this.TitleBuilder.call(this);
                            } });
                        NavDestination.onReady(() => {
                            if (this.pathStack.size() > 0) {
                                this.pathStack.clear();
                            }
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
            Text.create({ "id": 67108888, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Text.attributeModifier.bind(this)(new PageTitleModifier(CommonConstants.PAGE_TITLE_TYPE_0));
            Text.margin({ left: 16 });
        }, Text);
        Text.pop();
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
export function SocialPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new SocialCommonView(parent ? parent : this, { activeIndex: CommonConstants.TAB_SOCIAL_INDEX }, undefined, elmtId, () => { }, { page: "features/commonui/src/main/ets/view/SocialCommonView.ets", line: 120, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {
                        activeIndex: CommonConstants.TAB_SOCIAL_INDEX
                    };
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {
                    activeIndex: CommonConstants.TAB_SOCIAL_INDEX
                });
            }
        }, { name: "SocialCommonView" });
    }
}
