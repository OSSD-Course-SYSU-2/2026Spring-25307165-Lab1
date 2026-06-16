if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { CommonConstants, EmptyComponent } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
export class MineCommonView extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.pathStack = new NavPathStack();
        this.initParam("activeIndex", (params && "activeIndex" in params) ? params.activeIndex : undefined);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetConsumer("pathStack", new NavPathStack());
        this.resetParam("activeIndex", (params && "activeIndex" in params) ? params.activeIndex : undefined);
        this.resetMonitorsOnReuse();
    }
    @Consumer()
    pathStack: NavPathStack;
    @Param
    readonly activeIndex: number;
    @Monitor('activeIndex')
    onActiveIndex(mon: IMonitor) {
        const value: IMonitorValue<number> | undefined = mon.value();
        if (!value) {
            return;
        }
        if (value.now === CommonConstants.TAB_MINE_INDEX) {
            if (this.pathStack.size() > 0) {
                this.pathStack.clear();
            }
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new EmptyComponent(this, {}, undefined, elmtId, () => { }, { page: "features/commonui/src/main/ets/view/MineCommonView.ets", line: 38, col: 7 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "EmptyComponent" });
                }
            }, { moduleName: "multidevicecommunicationdefaultsample", pagePath: "features/commonui/src/main/ets/view/MineCommonView" });
            NavDestination.onReady(() => {
                if (this.pathStack.size() > 0) {
                    this.pathStack.clear();
                }
            });
        }, NavDestination);
        NavDestination.pop();
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
export function MinePageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new MineCommonView(parent ? parent : this, { activeIndex: CommonConstants.TAB_MINE_INDEX }, undefined, elmtId, () => { }, { page: "features/commonui/src/main/ets/view/MineCommonView.ets", line: 50, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {
                        activeIndex: CommonConstants.TAB_MINE_INDEX
                    };
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {
                    activeIndex: CommonConstants.TAB_MINE_INDEX
                });
            }
        }, { name: "MineCommonView" });
    }
}
