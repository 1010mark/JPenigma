const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
readline.question("" ,(hirabun) => {
const jp_letters = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", 
    "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん", "゛", "゜", "、", "。"]
const jp_letters_num = {
"あ": 0,"い": 1,"う": 2,"え": 3,"お": 4,"か": 5,
"き": 6,"く": 7,"け": 8,"こ": 9,"さ": 10,"し": 11,"す": 12,"せ": 13,"そ": 14,"た": 15,"ち": 16,"つ": 17,"て": 18,"と": 19,
"な": 20,"に": 21,"ぬ": 22,"ね": 23,"の": 24,"は": 25,"ひ": 26,"ふ": 27,"へ": 28,"ほ": 29,"ま": 30,"み": 31,
"む": 32,"め": 33,"も": 34,"や": 35,"ゆ": 36,"よ": 37,"ら": 38,"り": 39,"る": 40,"れ": 41,"ろ": 42,"わ": 43,"を": 44,"ん": 45,
"゛": 46,"゜": 47, "、":48, "。": 49
}

const plugboard = {
    "き": "い", "い": "き",
    "あ": "え", "え": "あ",
    "し": "み", "み": "し",
    "か": "ね", "ね": "か",
    "い": "と", "と": "い",
    "み": "る", "る": "み"
}
let roller1 = {...jp_letters_num};
let roller2 = {...jp_letters_num};
let roller3 = {...jp_letters_num};
let rollers = [roller1, roller2, roller3]

let rol = [];
for(i = 0; i < jp_letters.length; i++) rol.push(i);
for(i = 0; i < rollers.length; i++){
    let roller = rollers[i];
    roll = [...rol];
    for(j = 0; j < jp_letters.length; j++){
        let moji = jp_letters[j];
        let roll_index = Math.floor(Math.random() * (jp_letters.length-j));
       // console.log(roll_index,jp_letters.length,j)
        roller[moji] = roll[roll_index];
        roll.splice(roll_index,1)
    }
}
console.log(rollers)
hirabun = convert(hirabun,1).split("");
let angobun = [];
for(i = 0; i < hirabun.length; i++){
    let moji = hirabun[i];
    if(plugboard[moji]) moji = plugboard[moji];
    for(k = 0; k < 2; k++){
        for(j = 0; j < rollers.length; j++){
            roller = rollers[j];
            moji = jp_letters[roller[moji]];
            for(k = 0; k < jp_letters.length; k++){
                roller[jp_letters[k]] = 
                mod(roller[jp_letters[k]] + 1);
            }
        }
        rollers.reverse();
    }
    angobun.push(moji);
}

console.log(hirabun.join(""));
console.log(angobun.join(""));

function mod(k){ return k % jp_letters.length }


}
)


let tagstr1 = {
    "が": "か゛", "ぎ": "き゛", "ぐ": "く゛", "げ": "け゛", "ご": "こ゛",
    "ざ": "さ゛", "じ": "し゛", "ず": "す゛", "ぜ": "せ゛", "ぞ": "そ゛",
    "だ": "た゛", "ぢ": "ち゛", "づ": "つ゛", "で": "て゛", "ど": "と゛",
    "ば": "は゛", "び": "ひ゛", "ぶ": "ふ゛", "べ": "へ゛", "ぼ": "ほ゛",
    "ぱ": "は゜", "ぴ": "ひ゜", "ぷ": "ふ゜", "ぺ": "へ゜", "ぽ": "ほ゜",
};
var tagstr2 = {}; Object.keys(tagstr1).map(function (v, index, array) { return tagstr2[tagstr1[v]] = v }); // keyとvalueを逆にする
let s1 = "が|ぎ|ぐ|げ|ご|ざ|じ|ず|ぜ|ぞ|だ|ぢ|づ|で|ど|ば|び|ぶ|べ|ぼ|ぱ|ぴ|ぷ|ぺ|ぽ";
let s2 = "か゛|き゛|く゛|け゛|こ゛|さ゛|し゛|す゛|せ゛|そ゛|た゛|ち゛|つ゛|て゛|と゛|は゛|ひ゛|ふ゛|へ゛|ほ゛|は゜|ひ゜|ふ゜|へ゜|ほ゜";
 
function convert(str, options) {
    function replacer1(match, index, input) { // 「が」 → 「か゛」
        return tagstr1[match]
    }
    function replacer2(match, index, input) { // 「か゛」 → 「が」
        return tagstr2[match]
    }
    function replacer3(match, index, input) { // 「が」 → 「か゛」 , 「さ゛」 → 「ざ」
        return tagstr1[match] || tagstr2[match]
    }
    var reg, replacer;
    if (!options || options == "1") {
        reg = new RegExp(s1, "g"); replacer = replacer1;
    } else if (options == "2") {
        reg = new RegExp(s2, "g"); replacer = replacer2;
    } else if (options == "3") {
        reg = new RegExp(s1 + "|" + s2, "g"); replacer = replacer3;
    }
    str = str.replace(reg, replacer);
    return str
}
