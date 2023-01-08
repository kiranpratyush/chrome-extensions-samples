// In the pop up js I am first query

async function tabQuery() {
  const tabs = await chrome.tabs.query({});
  console.log(tabs);
  const element = document.querySelector('h1');
  tabs.forEach((tab) => {
    const element = document.createElement('a');
    element.innerText = tab.url + tab.title;
    element.addEventListener('click', async () => {
      const updateInfo = {
        focused: true,
      };
      const tabUpdateInfo = { active: true, highlighted: true };
      await chrome.windows.update(tab.windowId, updateInfo, () => {});
      await chrome.tabs.update(tab.id, tabUpdateInfo, () => {});
    });
    document.body.appendChild(element);
  });
}

tabQuery();
