function processText() {
    // 获取用户输入的内容
    var inputText = document.getElementById('paragraphInput').value;

    // 按照空格和回车分组
    var groups = inputText.split(/[\s\n]+/);

    // 初始化处理：过滤、去重
    var filteredGroups = [];
    var uniqueGroups = new Set(); // 用于存储已经出现过的组，以便去重

    groups.forEach(group => {
        if (/^\d+$/.test(group) && group.length >= 4 && !uniqueGroups.has(group)) {
            // 只保留全数字且长度≥4的组，并去除重复组
            uniqueGroups.add(group);
            filteredGroups.push(group);
        }
    });

    // 格式化处理
    var formattedResult = '';
    for (var i = 0; i < filteredGroups.length; i++) {
        if (i > 0 && (filteredGroups[i-1].length > 5 || filteredGroups[i].length > 5)) {
            formattedResult += '\n'; // 当前组或前一组长度>5时，添加回车
        }

        formattedResult += filteredGroups[i];

        if (i < filteredGroups.length - 1) {
            if (filteredGroups[i].length <= 5 && filteredGroups[i+1].length <= 5) {
                formattedResult += ' '; // 长度≤5的组之间用空格分割
            } else if (filteredGroups[i].length > 6 && filteredGroups[i+1].length < 6) {
                formattedResult += '\nADD_BLACK_WORD\n\n'; // 长度>6的组后跟长度<6的组时，增加“ADD_BLACK_WORD”和两个回车
            }
        }
    }

    // 将处理后的结果显示在resultInput中
    document.getElementById('resultInput').value = formattedResult.trim(); // 删除尾部多余的空行
    togglePopup(); // 显示弹出层
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
    let content = document.getElementById('resultInput').value;

    // 检查content是否包含至少6位数字
    if (!/\d{6,}/.test(content)) {
        alert("发布内容不能为空或不包含至少6位数字");
        return; // 如果不符合条件，终止函数执行
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://fishpond.local:3000/blackword', true);
    xhr.setRequestHeader('Content-Type', 'text/plain');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            let responseDisplay = document.getElementById('responseDisplay');
            if (xhr.status === 200) {
                // 将接口返回的信息显示在文本展示区域
                responseDisplay.textContent = '发送成功: ' + xhr.responseText;
            } else {
                console.error('发送错误:', xhr.status);
                // 显示错误信息
                responseDisplay.textContent = '发送过程中出现错误';
            }
        }
    };
    xhr.send(content);
}
