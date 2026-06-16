if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type uiObserver from "@ohos:arkui.observer";
import { hdsMaterial } from "@hms:hds.hdsMaterial";
import deviceInfo from "@ohos:deviceInfo";
import type common from "@ohos:app.ability.common";
import { DividerShowType, HdsNavDestination, ScrollEffectType, HdsNavDestinationAttribute } from "@hms:hds.hdsBaseComponent";
import type { HdsNavigationTitleBarOptions } from "@hms:hds.hdsBaseComponent";
import { CommonConstants, GlassCircle, WidthBreakpointType } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import type { UserModel } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import { UserListViewModel } from "@normalized:N&&&user/src/main/ets/viewmodel/UserListViewModel&1.0.0";
import { UserColumnModifier } from "@normalized:N&&&user/src/main/ets/view/UserColumnModifier&1.0.0";
export class UserView extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.pathStack = new NavPathStack();
        this.usersViewModel = new UserListViewModel();
        this.userModel = {
            name: { "id": 67108886, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" },
            icon: { "id": 67108955, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" },
            phoneNum: '',
            lastUpdate: []
        };
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.moduleName = '';
        this.hdsTitleBar = {};
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetConsumer("pathStack", new NavPathStack());
        this.usersViewModel = new UserListViewModel();
        this.userModel = {
            name: { "id": 67108886, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" },
            icon: { "id": 67108955, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" },
            phoneNum: '',
            lastUpdate: []
        };
    }
    @Env(SystemProperties.BREAK_POINT)
    readonly breakpoint: uiObserver.WindowSizeLayoutBreakpointInfo;
    @Consumer()
    pathStack: NavPathStack;
    @Local
    usersViewModel: UserListViewModel;
    @Local
    userModel: UserModel;
    private context: common.UIAbilityContext;
    private moduleName: string;
    private hdsTitleBar: HdsNavigationTitleBarOptions;
    aboutToAppear(): void {
        this.usersViewModel.loadUsers();
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
                                Scroll.scrollBar(BarState.Off);
                                Scroll.edgeEffect(EdgeEffect.Spring);
                                Scroll.height('100%');
                                Scroll.align(Alignment.Top);
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
                            this.User.bind(this)();
                            Column.pop();
                            Scroll.pop();
                        }, { moduleName: "multidevicecommunicationdefaultsample", pagePath: "features/user/src/main/ets/view/UserView" });
                        HdsNavDestination.titleBar(this.hdsTitleBar);
                        HdsNavDestination.backgroundColor({ "id": 67108932, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
                        HdsNavDestination.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
                        HdsNavDestination.onReady((context: NavDestinationContext) => {
                            this.getUserData(context);
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
                                Scroll.create();
                                Scroll.scrollBar(BarState.Off);
                                Scroll.edgeEffect(EdgeEffect.Spring);
                                Scroll.height('100%');
                                Scroll.align(Alignment.Top);
                                Scroll.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.BOTTOM]);
                            }, Scroll);
                            this.User.bind(this)();
                            Scroll.pop();
                        }, { moduleName: "multidevicecommunicationdefaultsample", pagePath: "features/user/src/main/ets/view/UserView" });
                        NavDestination.backgroundColor({ "id": 67108932, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
                        NavDestination.hideBackButton(true);
                        NavDestination.title({ builder: () => {
                                this.TitleBuilder.call(this);
                            } });
                        NavDestination.onReady((context: NavDestinationContext) => {
                            this.getUserData(context);
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
                        SymbolGlyph.create({ "id": 125832679, "type": 40000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
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
                                    imageSrc: { "id": 67108946, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }
                                }, undefined, elmtId, () => { }, { page: "features/user/src/main/ets/view/UserView.ets", line: 133, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        imageSrc: { "id": 67108946, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    imageSrc: { "id": 67108946, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" }
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
    User(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.BOTTOM]);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.userModel.icon);
            Image.width(116);
            Image.height(116);
            Image.margin({ top: 28 });
            Image.zIndex(2);
            Image.border({
                width: 5,
                color: Color.White,
                radius: 100
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.attributeModifier.bind(this)(new UserColumnModifier(this.breakpoint.widthBreakpoint === WidthBreakpoint.WIDTH_SM &&
                this.breakpoint.heightBreakpoint === HeightBreakpoint.HEIGHT_MD));
            Column.padding({
                left: new WidthBreakpointType(16, 24, 32, 24).getValue(this.breakpoint.widthBreakpoint),
                right: new WidthBreakpointType(16, 24, 32, 24).getValue(this.breakpoint.widthBreakpoint)
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userModel.name);
            Text.fontSize(24);
            Text.lineHeight(32);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 67108920, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Text.margin({ top: 82 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 49 });
            Row.width('100%');
            Row.height(21);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userModel.phoneNum);
            Text.fontSize(16);
            Text.lineHeight(21);
            Text.fontColor({ "id": 67108920, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 67108950, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Image.width(24);
            Image.height(24);
            Image.margin({ right: 24 });
            Image.fillColor({ "id": 67108928, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 67108952, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Image.width(24);
            Image.height(24);
            Image.margin({ right: 24 });
            Image.fillColor({ "id": 67108928, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 67108947, "type": 20000, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Image.width(24);
            Image.height(24);
            Image.fillColor({ "id": 67108928, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, Image);
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 18 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.height('1px');
            Divider.backgroundColor({ "id": 67108917, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
        }, Divider);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 67108900, "type": 10003, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationdefaultsample" });
            Text.fontSize(16);
            Text.lineHeight(21);
            Text.fontWeight(FontWeight.Regular);
            Text.fontColor(Color.Black);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.layoutDirection(GridDirection.Row);
            Grid.rowsTemplate('1fr 1fr');
            Grid.columnsTemplate('1fr 1fr 1fr');
            Grid.rowsGap(5);
            Grid.columnsGap(5);
            Grid.width('100%');
            Grid.aspectRatio(1.5);
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
            this.forEachUpdateFunction(elmtId, this.userModel.lastUpdate, forEachItemGenFunction, (item: number, index: number) => JSON.stringify(item) + index, false, true);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        Row.pop();
        Column.pop();
        Stack.pop();
    }
    getUserData(context: NavDestinationContext) {
        const name: Resource | string = context.pathInfo.param as Resource | string;
        if (this.usersViewModel.users.length <= 0) {
            return;
        }
        if (typeof name === 'string') {
            this.userModel = this.usersViewModel.users.filter(user => (user.name as string) === (name as string))[0];
        }
        else {
            this.userModel =
                this.usersViewModel.users.filter(user => (user.name as Resource).id === (name as Resource).id)[0];
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export function UserBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new UserView(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "features/user/src/main/ets/view/UserView.ets", line: 271, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "UserView" });
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("UserView", wrapBuilder(UserBuilder));
    }
})();
