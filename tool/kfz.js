// JavaScript 文件 script.js

// 处理文本的函数
function processText() {
    var inputText = document.getElementById('paragraphInput').value; // 获取输入框内容
    var groups = inputText.split(/[\s\n]+/); // 根据空格或回车分割成组

    // 删除所有含数字以外内容的组
    var filteredGroups = groups.filter(function(group) {
        return /^[0-9]+$/.test(group);
    });

    // 格式化多组内容
    var formattedText = filteredGroups.join(',');

    // 显示popup层
    var popup = document.getElementById('popup');
    popup.style.display = 'block';

    // 把处理完的内容赋值到id为resultInput的<textarea>元素
    document.getElementById('resultInput').value = formattedText;
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

// JavaScript 文件 script.js

// 发送数据的函数
function sendData() {
    var smallDevice = document.getElementById('resultInput').value; // 获取id为resultInput的值
    console.log(smallDevice);
    var bigDevice = document.getElementById('newInput').value; // 获取id为newInput的值

    // 将smallDevice字符串转换为数组
    var smallDeviceArray = smallDevice.split(',').map(Number);

    // 构造请求参数
    var requestData = {
        "bigDeveloperSerialNumber": bigDevice,
        "commonSerialNumberList": smallDeviceArray
    };

    // 发送POST请求
    fetch('http://fishpond.local:3000/ascendToSmallDeveloperAndToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        // 显示返回的信息
        document.getElementById('responseDisplay').textContent = JSON.stringify(data);
    })
    .catch(error => {
        // 显示报错信息
        document.getElementById('responseDisplay').textContent = 'Error: ' + error;
    });

    // 打印发送的链接和参数在控制台
    console.log('Request URL:', 'http://fishpond.local:3000/ascendToSmallDeveloperAndToken');
    console.log('Request Data:', requestData);
}
