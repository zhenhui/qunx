// 监听处理按钮点击事件
function processInput() {
    // 获取用户输入的内容
    var input = document.getElementById('numberInput').value;
    // 使用正则表达式分割字符串，包含空格、逗号、换行
    var numbers = input.split(/[\s,，\n]+/);
    // 将结果以指定格式（例如：3806,1234）显示在页面上
    document.getElementById('result').innerText = numbers.join(',');
}