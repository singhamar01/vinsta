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
      console.log('Loaded tab configurations:', JSON.stringify(configs));
      if (configs && configs.length > 0) {
        this.tabs = configs.map(tab => ({
          tabId: tab.tabId,
          label: tab.label,
          active: tab.active,
          contentClass: tab.contentClass,
          components: tab.components || [],
          tabClass: tab.active ? 'slds-tabs_default__item slds-is-active' : 'slds-tabs_default__item'
        }));
      } else {
        // Default tabs if no configurations exist
        this.tabs = [
          { tabId: 'tab1', label: 'Tab 1', active: true, contentClass: 'slds-tabs_default__content slds-show', components: [], tabClass: 'slds-tabs_default__item slds-is-active' },
          { tabId: 'tab2', label: 'Tab 2', active: false, contentClass: 'slds-tabs_default__content slds-hide', components: [], tabClass: 'slds-tabs_default__item' }
        ];
      }
    } catch (error) {
      this.showToast('Error', error.body?.message || 'Failed to load tab configurations', 'error');
    }
  }

  async saveTabConfigurations() {
    try {
      // Explicitly serialize tabs to JSON
      const tabConfigsJson = JSON.stringify(this.tabs);
      await saveTabConfigurations({ tabConfigsJson });
      this.showToast('Success', 'Tab configurations saved successfully', 'success');
    } catch (error) {
      this.showToast('Error', error.body?.message || 'Failed to save tab configurations', 'error');
    }
  }

  handleTabClick(event) {
    const tabId = event.currentTarget.dataset.tabId;
    this.tabs = this.tabs.map(tab => ({
      ...tab,
      active: tab.tabId === tabId,
      contentClass: tab.tabId === tabId ? 'slds-tabs_default__content slds-show' : 'slds-tabs_default__content slds-hide',
      tabClass: tab.tabId === tabId ? 'slds-tabs_default__item slds-is-active' : 'slds-tabs_default__item'
    }));
    this.saveTabConfigurations();
  }

  handleAddTab() {
    const newTabId = `tab${this.tabs.length + 1}`;
    this.tabs = [
      ...this.tabs,
      { tabId: newTabId, label: `Tab ${this.tabs.length + 1}`, active: false, contentClass: 'slds-tabs_default__content slds-hide', components: [] }
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
    console.log('Dropping component into tab:', tabId);
    const componentType = this.draggedComponentType;
    console.log('Component type:', componentType);
    if (componentType) {
      this.tabs = this.tabs.map(tab => {
        if (tab.tabId === tabId) {
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