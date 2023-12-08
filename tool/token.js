document.addEventListener('DOMContentLoaded', function() {
    // 检查radio按钮的状态，并相应地显示或隐藏提交按钮
    var submitButton = document.getElementById('sendButton');
    var radios = document.querySelectorAll('input[name="query-type"]');
    radios.forEach(radio => {
        radio.onchange = function() {
            submitButton.style.display = 'block';
        };
    });
});

function handleSubmit(event) {
    event.preventDefault();
    var text = document.getElementById('paragraph').value;
    var queryType = document.querySelector('input[name="query-type"]:checked').value;
    var url = '';
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + text);

    if (queryType === 'developer-info') {
        url = 'https://graph.facebook.com/v17.0/me';
    } else if (queryType === 'authorized-account') {
        url = 'https://graph.facebook.com/v17.0/me/adaccounts?fields=name,id,account_status';
    } else if (queryType === 'token-permissions') {
        url = 'https://graph.facebook.com/v17.0/debug_token?input_token=' + text;
    } else if (queryType === 'query-bm') {
        url = 'https://graph.facebook.com/v17.0/me/businesses?fields=name,id';
    }

    fetch(url, { method: 'GET', headers: headers })
        .then(response => response.json())
        .then(data => {
            document.getElementById('info').innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('info').innerText = 'Error: ' + error;
        });
}