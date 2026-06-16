if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
export class GlassCircle extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("imageSrc", (params && "imageSrc" in params) ? params.imageSrc : undefined);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("imageSrc", (params && "imageSrc" in params) ? params.imageSrc : undefined);
    }
    @Param
    readonly imageSrc: Resource;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(40);
            Column.height(40);
            Column.border({
                radius: 20
            });
            Column.backgroundColor({ "id": 83886131, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.imageSrc);
            Image.width(24);
            Image.height(24);
            Image.objectFit(ImageFit.Contain);
        }, Image);
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("imageSrc" in params) {
            this.updateParam("imageSrc", params.imageSrc);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
