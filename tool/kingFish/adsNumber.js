// pullAdsNumber 函数
function pullAdsNumber() {
    // 使用 XMLHttpRequest 创建请求
    var xhr = new XMLHttpRequest();
    // 请求的 URL
    var url = 'http://fishpond.local:3000/syncAccount';

    // 初始化一个 post 请求
    xhr.open('POST', url, true);
    // 设置 Content-Type 为 text/plain
    xhr.setRequestHeader('Content-Type', 'text/plain');

    // 在控制台打印请求信息
    console.log('发起请求：', url);

    // 当请求完成时处理响应
    xhr.onload = function () {
        // 检查请求是否成功
        if (xhr.status >= 200 && xhr.status < 300) {
            // 打印响应结果
            console.log('请求成功，响应内容：', xhr.responseText);
            // 将响应结果放入 id 为 result 的容器中
            document.getElementById('result').textContent = xhr.responseText;
        } else {
            // 处理错误情况
            console.error('请求失败: ', xhr.statusText);
        }
    };

    // 处理网络错误
    xhr.onerror = function () {
        console.error('网络请求错误');
    };

    // 发送请求（无参数）
    xhr.send();
}