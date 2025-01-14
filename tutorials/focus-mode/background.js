// This is explored by me

// This event our service worker (means the background service which listens for the events )
// runtime.onInstalled allows the extensions to
chrome.runtime.onInstalled.addListener(() => {
  // The badge is shown over the icon of the exension which has two properties one is text component and background color
  chrome.action.setBadgeText({
    text: 'OFF',
  });
  chrome.action.setBadgeBackgroundColor({ color: 'yellow' });
  // This is the title that is shown when it is hovered over
  chrome.action.setTitle({
    title: 'I am good',
  });
});

// const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

const youtube = "https://www.youtube.com/"

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(youtube) || tab.url.startsWith(webstore)) {
    // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === 'ON') {
      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        files: ['focus-mode.css'],
        target: { tabId: tab.id },
      });
    } else if (nextState === 'OFF') {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ['focus-mode.css'],
        target: { tabId: tab.id },
      });
    }
  }
});
