import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    handleInput(event) {
        /*console.log('Checked:', event.target.checked);
        console.log('Value:', event.target.value);
        console.log('Name:', event.target.name);*/
    }
    handleCheckboxChange(event) {
        console.log('Checkbox changed:', event.detail);
        // You can handle the change event here or pass it to another method
        console.log('Checked:', event.detail.checked);
        console.log('Value:', event.detail.value);
        console.log('Name:', event.detail.name);
    }
}