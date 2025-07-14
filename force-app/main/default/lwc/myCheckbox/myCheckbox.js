// myCheckbox.js
import { LightningElement, track } from 'lwc';

export default class MyCheckbox extends LightningElement {
  @track isChecked = true;
  renderedCallback() {
    // This ensures the code runs after the component has been rendered
    if (!this.hasRendered) {
      this.hasRendered = true;
      this.applyCustomCheckboxClass();
    }
  }

  applyCustomCheckboxClass() {
    const checkboxInput = this.template.querySelector('lightning-input[type="checkbox"]');
    if (checkboxInput) {
      const fauxElement = checkboxInput.shadowRoot.querySelector('.slds-checkbox_faux');
      if (fauxElement) {
        fauxElement.classList.add('my-custom-checkbox');
      }
    }
  }

  hasRendered = false; // To prevent the code from running multiple times
}