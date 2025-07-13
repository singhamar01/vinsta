import { LightningElement, api } from 'lwc';

export default class DraggableComponent extends LightningElement {
  @api componentType;

  get isTextInput() {
    return this.componentType === 'textInput';
  }

  get isDropdown() {
    return this.componentType === 'dropdown';
  }

  get isButton() {
    return this.componentType === 'button';
  }

  options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' }
  ];
}