if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import type uiObserver from "@ohos:arkui.observer";
import { CommonConstants, DeviceInfo, Logger, RowSelectModifier, WidthBreakpointType } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import type { ContactModel } from '../model/ContactModel';
import ContactListViewModel from "@normalized:N&&&social/src/main/ets/viewmodel/ContactListViewModel&1.0.0";
import type common from "@ohos:app.ability.common";
const TAG = 'ContactListView';
export class ContactListView extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.pathStack = new NavPathStack();
        this.initParam("contactsViewModel", (params && "contactsViewModel" in params) ? params.contactsViewModel : new ContactListViewModel());
        this.letterIndex = 0;
        this.alphabetX = 0;
        this.selectedIndex = ['0_0'];
        this.listScroller = new ListScroller();
        this.info = AppStorageV2.connect<DeviceInfo>(DeviceInfo, () => new DeviceInfo());
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.moduleName = '';
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetConsumer("pathStack", new NavPathStack());
        this.resetParam("contactsViewModel", (params && "contactsViewModel" in params) ? params.contactsViewModel : new ContactListViewModel());
        this.letterIndex = 0;
        this.alphabetX = 0;
        this.resetConsumer("selectedIndex", ['0_0']);
    }
    @Env(SystemProperties.BREAK_POINT)
    readonly breakpoint: uiObserver.WindowSizeLayoutBreakpointInfo;
    @Consumer()
    pathStack: NavPathStack;
    @Param
    readonly contactsViewModel: ContactListViewModel;
    @Local
    letterIndex: number;
    @Local
    alphabetX: number;
    @Consumer()
    selectedIndex: string[];
    private listScroller: ListScroller;
    private info: DeviceInfo | undefined;
    private context: common.UIAbilityContext;
    private moduleName: string;
    aboutToAppear(): void {
        this.moduleName = this.context.abilityInfo.moduleName;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({
                left: new WidthBreakpointType(16, 16, 24, 16).getValue(this.breakpoint.widthBreakpoint),
                right: new WidthBreakpointType(16, 16, 24, 16).getValue(this.breakpoint.widthBreakpoint)
            });
            Column.backgroundColor({ "id": 67108913, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.breakpoint.widthBreakpoint === WidthBreakpoint.WIDTH_SM &&
                this.breakpoint.heightBreakpoint === HeightBreakpoint.HEIGHT_MD) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.contactsList.bind(this)(0);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.topSearch.bind(this)();
                    this.contactsList.bind(this)(28);
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    topSearch(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(40);
            Row.borderRadius(this.moduleName === CommonConstants.DEVICE_TYPE_PC ? 8 : 24);
            Row.backgroundColor({ "id": 67108915, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 67108951, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Image.width(16);
            Image.height(16);
            Image.margin({ left: 12 });
            Image.opacity(0.9);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 67108902, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Text.margin({ left: 8 });
            Text.fontSize(16);
            Text.lineHeight(21);
            Text.fontWeight(FontWeight.Regular);
            Text.fontColor({ "id": 67108921, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, Text);
        Text.pop();
        Row.pop();
    }
    contactsList(marginTop: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.BottomEnd });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 28, scroller: this.listScroller });
            List.scrollBar(BarState.Off);
            List.sticky(StickyStyle.Header);
            List.margin({ top: marginTop });
            List.onScrollIndex((index: number) => {
                this.letterIndex = index;
            });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, indexGroup: number) => {
                const letter = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ListItemGroup.create({ header: this.letterColumnGroupHeader.bind(this, letter) });
                }, ListItemGroup);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (Object.keys(this.contactsViewModel.contacts).includes(letter)) {
                        this.ifElseBranchUpdateFunction(0, () => {
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
                                                    this.selectedIndex.push(indexGroup + '_' + index);
                                                    const targetParam = this.pathStack.getParamByName('UserView') as string[];
                                                    if (targetParam[targetParam.length - 1] === item.name) {
                                                        return;
                                                    }
                                                    this.pathStack.pushPath({
                                                        name: 'UserView', param: item.name, onPop: () => {
                                                            this.selectedIndex.pop();
                                                        }
                                                    });
                                                });
                                            }, __Common__);
                                            {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    if (isInitialRender) {
                                                        let componentCall = new ContactView(this, {
                                                            contact: item,
                                                            index: indexGroup + '_' + index,
                                                            breakpoint: this.breakpoint,
                                                            moduleName: this.moduleName,
                                                        }, undefined, elmtId, () => { }, { page: "features/social/src/main/ets/view/ContactListView.ets", line: 95, col: 19 });
                                                        ViewV2.create(componentCall);
                                                        let paramsLambda = () => {
                                                            return {
                                                                contact: item,
                                                                index: indexGroup + '_' + index,
                                                                breakpoint: this.breakpoint,
                                                                moduleName: this.moduleName
                                                            };
                                                        };
                                                        componentCall.paramsGenerator_ = paramsLambda;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                                            contact: item,
                                                            index: indexGroup + '_' + index,
                                                            breakpoint: this.breakpoint,
                                                            moduleName: this.moduleName
                                                        });
                                                    }
                                                }, { name: "ContactView" });
                                            }
                                            __Common__.pop();
                                            ListItem.pop();
                                        };
                                        this.observeComponentCreation2(itemCreation2, ListItem);
                                        ListItem.pop();
                                    }
                                };
                                this.forEachUpdateFunction(elmtId, this.contactsViewModel.contacts[letter], forEachItemGenFunction, (item: ContactModel, indexItem: number) => indexItem + JSON.stringify(item), true, true);
                            }, ForEach);
                            ForEach.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                ListItemGroup.pop();
            };
            this.forEachUpdateFunction(elmtId, this.contactsViewModel.nameFirstLetter, forEachItemGenFunction, (item: string, indexGroup: number) => indexGroup + JSON.stringify(item), true, true);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.alphabetIndex.bind(this)();
        Stack.pop();
    }
    letterColumnGroupHeader(letter: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(20);
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(letter);
            Text.fontSize(14);
            Text.lineHeight(19);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 67108921, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, Text);
        Text.pop();
        Column.pop();
    }
    alphabetIndex(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            AlphabetIndexer.create({ arrayValue: this.contactsViewModel.nameFirstLetter, selected: this.letterIndex });
            AlphabetIndexer.width(24);
            AlphabetIndexer.height('100%');
            AlphabetIndexer.selectedColor({ "id": 67108912, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            AlphabetIndexer.selectedBackgroundColor({ "id": 67108926, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            AlphabetIndexer.font({ size: 12 });
            AlphabetIndexer.selectedFont({ size: 12 });
            AlphabetIndexer.margin({ bottom: this.info && this.info.distributionOSApiVersion >= CommonConstants.API_VERSION_23 ? 50 : 0 });
            AlphabetIndexer.itemSize(16);
            AlphabetIndexer.onSelect((index: number) => {
                try {
                    this.listScroller.scrollToItemInGroup(index, 0);
                }
                catch (error) {
                    let err = error as BusinessError;
                    Logger.error(TAG, `scroll failed, errorCode:${err.code}, errorMsg:${err.message}`);
                }
            });
        }, AlphabetIndexer);
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("contactsViewModel" in params) {
            this.updateParam("contactsViewModel", params.contactsViewModel);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class ContactView extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("contact", (params && "contact" in params) ? params.contact : undefined);
        this.initParam("index", (params && "index" in params) ? params.index : undefined);
        this.selectedIndex = ['0_0'];
        this.initParam("breakpoint", (params && "breakpoint" in params) ? params.breakpoint : undefined);
        this.initParam("moduleName", (params && "moduleName" in params) ? params.moduleName : undefined);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("contact", (params && "contact" in params) ? params.contact : undefined);
        this.resetParam("index", (params && "index" in params) ? params.index : undefined);
        this.resetConsumer("selectedIndex", ['0_0']);
        this.resetParam("breakpoint", (params && "breakpoint" in params) ? params.breakpoint : undefined);
        this.resetParam("moduleName", (params && "moduleName" in params) ? params.moduleName : undefined);
    }
    @Param
    readonly contact: ContactModel;
    @Param
    readonly index: string;
    @Consumer()
    selectedIndex: string[];
    @Param
    readonly breakpoint: uiObserver.WindowSizeLayoutBreakpointInfo;
    @Param
    readonly moduleName: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            ViewStackProcessor.visualState("pressed");
            Row.backgroundColor({ "id": 67108916, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Row.borderRadius(16);
            ViewStackProcessor.visualState("normal");
            Row.backgroundColor({ "id": 67108913, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Row.borderRadius(0);
            ViewStackProcessor.visualState();
            Row.attributeModifier.bind(this)(new RowSelectModifier(CommonConstants.TAB_CONTACT_INDEX, this.breakpoint.widthBreakpoint, this.selectedIndex[this.selectedIndex.length - 1], this.index));
            Row.borderRadius(this.moduleName === CommonConstants.DEVICE_TYPE_PC ? 8 : 16);
            Row.width('100%');
            Row.height(66);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.contact.icon);
            Image.width(40);
            Image.height(40);
            Image.margin({ left: new WidthBreakpointType(8, 12, 16, 12).getValue(this.breakpoint.widthBreakpoint) });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.height('100%');
            Column.layoutWeight(1);
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.contact.name);
            Text.fontSize(16);
            Text.lineHeight(21);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 67108920, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Text.margin({ top: 22 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height('1px');
            Row.backgroundColor({ "id": 67108917, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Row.margin({ top: 20 });
        }, Row);
        Row.pop();
        Column.pop();
        Row.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("contact" in params) {
            this.updateParam("contact", params.contact);
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
