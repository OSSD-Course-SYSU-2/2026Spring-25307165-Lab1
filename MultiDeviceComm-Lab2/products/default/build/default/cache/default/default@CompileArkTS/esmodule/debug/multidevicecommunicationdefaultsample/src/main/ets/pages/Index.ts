if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { hdsMaterial } from "@hms:hds.hdsMaterial";
import { HdsNavigation } from "@hms:hds.hdsBaseComponent";
import { HdsTabs } from "@hms:hds.hdsBaseComponent";
import { HdsTabsController } from "@hms:hds.hdsBaseComponent";
import type { HdsNavigationAttribute } from "@hms:hds.hdsBaseComponent";
import type { HdsTabsAttribute } from "@hms:hds.hdsBaseComponent";
import deviceInfo from "@ohos:deviceInfo";
import type uiObserver from "@ohos:arkui.observer";
import { BuildDirtyDataUtil, CommonConstants, HdsNavigationModifier, TabBarListModel } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import type { TabBarModel } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import { MessagesPage } from "@normalized:N&&&multidevicecommunicationdefaultsample/src/main/ets/pages/MessagesPage&";
import { ContactsPage } from "@normalized:N&&&multidevicecommunicationdefaultsample/src/main/ets/pages/ContactsPage&";
import { SocialPage } from "@normalized:N&&&multidevicecommunicationdefaultsample/src/main/ets/pages/SocialPage&";
import { MinePage } from "@normalized:N&&&multidevicecommunicationdefaultsample/src/main/ets/pages/MinePage&";
class Index extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.pathStack = new NavPathStack();
        this.tabs = [];
        this.currentIndex = 0;
        this.navigationMode = NavigationMode.Auto;
        this.controller = new HdsTabsController();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.pathStack = new NavPathStack();
        this.tabs = [];
        this.currentIndex = 0;
        this.navigationMode = NavigationMode.Auto;
    }
    @Env(SystemProperties.BREAK_POINT)
    readonly breakpoint: uiObserver.WindowSizeLayoutBreakpointInfo;
    @Provider()
    pathStack: NavPathStack; // pathStack api 22
    @Local
    tabs: TabBarModel[];
    @Local
    currentIndex: number;
    @Local
    navigationMode: NavigationMode;
    private controller: HdsTabsController;
    aboutToAppear(): void {
        this.tabs = new TabBarListModel().loadTabs();
        BuildDirtyDataUtil.buildDirtyData();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (deviceInfo.distributionOSApiVersion >= 60100) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        HdsNavigation.create(this.pathStack, { moduleName: "multidevicecommunicationdefaultsample", pagePath: "products/default/src/main/ets/pages/Index", isUserCreateStack: true });
                        HdsNavigation.attributeModifier.bind(this)(new HdsNavigationModifier(this.breakpoint.widthBreakpoint, this.navigationMode));
                    }, HdsNavigation);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        HdsTabs.create({ controller: this.controller });
                        HdsTabs.scrollable(false);
                        HdsTabs.animationDuration(0);
                        HdsTabs.barOverlap(true);
                        HdsTabs.barPosition(BarPosition.End);
                        HdsTabs.vertical(false);
                        HdsTabs.barFloatingStyle({
                            systemMaterialEffect: {
                                materialType: hdsMaterial.MaterialType.IMMERSIVE,
                                materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
                            },
                            barBottomMargin: this.breakpoint.widthBreakpoint === WidthBreakpoint.WIDTH_SM &&
                                this.breakpoint.heightBreakpoint === HeightBreakpoint.HEIGHT_MD ? 16 : 0
                        });
                        HdsTabs.onChange((index: number) => {
                            this.currentIndex = index;
                            this.changeNavigationMode(index);
                        });
                        HdsTabs.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
                    }, HdsTabs);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            this.ChatTabContent.bind(this)(item, true);
                        };
                        this.forEachUpdateFunction(elmtId, this.tabs, forEachItemGenFunction, (item: TabBarModel) => `${item.index}`, false, false);
                    }, ForEach);
                    ForEach.pop();
                    HdsTabs.pop();
                    HdsNavigation.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Navigation.create(this.pathStack, { moduleName: "multidevicecommunicationdefaultsample", pagePath: "products/default/src/main/ets/pages/Index", isUserCreateStack: true });
                        Navigation.navBarWidth(this.breakpoint.widthBreakpoint === WidthBreakpoint.WIDTH_LG ? '45%' : '50%');
                        Navigation.mode(this.navigationMode);
                        Navigation.hideToolBar(true);
                    }, Navigation);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Tabs.create({
                            barPosition: this.breakpoint.widthBreakpoint === WidthBreakpoint.WIDTH_LG ? BarPosition.Start :
                                BarPosition.End,
                            index: this.currentIndex
                        });
                        Tabs.scrollable(false);
                        Tabs.vertical(this.breakpoint.widthBreakpoint === WidthBreakpoint.WIDTH_LG ? true : false);
                        Tabs.barMode(this.breakpoint.widthBreakpoint === WidthBreakpoint.WIDTH_LG ? BarMode.Scrollable : BarMode.Fixed);
                        Tabs.animationDuration(0);
                        Tabs.barBackgroundColor({ "id": 67108914, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
                        Tabs.onChange((index: number) => {
                            this.currentIndex = index;
                            this.changeNavigationMode(index);
                        });
                        Tabs.barWidth(this.breakpoint.widthBreakpoint === WidthBreakpoint.WIDTH_LG ? 96 : '100%');
                        Tabs.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
                    }, Tabs);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            this.ChatTabContent.bind(this)(item, false);
                        };
                        this.forEachUpdateFunction(elmtId, this.tabs, forEachItemGenFunction, (item: TabBarModel) => `${item.index}`, false, false);
                    }, ForEach);
                    ForEach.pop();
                    Tabs.pop();
                    Navigation.pop();
                });
            }
        }, If);
        If.pop();
    }
    ChatTabContent(item: TabBarModel, isHighApiLevel: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (item.index === CommonConstants.TAB_MESSAGE_INDEX) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new MessagesPage(this, { activeIndex: this.currentIndex }, undefined, elmtId, () => { }, { page: "products/default/src/main/ets/pages/Index.ets", line: 108, col: 9 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                activeIndex: this.currentIndex
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            activeIndex: this.currentIndex
                                        });
                                    }
                                }, { name: "MessagesPage" });
                            }
                        });
                    }
                    else if (item.index === CommonConstants.TAB_CONTACT_INDEX) {
                        this.ifElseBranchUpdateFunction(1, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new ContactsPage(this, { activeIndex: this.currentIndex }, undefined, elmtId, () => { }, { page: "products/default/src/main/ets/pages/Index.ets", line: 110, col: 9 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                activeIndex: this.currentIndex
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            activeIndex: this.currentIndex
                                        });
                                    }
                                }, { name: "ContactsPage" });
                            }
                        });
                    }
                    else if (item.index === CommonConstants.TAB_SOCIAL_INDEX) {
                        this.ifElseBranchUpdateFunction(2, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new SocialPage(this, { activeIndex: this.currentIndex }, undefined, elmtId, () => { }, { page: "products/default/src/main/ets/pages/Index.ets", line: 112, col: 9 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                activeIndex: this.currentIndex
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            activeIndex: this.currentIndex
                                        });
                                    }
                                }, { name: "SocialPage" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(3, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new MinePage(this, { activeIndex: this.currentIndex }, undefined, elmtId, () => { }, { page: "products/default/src/main/ets/pages/Index.ets", line: 114, col: 9 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                activeIndex: this.currentIndex
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            activeIndex: this.currentIndex
                                        });
                                    }
                                }, { name: "MinePage" });
                            }
                        });
                    }
                }, If);
                If.pop();
            });
            TabContent.tabBar(isHighApiLevel ? { builder: () => {
                    this.ChatTabBar23.call(this, item);
                } } : { builder: () => {
                    this.ChatTabBar.call(this, item);
                } });
            TabContent.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
        }, TabContent);
        TabContent.pop();
    }
    ChatTabBar23(item: TabBarModel, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.TabBarColumn.bind(this)(item);
        Column.pop();
    }
    ChatTabBar(item: TabBarModel, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.justifyContent(FlexAlign.Center);
            Column.margin({ top: this.breakpoint.widthBreakpoint === WidthBreakpoint.WIDTH_LG ? 64 : 0 });
        }, Column);
        this.TabBarColumn.bind(this)(item);
        Column.pop();
    }
    TabBarColumn(item: TabBarModel, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create(item.img);
            SymbolGlyph.fontSize(24);
            SymbolGlyph.fontColor([this.currentIndex === item.index ? { "id": 67108918, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" } : { "id": 67108922, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }]);
        }, SymbolGlyph);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.title);
            Text.fontColor(this.currentIndex === item.index ? { "id": 67108918, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" } : { "id": 67108922, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Text.fontWeight(FontWeight.Medium);
            Text.textAlign(TextAlign.Center);
            Text.fontSize(10);
            Text.lineHeight(14);
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    changeNavigationMode(index: number) {
        if (index === CommonConstants.TAB_SOCIAL_INDEX || index === CommonConstants.TAB_MINE_INDEX) {
            this.navigationMode = NavigationMode.Stack;
        }
        else {
            this.navigationMode = NavigationMode.Auto;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.multidevicecommunication", moduleName: "multidevicecommunicationdefaultsample", pagePath: "pages/Index", pageFullPath: "products/default/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
