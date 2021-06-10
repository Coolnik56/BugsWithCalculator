let symbols = [], number = [], numbers = [],historyAnswer;
const inputCalc= document.querySelector('.account'),
    resultCalc= document.querySelector('.result');
    let isOpenedBracket = 0, isOpenedModule = 0,isDot = false;
    let openBracketCounter = 0, closeBracketCounter = 0;
    let historyCounter = 0;
    let x = document.getElementById('Position');
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition);
        }     
        else
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude + "<br>We know where you are";
    }
    function Input(input){
        if(IsCharSymbol(input))
            isDot = false;
        if(input.includes('.') && isDot)
            return;
        if(input.includes('('))
            isOpenedBracket++;
        if(input.includes('|'))
            isOpenedModule++;
        inputCalc.value=inputCalc.value + input;
        if(!isNaN(Main(inputCalc.value)))
            resultCalc.value = Main(inputCalc.value);
        if(resultCalc.value == Infinity)
            getLocation();
        if(input.includes('.'))
            isDot = true;
    }
    function InputSymbol(input){
        str = inputCalc.value;
        if(str.length == 0 && input == '-'){
            inputCalc.value = inputCalc.value + input;
        }
        if(str.length != 0){
        if(!IsCharSymbol(str[str.length - 1]))
            inputCalc.value=inputCalc.value + input;
        else if(IsCharSymbol(str[str.length - 1])){
            inputCalc.value = str.substring(0, str.length - 1);
            inputCalc.value = inputCalc.value + input;
        }
        if(!isNaN(Main(inputCalc.value)))
        resultCalc.value = Main(inputCalc.value);
        }
    }
    function InputDot(){
        str = inputCalc.value;
        if(str.length == 0)
            return;
        if(!isDot && !IsCharSymbol(str[str.length - 1])){
            isDot = true;
            str += '.'
        }
        inputCalc.value = str;
    }
    function Result(){
        str = inputCalc.value;
        while(isOpenedModule % 2 != 0){
            str += '|';
            isOpenedModule++;
        }
        while(!BracketCounter(str))
        {
            str += ')';
            console.log(str);
        }
        resultCalc.value = Main(str);
        if(historyCounter == 20){
            historyCounter = 0;
            document.getElementById('history').innerHTML = '';
        }
        if(resultCalc.value != undefined && inputCalc.value != ' ' && resultCalc.value != Infinity){
            inputCalc.value = resultCalc.value;
            resultCalc.value = ' ';
            let his = document.createTextNode(historyAnswer);
            let br = document.createElement('br');
            document.getElementById('history').appendChild(his);
            document.getElementById('history').appendChild(br);
            historyCounter++;
        }
        if(resultCalc.value == Infinity)
        ClearAll();
    }
    function ClearLast(){
        let str = inputCalc.value;
        if(str[str.length - 1] == ')')
            isOpenedBracket++;
        if(str[str.length - 1] == '.')
            isDot = false;
        if(str[str.length - 1] == '|')
            isOpenedModule--;
        if(str[str.length - 1] =='(')
            isOpenedBracket++;
        if(str.length != 0){
            inputCalc.value = str.substring(0, str.length - 1);
            if(!isNaN(inputCalc.value))
                resultCalc.value = Main(inputCalc.value);
        }
    }
    function ClearAll(){
        inputCalc.value = '';
        resultCalc.value = '';
        isOpenedBracket = 0;
    }
    function IsCharNumber(thisChar){
        return thisChar >= '0' && thisChar <= '9'}
    function IsCharSymbol(thisChar){
        return thisChar === '+' || thisChar === '-' || thisChar === '*' || thisChar === '/' || thisChar === '^' || thisChar === '%';
    }
    function InputBrackets(){
        str = inputCalc.value;
        if(str[str.length - 1] == ')' && isOpenedBracket > 0){
            str += ')';
            isOpenedBracket--;
            if(BracketCounter(str) && !isNaN(Main(str))){
                inputCalc.value = str;
                resultCalc.value = Main(inputCalc.value);
            }
        }
        if(str[str.length - 1] == '('){
            str += '(';
            isOpenedBracket++;
        }
        if(isOpenedBracket > 0 && IsCharNumber(str[str.length - 1])){
            str += ')';
            isOpenedBracket--;
            if(BracketCounter(str) && !isNaN(Main(str))){
                inputCalc.value = str;
                resultCalc.value = Main(inputCalc.value);
            }
        }
        if((str.length == 0) || IsCharSymbol(str[str.length - 1])){
            str += '(';
            isOpenedBracket++;
        }
        if(IsCharNumber(str[str.length - 1]) && !isOpenedBracket){
            str += '*(';
            isOpenedBracket++;
        }
        inputCalc.value = str;
    }
    function BracketCounter(inputStr){
        openBracketCounter = 0, closeBracketCounter = 0;
        for(let i = 0; i < inputStr.length; i++){
            if(inputStr[i] == '(')
                openBracketCounter++;
            if(inputStr[i] == ')')
                closeBracketCounter++;
        }
        if(openBracketCounter == closeBracketCounter)
            return true;
        return false;
    }
    function HighPriorityEquate(inputStr){
        let triq = 0, briq = 99, ext = true;
        do {
            if (!inputStr.includes('o') && !inputStr.includes('i') && !inputStr.includes('a') && !inputStr.includes('√') && !inputStr.includes('|') ){
                ext = false;
            }
            for (let k = 0; k < inputStr.length; k++){
                if (inputStr[k] == 'o' && briq == 99){
                    briq = k;
                }
                else if(inputStr[k] == ')' && briq != 99){
                    inputStr = inputStr.replace(inputStr.slice(briq-1, k+1), Math.cos(Main(inputStr.slice(briq+3, k))));
                    console.log(inputStr);
                    briq = 99;
                }
            }
            for (let k = 0; k < inputStr.length; k++){
                if (inputStr[k] == 'i' && briq == 99){
                    briq = k;
                }
                else if(inputStr[k] == ')' && briq != 99){
                    inputStr = inputStr.replace(inputStr.slice(briq-1, k+1), Math.sin(Main(inputStr.slice(briq+3, k))));
                    console.log(inputStr);
                    briq = 99;
                }
            }
            for (let k = 0; k < inputStr.length; k++){
                if (inputStr[k] == 'a' && briq == 99){
                    briq = k;
                }
                else if(inputStr[k] == ')' && briq != 99){
                    inputStr = inputStr.replace(inputStr.slice(briq-1, k+1), Math.tan(Main(inputStr.slice(briq+3, k))));
                    console.log(inputStr);
                    briq = 99;
                }
            }
            for (let k = 0; k < inputStr.length; k++){
                if (inputStr[k] == '√' && briq == 99){
                    briq = k;
                }
                else if(inputStr[k] == ')' && briq != 99){
                    inputStr = inputStr.replace(inputStr.slice(briq, k+1), Math.sqrt(Main(inputStr.slice(briq+2, k))));
                    console.log(inputStr);
                    briq = 99;
                }
            }
            for (let k = 0; k < inputStr.length; k++){
                if (inputStr[k] == '|' && briq == 99){
                    briq = k;
                }
                else if(inputStr[k] == '|' && briq != 99){
                    inputStr = inputStr.replace(inputStr.slice(briq, k+1), Math.abs(Main(inputStr.slice(briq+1, k))));
                    console.log(inputStr);
                    briq = 99;
                }
            }
        }
        while(ext)
        return inputStr;
    }
    function FindBrackets(inputStr){
        let openBracket = 0, closeBracket = 0, exit = true;
        do{
                if (!inputStr.includes('(') ) { 
                    exit = false; 
                }
                for (let i = 0; i < inputStr.length; i++){
                    if (inputStr[i] == '(') { 
                        openBracket = i; 
                    }
                    else if (inputStr[i] == ')'){
                        closeBracket = i;
                        if (inputStr.includes('(') && inputStr.includes(')')) { 
                            inputStr = inputStr.replace(inputStr.slice(openBracket, closeBracket + 1), 
                            Main(inputStr.slice(openBracket + 1, closeBracket))); 
                        }
                        break;
                    }
                }
            }
            while (exit);
            return inputStr;
    }
    function SortSymbols(inputStr){
        let j = 0, t = 0;
        for (let i = 0; i < inputStr.length; i++) {
            if (inputStr[i] == '-' || inputStr[i] == '+' || inputStr[i] == '/' || inputStr[i] == '*' || inputStr[i] == '%' || inputStr[i] == '^' ){
                    symbols.push(inputStr[i, i]);
                    console.log('Symbols', symbols)
                    number.push(inputStr.slice(j, i));
                    console.log('Digits', number)
                j = i + 1;
                i++;
            }
            else if (inputStr[i] == '!'){
                let multiply = 1;
                t = inputStr.slice(j, i);
                for (let i =2; i<=t; i++){
                    multiply*=i;
                }
                number.push(multiply);
                symbols.push(inputStr[i+1, i+1]);
                //inputStr = inputStr.substring(0, i) + inputStr.substring(i + 1, inputStr.length)
                j = i + 2;
                i++;

            }
            else if (inputStr[i] == '=') {
                number.push(inputStr.slice(j, i));
                break; 
            }
        }
        number.forEach ( elem => numbers.push(+elem));
    }
    function PriorityEquate(inputStr)
    {
        for (let k = 0; k < symbols.length; k++){
            if (symbols[k] == '^' || symbols[k] == '%'){
                if (symbols[k] == '^')
                   numbers[k] = Math.pow(numbers[k], numbers[k+1])
                else if (symbols[k] == '%')
                    numbers[k] = numbers[k] / numbers[k + 1]*100;
                    numbers.splice(k + 1, 1);
                    symbols.splice(k, 1);
                    k--;
            }
        }

        for (let k = 0; k < symbols.length; k++){
            if (symbols[k] == '*' || symbols[k] == '/' ){
                if (symbols[k] == '*')
                    numbers[k] *= numbers[k + 1];
                else if(symbols[k] == '/')
                    numbers[k] = numbers[k] / numbers[k + 1];
                    numbers.splice(k + 1, 1);
                    symbols.splice(k, 1);
                    k--;
            }
        }
        for (let k = 0; k < symbols.length; k++){
            if (symbols[k] == '+' || symbols[k] == '-'){
                if (symbols[k] == '+')
                    numbers[k] = numbers[k] + numbers[k + 1];
                else if (symbols[k] == '-')
                    numbers[k] = numbers[k] - numbers[k + 1];
                    numbers.splice(k + 1, 1);
                    symbols.splice(k, 1);
                    k--;
            }
        }
    }
        function Main(inputStr){
            if(IsCharSymbol(inputStr[inputStr.length - 1]) || inputStr[inputStr.length - 1] == '.')
                inputStr = inputStr.substring(0, str.length - 1);
            inputStr += '=';
            if(BracketCounter(inputStr)){
            inputStr = HighPriorityEquate(inputStr);
            inputStr = FindBrackets(inputStr);
            SortSymbols(inputStr);
            PriorityEquate(inputStr);
            
            console.log(symbols)
            console.log('Answer', numbers);
            let answer = numbers[0];
            numbers = [];
            number = [];
            symbols = [];
            openBracketCounter = 0;
            closeBracketCounter = 0;
            historyAnswer = inputStr + answer;
            return answer;
            }
        }
