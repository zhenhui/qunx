// JavaScript 文件 script.js

// 处理文本的函数
function processText() {
    var inputText = document.getElementById('paragraphInput').value; // 获取输入框的内容
    var lines = inputText.split('\n'); // 按行分割文本

    // 只保留包含数字的行
    var processedLines = lines.filter(line => line.split(' ').every(part => /^\d+$/.test(part)));

    // 将处理后的行合并为文本
    var filteredText = processedLines.join('\n');
    console.log(filteredText); // 打印处理后的内容以供检查

    // 把处理后的结果同步到id="resultInput"
    document.getElementById('resultInput').value = filteredText;

    // 显示popup浮层
    var popup = document.getElementById('popup');
    popup.style.display = 'block';
}

function togglePopup() {
    // 显示或隐藏弹出层
    var popup = document.getElementById('popup');
    popup.style.display = popup.style.display == 'block' ? 'none' : 'block';
}

function copyText() {
    // 复制文本
    var copyText = document.getElementById('resultInput');
    copyText.select();
    document.execCommand('copy');
}

function sendData() {
    var data = document.getElementById('resultInput').value; // 获取id="resultInput"的值

    // 发送POST请求
    fetch('http://fishpond.local:3000/assignedAdAccounts', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: data
    })
    .then(response => response.text())
    .then(text => {
        // 把返回的结果打印在id="responseDisplay"
        document.getElementById('responseDisplay').textContent = text;
    })
    .catch(error => {
        // 把报错信息打印在id="responseDisplay"
        document.getElementById('responseDisplay').textContent = 'Error: ' + error;
    });

    // 把请求的链接和参数打印在控制台
    console.log('Request URL:', 'http://fishpond.local:3000/assignedAdAccounts');
    console.log('Request Data:', data);
}