function processText() {
    let text = document.getElementById('paragraphInput').value;
    let groups = text.split(/\n\s*\n/); // 根据空行分割成组
    let additionalText = "Diaa\nGames/toys\nHOME,POST,POST,POST,ABOUT\n425199327715397\n"; // 每组后附加的文本

    let processedGroups = groups.map(group => {
        let ids = group.split(/\s+/).filter(part => /^\d{4,}$/.test(part));

        // 删除每组中第一个长度大于6的ID
        let firstLongIdIndex = ids.findIndex(id => id.length > 6);
        if (firstLongIdIndex !== -1) {
            ids.splice(firstLongIdIndex, 1);
        }

        let processedIds = ids.map(id => id.length > 6 ? id + '\n' : id);

        // 最后一个长度小于等于5的ID后增加回车
        let lastShortIdIndex = processedIds.map((id, index) => id.length <= 5 ? index : -1).reduce((a, b) => b > a ? b : a, -1);
        if (lastShortIdIndex !== -1 && !processedIds[lastShortIdIndex].endsWith('\n')) {
            processedIds[lastShortIdIndex] += '\n';
        }

        return processedIds.join(' ') + additionalText; // 将处理后的ID以及额外文本结合
    });

    let finalText = processedGroups.join('\n\n').replace(/^\s+/gm, ''); // 去除每行开头的空格并在组间添加空行分割
    finalText = finalText.replace(/\n\nDiaa/g, '\nDiaa'); // 删除"Diaa"前的空行
    finalText = finalText.replace(/425199327715397\n/g, '425199327715397\n\n'); // 在每个"ABOUT"后面增加空行
    document.getElementById('resultInput').value = finalText.trim(); // 进一步确保去除首尾空格
    togglePopup();
}

function togglePopup() {
    let popup = document.getElementById('popup');
    popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
}

// 复制文本的函数
function copyText() {
    // 获取要复制的文本内容
    let text = document.getElementById('resultInput').value;
    // 使用Clipboard API来复制文本
    navigator.clipboard.writeText(text).then(() => {
        // 复制成功后的操作，例如显示复制成功的消息
        document.getElementById('responseDisplay').textContent = '文本已复制';
    }).catch(err => {
        // 处理可能出现的错误
        console.error('复制文本失败:', err);
    });
}

function sendData() {
    let content = document.getElementById('resultInput').value;

    // 检查content是否包含至少6位数字
    if (!/\d{6,}/.test(content)) {
        alert("发布内容不能为空或不包含至少6位数字");
        return; // 如果不符合条件，终止函数执行
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://fishpond.local:3000/pubphr', true);
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