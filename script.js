
function textToArea() {
    let input = document.querySelector('input');
    let textarea = document.querySelector('textarea');
    let files = input.files;

    if (files.length == 0) return;

    const file = files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        textarea.value = lines.join('\n');
    }

    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);
};

function countWords() {
    var textareaValue = document.querySelector('textarea').value;
    var regex = /\s+/gi;
    var wordCount = textareaValue.trim().replace(regex, ' ').split(' ').length;
    var charCount = textareaValue.replace(regex, '').length;

    document.getElementById('wordCount').innerHTML = "Word Count (Whitespace Delimited): " + wordCount;
    document.getElementById('charCount').innerHTML = "Character Count (Excluding Spaces): " + charCount;
};