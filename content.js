// 确保消息监听器只被添加一次
if (!window.hasMessageListener) {
    window.hasMessageListener = true;
    
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === "toggleQRCode") {
            createQRCode();
            // 发送响应
            sendResponse({success: true});
            return true; // 保持消息通道打开
        }
    });
}

// 创建二维码容器
function createQRCode() {
    // 检查是否已存在二维码容器
    if (document.getElementById('qrCodeContainer')) {
        return;
    }

    // 创建容器
    const container = document.createElement('div');
    container.id = 'qrCodeContainer';
    
    // 创建关闭按钮
    const closeButton = document.createElement('div');
    closeButton.innerHTML = '×';
    closeButton.className = 'close-button';
    closeButton.onclick = function() {
        container.remove();
    };
    
    // 创建二维码区域
    const qrArea = document.createElement('div');
    qrArea.id = 'qrArea';
    
    // 创建网站标题区域
    const titleArea = document.createElement('div');
    titleArea.id = 'titleArea';
    titleArea.textContent = document.title; // 获取当前网页标题
    
    // 添加元素到容器
    container.appendChild(closeButton);
    container.appendChild(qrArea);
    container.appendChild(titleArea);
    document.body.appendChild(container);
    
    // 生成二维码
    new QRCode(qrArea, {
        text: window.location.href,
        width: 128,
        height: 128
    });
}
