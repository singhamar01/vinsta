import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    handleInput(event) {
        console.log('Checked:', event.target.checked);
        console.log('Value:', event.target.value);
        console.log('Name:', event.target.name);
    }
}