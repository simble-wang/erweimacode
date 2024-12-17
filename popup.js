document.getElementById('generateQR').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // 确保当前有活动的标签页
        if (tabs[0]) {
            // 添加错误处理
            chrome.tabs.sendMessage(tabs[0].id, {action: "toggleQRCode"})
                .then(response => {
                    // 消息发送成功的处理
                    console.log('消息发送成功');
                })
                .catch(error => {
                    // 如果content script还没准备好，先注入content script
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        files: ['content.js']
                    }).then(() => {
                        // 重试发送消息
                        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleQRCode"});
                    }).catch(err => {
                        console.error('无法注入content script:', err);
                    });
                });
        }
    });
}); 