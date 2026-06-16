if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { BuildDirtyDataUtil, CommonConstants, TabBarListModel } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import type { TabBarModel } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import { ContactsPage } from "@normalized:N&&&multidevicecommunicationpcsample/src/main/ets/pages/ContactsPage&";
import { MessagesPage } from "@normalized:N&&&multidevicecommunicationpcsample/src/main/ets/pages/MessagesPage&";
import { MinePage } from "@normalized:N&&&multidevicecommunicationpcsample/src/main/ets/pages/MinePage&";
import { SocialPage } from "@normalized:N&&&multidevicecommunicationpcsample/src/main/ets/pages/SocialPage&";
class Index extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.pathStack = new NavPathStack();
        this.tabs = [];
        this.currentIndex = 0;
        this.navigationMode = NavigationMode.Auto;
        this.controller = new TabsController();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.pathStack = new NavPathStack();
        this.tabs = [];
        this.currentIndex = 0;
        this.navigationMode = NavigationMode.Auto;
    }
    @Provider()
    pathStack: NavPathStack;
    @Local
    tabs: TabBarModel[];
    @Local
    currentIndex: number;
    @Local
    navigationMode: NavigationMode;
    private controller: TabsController;
    aboutToAppear(): void {
        this.tabs = new TabBarListModel().loadTabs();
        BuildDirtyDataUtil.buildDirtyData();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SideBarContainer.create();
            SideBarContainer.showSideBar(true);
            SideBarContainer.sideBarWidth('20%');
            SideBarContainer.showControlButton(false);
        }, SideBarContainer);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 24, right: 24 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 83886173, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Image.width(24);
            Image.height(24);
            Image.borderRadius(6);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 83886119, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Text.fontSize(16);
            Text.lineHeight(21);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 83886136, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 2 });
            Column.alignItems(HorizontalAlign.Start);
            Column.width('100%');
            Column.layoutWeight(1);
            Column.padding({ left: 16, right: 16 });
            Column.margin({ top: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.TabBarRow.bind(this)(item);
            };
            this.forEachUpdateFunction(elmtId, this.tabs, forEachItemGenFunction, (item: TabBarModel) => `${item.index}`, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pathStack, { moduleName: "multidevicecommunicationpcsample", pagePath: "products/pc/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.hideTitleBar(true);
            Navigation.hideToolBar(true);
            Navigation.width('100%');
            Navigation.height('100%');
            Navigation.mode(this.navigationMode);
            Navigation.navBarWidth('40%');
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ controller: this.controller, index: this.currentIndex });
            Tabs.barHeight(0);
            Tabs.scrollable(false);
            Tabs.animationDuration(0);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.ChatTabContent.bind(this)(item);
            };
            this.forEachUpdateFunction(elmtId, this.tabs, forEachItemGenFunction, (item: TabBarModel) => `${item.index}`, false, false);
        }, ForEach);
        ForEach.pop();
        Tabs.pop();
        Navigation.pop();
        Column.pop();
        SideBarContainer.pop();
    }
    ChatTabContent(item: TabBarModel, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (item.index === CommonConstants.TAB_MESSAGE_INDEX) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new MessagesPage(this, { activeIndex: this.currentIndex }, undefined, elmtId, () => { }, { page: "products/pc/src/main/ets/pages/Index.ets", line: 99, col: 9 });
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
                                        let componentCall = new ContactsPage(this, { activeIndex: this.currentIndex }, undefined, elmtId, () => { }, { page: "products/pc/src/main/ets/pages/Index.ets", line: 101, col: 9 });
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
                                        let componentCall = new SocialPage(this, { activeIndex: this.currentIndex }, undefined, elmtId, () => { }, { page: "products/pc/src/main/ets/pages/Index.ets", line: 103, col: 9 });
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
                                        let componentCall = new MinePage(this, { activeIndex: this.currentIndex }, undefined, elmtId, () => { }, { page: "products/pc/src/main/ets/pages/Index.ets", line: 105, col: 9 });
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
        }, TabContent);
        TabContent.pop();
    }
    TabBarRow(item: TabBarModel, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(40);
            ViewStackProcessor.visualState("pressed");
            Row.backgroundColor({ "id": 83886132, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Row.borderRadius(8);
            ViewStackProcessor.visualState("normal");
            Row.backgroundColor({ "id": 83886130, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Row.borderRadius(0);
            ViewStackProcessor.visualState();
            Row.onClick(() => {
                this.currentIndex = item.index;
                this.controller.changeIndex(item.index);
                this.changeNavigationMode(item.index);
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create(item.img);
            SymbolGlyph.fontSize(24);
            SymbolGlyph.fontColor([this.currentIndex === item.index ? { "id": 83886134, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" } : { "id": 83886138, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" }]);
            SymbolGlyph.borderRadius(6);
            SymbolGlyph.margin({ left: 8 });
        }, SymbolGlyph);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.title);
            Text.fontColor(this.currentIndex === item.index ? { "id": 83886134, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" } : { "id": 83886138, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Text.fontWeight(FontWeight.Medium);
            Text.textAlign(TextAlign.Center);
            Text.fontSize(16);
            Text.lineHeight(19);
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
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
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.multidevicecommunication", moduleName: "multidevicecommunicationpcsample", pagePath: "pages/Index", pageFullPath: "products/pc/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
