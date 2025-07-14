import { LightningElement, api } from 'lwc';

export default class DraggableComponent extends LightningElement {
  @api componentType;
  //Flexipage provides recordId and objectApiName
  @api recordId;
  @api objectApiName;
  @api isDisabled = false; // Default to Enabled mode

  get isTextInput() {
    return this.componentType === 'textInput';
  }

  get isDropdown() {
    return this.componentType === 'dropdown';
  }

  get isButton() {
    return this.componentType === 'button';
  }

  get isCaseDetails() {
    return this.componentType === 'caseDetails';
  }

  get isCheckbox() {
    return this.componentType === 'checkbox';
  }  

  options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' }
  ];
}