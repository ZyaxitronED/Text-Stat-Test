
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

function Analyse() {
    var textareaValue = document.querySelector('textarea').value;
    var regex = /\s+/gi;
    var wordCount = textareaValue.trim().replace(regex, ' ').split(' ').length;
    var charCount = textareaValue.replace(regex, '').length;
    var lineCount = 0;
    var lines = textareaValue.split('\n');
    var wordArray = textareaValue.replace(regex, ' ').split(' ');
    var wordAvg = 0;
    var wordLengToNum = textareaValue.split(/\s+/).map(({length}) => length);

    for (var i = 0; i < wordCount; i++) {
        wordAvg += wordArray[i].length;
    }

    var avgLeng = wordAvg / wordCount;

    for (var i = 0; i < lines.length; i++) {
        if(lines[i].length > 0) lineCount++;
    }

    const maxChar = str => {
        const strObj = {};
        var maxCount = 0;
        var maxChar = "";

        for (let char of str) {
            strObj[char] = strObj[char] + 1 || 1;
        }

        for (let key in strObj) {
            if (strObj[key] > maxCount) {
                maxCount = strObj[key];
                maxChar = key;
            }
        }

        return maxChar;
    }

    const mode = arr => {
        const mode = {};
        var max = 0, count = 0;

        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];

            if (mode[item]) {
                mode[item]++;
            }else{
                mode[item] = 1;
            }

            if (count < mode[item]) {
                max = item;
                count = mode[item];
            }
        }

        return max;
    }

    /*function median(arr) {
     const midpoint = Math.floor(arr / 2);
     const median = arr % 2 === 1 ?
         arr[midpoint] :
         (arr[midpoint - 1] + arr[midpoint]) / 2;
     return median;
     }*/

    const median = arr => {
        const mid = Math.floor(arr.length / 2),
            nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !==0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    }

    document.getElementById('wordCount').innerHTML = "Word Count (Whitespace Delimited): " + wordCount;
    document.getElementById('charCount').innerHTML = "Character Count (Excluding Spaces): " + charCount;
    document.getElementById('lineCount').innerHTML = "Line Count (Excluding Line Breaks): " + lineCount;
    document.getElementById('meanCount').innerHTML = "Mean Letters Per Word (To 1 Decimal Place): " + avgLeng.toFixed(1);
    document.getElementById('mediCount').innerHTML = "Median of Text Area: " + median(wordLengToNum);
    document.getElementById('modeCount').innerHTML = "Mode Letters Per Word: " + mode(wordLengToNum);
    document.getElementById('commonLetter').innerHTML = "Most Common Letter: " + maxChar(textareaValue.replace(regex, ''));
};