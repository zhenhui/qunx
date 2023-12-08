document.getElementById('parseButton').addEventListener('click', parseNumbers);
document.getElementById('submitButton').addEventListener('click', submitData);
document.getElementById('selectAll').addEventListener('change', toggleCheckboxes);

function parseNumbers() {
    let input = document.getElementById('numberInput').value;
    let parsedInput = input.replace(/[\s,]+/g, ' ').trim();
    document.getElementById('numberInput').value = parsedInput;
}

function submitData() {
    parseNumbers();
    let input = document.getElementById('numberInput').value;
    let checkboxValues = getCheckboxValues();
    postData('http://fishpond.local:3000/syncAssets', input, checkboxValues);
}

function toggleCheckboxes() {
    let selectAllChecked = document.getElementById('selectAll').checked;
    document.getElementById('bm').checked = selectAllChecked;
    document.getElementById('home').checked = selectAllChecked;
    document.getElementById('personal').checked = selectAllChecked;
}

function getCheckboxValues() {
    let values = [];
    if (document.getElementById('selectAll').checked) {
        values.push('BM', 'HOME', 'PERSON');
    } else {
        if (document.getElementById('bm').checked) values.push('BM');
        if (document.getElementById('home').checked) values.push('HOME');
        if (document.getElementById('personal').checked) values.push('PERSON');
    }
    return values.join(' ');
}

async function postData(url, input, checkboxes) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            body: `${input}\n${checkboxes}`
        });
        const data = await response.text();
        document.getElementById('resultArea').innerText = data;
        console.log('Request:', input, checkboxes);
        console.log('Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

