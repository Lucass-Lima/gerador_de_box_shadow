//CRIANDO CLASSE
class BoxShadowGenerator {

    constructor(
        horizontal,
        horizontalRef,
        vertical,
        verticalRef,
        blur,
        blurRef,
        spread,
        spreadRef,
        color,
        colorRef,
        opacity,
        opacityRef,
        inset,
        previewBox,
        rule,
        webkitRule,
        mozRule
    ) {
        this.horizontal = horizontal;
        this.horizontalRef = horizontalRef;
        this.vertical = vertical;
        this.verticalRef = verticalRef;
        this.blur = blur;
        this.blurRef = blurRef;
        this.spread = spread;
        this.spreadRef = spreadRef;
        this.color = color;
        this.colorRef = colorRef;
        this.opacity = opacity;
        this.opacityRef = opacityRef;
        this.inset = inset;
        this.insetRef = inset.checked;
        this.previewBox = previewBox;
        this.rule = rule;
        this.webkitRule = webkitRule;
        this.mozRule =  mozRule;
    }

    Initialize() {

        this.horizontalRef.value = this.horizontal.value;
        this.verticalRef.value = this.vertical.value;
        this.blurRef.value = this.blur.value;
        this.spreadRef.value = this.spread.value;

        this.colorRef.value = this.color.value;
        this.opacityRef.value = this.opacity.value;

        this.ApplyRule();
        this.ShowRule();
    }

    ApplyRule() {

        const rgbValue = this.HexToRGB(this.colorRef.value);

        const shadowRule = `
            ${this.insetRef ? "inset" : ""}
            ${this.horizontalRef.value}px 
            ${this.verticalRef.value}px
            ${this.blurRef.value}px
            ${this.spreadRef.value}px
            rgba(${rgbValue}, ${this.opacityRef.value}) `

        this.previewBox.style.boxShadow = shadowRule;

        this.currentRule = this.previewBox.style.boxShadow;
    }

    ShowRule() {

        this.rule.innerText = this.currentRule;
        this.webkitRule.innerText =this.currentRule;
        this.mozRule.innerText = this.currentRule;
    }

    UpdateValue(type, value) {

        switch(type) {
            case "horizontal":
                this.horizontalRef.value = value;
                break;
                
            case "vertical":
                this.verticalRef.value = value;
                break;

            case "blur":
                this.blurRef.value = value;
                break;

            case "spread":
                this.spreadRef.value = value;
                break;

            case "color":
                this.colorRef.value = value;
                break;

            case "opacity":
                this.opacityRef.value = value;
                break;

            case "inset":
                this.insetRef = value;
                break;
        }

        this.ApplyRule();
        this.ShowRule();
    }

    HexToRGB(hex) {

        return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${("0x" + hex[5] + hex[6]) | 0}`;
    }
}

//SELEÇAO DE ELEMENTOS
const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal_value");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical_value");
const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur_value");
const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread_value");

const color = document.querySelector("#color");
const colorRef = document.querySelector("#color_value");
const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacity_value");
const inset = document.querySelector("#inset");

const previewBox = document.querySelector("#box");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit_rule span");
const mozRule = document.querySelector("#moz_rule span");

const boxShadow = new BoxShadowGenerator(
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur,
    blurRef,
    spread,
    spreadRef,
    color,
    colorRef,
    opacity,
    opacityRef,
    inset,
    previewBox,
    rule,
    webkitRule,
    mozRule
)

boxShadow.Initialize();

//EVENTOS
horizontal.addEventListener("input", (e) => {

    const value = e.target.value;

    boxShadow.UpdateValue("horizontal", value);
});

vertical.addEventListener("input", (e) => {

    const value = e.target.value;

    boxShadow.UpdateValue("vertical", value);
});

blur.addEventListener("input", (e) => {

    const value = e.target.value;

    boxShadow.UpdateValue("blur", value);
});

spread.addEventListener("input", (e) => {

    const value = e.target.value;

    boxShadow.UpdateValue("spread", value);
});

color.addEventListener("input", (e) => {

    const value = e.target.value;

    boxShadow.UpdateValue("color", value);
});

opacity.addEventListener("input", (e) => {

    const value = e.target.value;

    boxShadow.UpdateValue("opacity", value);
});

inset.addEventListener("input", (e) => {

    const value = e.target.checked;

    boxShadow.UpdateValue("inset", value);
});


//COPIAR REGRAS PARA O "CTRL C"
const rulesArea = document.querySelector("#rules_area");
const copyInstructions = document.querySelector("#copy_instruction");

rulesArea.addEventListener("click", () => {

    const rules = rulesArea.innerText.replace(/^\s*\n/gm, "");

    navigator.clipboard.writeText(rules).then(() => {

        copyInstructions.innerText = "Regra copiada com Sucesso";

        setTimeout(() => {

            copyInstructions.innerText = "*Clique no quadro abaixo para copiar as regras*";
        },1000);
    })
});