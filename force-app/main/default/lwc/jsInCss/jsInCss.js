import { LightningElement, api } from "lwc";

export default class JsInCss extends LightningElement {
    @api customColor;

    renderedCallback() {

        this.template
            .querySelector("lightning-card")
            .style.setProperty("--my-color", this.customColor);

    }
}