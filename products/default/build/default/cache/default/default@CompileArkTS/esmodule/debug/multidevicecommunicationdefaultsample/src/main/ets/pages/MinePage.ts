if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { CommonConstants } from "@normalized:N&&&commonmultidevicecommunication/Index&1.0.0";
import { MineCommonView } from "@normalized:N&&&commonui/Index&1.0.0";
export class MinePage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("activeIndex", (params && "activeIndex" in params) ? params.activeIndex : undefined);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("activeIndex", (params && "activeIndex" in params) ? params.activeIndex : undefined);
    }
    @Param
    readonly activeIndex: number;
    initialRender() {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new MineCommonView(this, { activeIndex: this.activeIndex }, undefined, elmtId, () => { }, { page: "products/default/src/main/ets/pages/MinePage.ets", line: 23, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            activeIndex: this.activeIndex
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        activeIndex: this.activeIndex
                    });
                }
            }, { name: "MineCommonView" });
        }
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
                let componentCall = new MinePage(parent ? parent : this, { activeIndex: CommonConstants.TAB_MINE_INDEX }, undefined, elmtId, () => { }, { page: "products/default/src/main/ets/pages/MinePage.ets", line: 29, col: 3 });
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
        }, { name: "MinePage" });
    }
}
