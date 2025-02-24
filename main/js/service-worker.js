chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
  
  const searchPage = 'html/sidepanel.hmtl';
  const testPage = 'hmtl/menu.hmtl';
  
  document.getElementById("menuButton").addEventListener('click',function(){
    chrome.sidePanel.setOptions({path: testPage});
  })



  /*const mainPage = 'html/sidepanel.hmtl';
  const testPage = 'html/menu.hmtl';

  chrome.runtime.onInstalled.addListener(() =>  {
    chrome.sidePanel.setOptions({ path: mainPage });
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  });

  chrome.tabs.onActivated.addListener(async ({ tabId }))

  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'openSidePanel',
      title: 'Open side panel',
      contexts: ['all']
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'openSidePanel') {
      // This will open the panel in all the pages on the current window.
      chrome.sidePanel.open({ windowId: tab.windowId });
    }
  });*/