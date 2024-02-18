// 处理按钮点击事件的函数
function starZhuangxiu() {
    // 从id为'adsNumber'的input元素获取广告信息
    const ads = document.getElementById('adsNumber').value;

    // 从id为'pagesId'的textarea元素获取页面信息
    const pages = document.getElementById('pagesId').value;

    // 将获得的信息拼接成最终的参数字符串
    const finalData = ads + '\n' + pages.replace(/\n/g, '\n') + '\nMuse\nGames/toys\nHOME,ABOUT\n425206014324805';

    // 在控制台打印所有请求参数
    console.log('请求参数:', finalData);

    // 向指定URL发送POST请求，Content-Type为'text/plain'
    fetch('http://192.168.2.114:3000/pubphr', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: finalData
    })
    .then(response => response.text()) // 假设服务器返回纯文本响应
    .then(data => {
        console.log('成功:', data);
        // 将请求返回的信息显示在id为'result'的容器中
        document.getElementById('result').textContent = data;
    })
    .catch((error) => console.error('错误:', error));
}
