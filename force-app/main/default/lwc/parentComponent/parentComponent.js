import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    customColor = '#ff5733'; // Example color, can be dynamically set
    handleInput(event) {
        console.log('Checked:', event.detail.checked);
        console.log('Value:', event.detail.value);
        console.log('Name:', event.detail.name);
    }
    handleCheckboxChange(event) {
        //console.log('Checkbox changed:', event.detail);
        // You can handle the change event here or pass it to another method
        //console.log('change-handler Checked:', event.detail.checked);
        //console.log('change-handler Value:', event.detail.value);
        //console.log('change-handler Name:', event.detail.name);
    }
}