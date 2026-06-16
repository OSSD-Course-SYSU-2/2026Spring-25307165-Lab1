if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
export class TextIcon extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("src", (params && "src" in params) ? params.src : undefined);
        this.initParam("iconSize", (params && "iconSize" in params) ? params.iconSize : 32);
        this.initParam("iconOnly", (params && "iconOnly" in params) ? params.iconOnly : true);
        this.initParam("content", (params && "content" in params) ? params.content : '');
        this.initParam("fontSize", (params && "fontSize" in params) ? params.fontSize : { "id": 125830971, "type": 10002, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
        this.initParam("fontColor", (params && "fontColor" in params) ? params.fontColor : { "id": 125830987, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
        this.initParam("fontWeight", (params && "fontWeight" in params) ? params.fontWeight : { "id": 125830955, "type": 10002, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
        this.initParam("gap", (params && "gap" in params) ? params.gap : 2);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("src", (params && "src" in params) ? params.src : undefined);
        this.resetParam("iconSize", (params && "iconSize" in params) ? params.iconSize : 32);
        this.resetParam("iconOnly", (params && "iconOnly" in params) ? params.iconOnly : true);
        this.resetParam("content", (params && "content" in params) ? params.content : '');
        this.resetParam("fontSize", (params && "fontSize" in params) ? params.fontSize : { "id": 125830971, "type": 10002, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
        this.resetParam("fontColor", (params && "fontColor" in params) ? params.fontColor : { "id": 125830987, "type": 10001, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
        this.resetParam("fontWeight", (params && "fontWeight" in params) ? params.fontWeight : { "id": 125830955, "type": 10002, params: [], "bundleName": "com.example.multidevicecommunication", "moduleName": "multidevicecommunicationpcsample" });
        this.resetParam("gap", (params && "gap" in params) ? params.gap : 2);
    }
    @Param
    readonly src: PixelMap | ResourceStr | DrawableDescriptor;
    @Param
    readonly iconSize: Length;
    @Param
    readonly iconOnly: boolean;
    @Param
    readonly content: string | Resource;
    @Param
    readonly fontSize: string | number | Resource;
    @Param
    readonly fontColor: ResourceColor;
    @Param
    readonly fontWeight: number | FontWeight | ResourceStr;
    @Param
    readonly gap: Length;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: this.gap });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.src);
            Image.width(this.iconSize);
            Image.aspectRatio(1);
            Image.objectFit(ImageFit.Contain);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.iconOnly) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.content);
                        Text.fontSize(this.fontSize);
                        Text.fontColor(this.fontColor);
                        Text.fontWeight(this.fontWeight);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("src" in params) {
            this.updateParam("src", params.src);
        }
        if ("iconSize" in params) {
            this.updateParam("iconSize", params.iconSize);
        }
        if ("iconOnly" in params) {
            this.updateParam("iconOnly", params.iconOnly);
        }
        if ("content" in params) {
            this.updateParam("content", params.content);
        }
        if ("fontSize" in params) {
            this.updateParam("fontSize", params.fontSize);
        }
        if ("fontColor" in params) {
            this.updateParam("fontColor", params.fontColor);
        }
        if ("fontWeight" in params) {
            this.updateParam("fontWeight", params.fontWeight);
        }
        if ("gap" in params) {
            this.updateParam("gap", params.gap);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
