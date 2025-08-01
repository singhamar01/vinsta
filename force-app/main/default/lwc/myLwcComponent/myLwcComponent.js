// myLwcComponent.js
import { LightningElement } from 'lwc';
import SharedUtils from '@salesforce/resourceUrl/SharedUtils';
import { loadScript } from 'lightning/platformResourceLoader';

export default class MyLwcComponent extends LightningElement {
    async connectedCallback() {
        try {
            await loadScript(this, SharedUtils);
            // Access SharedUtils globally
            console.log(window.SharedUtils.formatDate(new Date()));
            console.log(window.SharedUtils.isValidEmail('test@example.com'));
            window.SharedUtils.log('LWC component loaded', 'info');
        } catch (error) {
            console.error('Error loading SharedUtils:', error);
        }
    }
}