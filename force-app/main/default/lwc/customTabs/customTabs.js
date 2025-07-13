import { LightningElement, track } from 'lwc';

export default class CustomTabs extends LightningElement {
  @track tabs = [
    { id: 'tab1', label: 'Tab 1', active: true, contentClass: 'slds-tabs_default__content slds-show', components: [] },
    { id: 'tab2', label: 'Tab 2', active: false, contentClass: 'slds-tabs_default__content slds-hide', components: [] }
  ];
  draggedComponentType;

  handleTabClick(event) {
    const tabId = event.currentTarget.dataset.tabId;
    this.tabs = this.tabs.map(tab => ({
      ...tab,
      active: tab.id === tabId,
      contentClass: tab.id === tabId ? 'slds-tabs_default__content slds-show' : 'slds-tabs_default__content slds-hide'
    }));
  }

  handleAddTab() {
    const newTabId = `tab${this.tabs.length + 1}`;
    this.tabs = [
      ...this.tabs,
      { id: newTabId, label: `Tab ${this.tabs.length + 1}`, active: false, contentClass: 'slds-tabs_default__content slds-hide', components: [] }
    ];
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
    }
  }
}