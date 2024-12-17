// background.js
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: showQRCode,
    });
});

function showQRCode() {
    const url = window.location.href;
    // 生成二维码并显示
    generateQRCode(url);
}
