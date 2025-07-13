import { LightningElement, track } from 'lwc';
import getTabConfigurations from '@salesforce/apex/TabConfigurationController.getTabConfigurations';
import saveTabConfigurations from '@salesforce/apex/TabConfigurationController.saveTabConfigurations';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomTabs extends LightningElement {
  @track tabs = [];
  draggedComponentType;

  connectedCallback() {
    this.loadTabConfigurations();
  }

  async loadTabConfigurations() {
    try {
      const configs = await getTabConfigurations();
      if (configs && configs.length > 0) {
        this.tabs = configs.map(tab => ({
          id: tab.tabId,
          label: tab.label,
          active: tab.active,
          contentClass: tab.contentClass,
          components: tab.components || []
        }));
      } else {
        // Default tabs if no configurations exist
        this.tabs = [
          { id: 'tab1', label: 'Tab 1', active: true, contentClass: 'slds-tabs_default__content slds-show', components: [] },
          { id: 'tab2', label: 'Tab 2', active: false, contentClass: 'slds-tabs_default__content slds-hide', components: [] }
        ];
      }
    } catch (error) {
      this.showToast('Error', error.body?.message || 'Failed to load tab configurations', 'error');
    }
  }

  async saveTabConfigurations() {
    try {
      await saveTabConfigurations(this.tabs);
      this.showToast('Success', 'Tab configurations saved successfully', 'success');
    } catch (error) {
      this.showToast('Error', error.body?.message || 'Failed to save tab configurations', 'error');
    }
  }

  handleTabClick(event) {
    const tabId = event.currentTarget.dataset.tabId;
    this.tabs = this.tabs.map(tab => ({
      ...tab,
      active: tab.id === tabId,
      contentClass: tab.id === tabId ? 'slds-tabs_default__content slds-show' : 'slds-tabs_default__content slds-hide'
    }));
    this.saveTabConfigurations();
  }

  handleAddTab() {
    const newTabId = `tab${this.tabs.length + 1}`;
    this.tabs = [
      ...this.tabs,
      { id: newTabId, label: `Tab ${this.tabs.length + 1}`, active: false, contentClass: 'slds-tabs_default__content slds-hide', components: [] }
    ];
    this.saveTabConfigurations();
  }

  handleDragStart(event) {
    this.draggedComponentType = event.currentTarget.dataset.componentType;
    event.dataTransfer.setData('text/plain', this.draggedComponentType);
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDrop(event) {
    event.preventDefault();
    const tabId = event.currentTarget.dataset.tabId;
    const componentType = this.draggedComponentType;
    if (componentType) {
      this.tabs = this.tabs.map(tab => {
        if (tab.id === tabId) {
          return {
            ...tab,
            components: [...tab.components, { id: `${componentType}-${Date.now()}`, type: componentType }]
          };
        }
        return tab;
      });
      this.saveTabConfigurations();
    }
  }

  showToast(title, message, variant) {
    const event = new ShowToastEvent({
      title,
      message,
      variant
    });
    this.dispatchEvent(event);
  }
}