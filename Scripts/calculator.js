document.addEventListener('keydown', (event) => {
	var keyValue = event.key;
	//var codeValue = event.code;
	event.preventDefault();

	if(keyValue == "Escape"){
		clearDisplay("0");		
	} else if(keyValue == "Enter"){
		calculateResult("=");
	} else if(keyValue == "Control"){
		changeSign();
	} else if(keyValue == ","){
		takeValue(keyValue);
	} else if(keyValue == "+"){
		takeValue(keyValue);
	} else if(keyValue == "-"){
		takeValue(keyValue);
	} else if(keyValue == "*"){
		takeValue(keyValue);
	} else if(keyValue == "/"){
		takeValue(keyValue);
	} else if(keyValue >= 0 && keyValue <= 9){
		takeValue(keyValue);
	}
   
	//console.log("keyValue: " + keyValue);
	//console.log("codeValue: " + codeValue);
  }, false);

var multipleOperation = false;


function takeValue(x){
	let display = document.getElementById('calculatorDisplay');
	if(x >= 0 && x <= 9 || x == ","){
		if(x != "," && (display.innerHTML == "0" || display.innerHTML == "NaN" || ((firstNumber == 0 && operatorSign == "" && secondNumber == 0)))){
			firstNumber = x;
			display.innerHTML = "";
			display.innerHTML += x;
		} else if(display.innerHTML.length <= 9 || (display.innerHTML.length == 10 && display.innerHTML.includes(",")) ||
				 (display.innerHTML.length == 10 && display.innerHTML.includes("-"))){
			if(x == ","){
				addComa();
			} else{
				display.innerHTML += x;
			}
		}
		if(operatorSign != "" || multipleOperation == true){
			getSecondValue(x);
		}
		checkLength();
	} else{
		operatorsManagement(x);
	}
}

function operatorsManagement(operatorValue){
	removeOperatorsHighlight();
	document.getElementById(operatorValue).classList.add("highlightOperator");
	if(operatorSign == ""){
		getFirstvalue(operatorValue);
	} else if(secondNumber != 0){
		calculateResult(operatorValue);
		multipleOperation = true;
		operatorSign = operatorValue;
	} else{
		operatorSign = operatorValue;
	}
}

function getFirstvalue(keyValue){
	removeAllHighlights();
	firstNumber = document.getElementById("calculatorDisplay").innerHTML;
	operatorSign = keyValue;
	document.getElementById(keyValue).classList.add("highlightOperator");
}

function getSecondValue(keyValue){
	let display = document.getElementById('calculatorDisplay');
	if(secondNumber == 0){
		removeAllHighlights();
		if(keyValue == ","){
			display.innerHTML = "0,"
			highlightComma();
		} else{
			display.innerHTML = "";
			display.innerHTML = keyValue;
		}
		secondNumber = display.innerHTML;
	}
}

function addComa(){
	if(firstNumber == 0){
		firstNumber = "0,"
	}
	let display = document.getElementById('calculatorDisplay');
	if(display.innerHTML == 0){
		display.innerHTML = "0,"
		highlightComma();
	} else if(display.innerHTML.includes(",") == false && display.innerHTML.length < 10){
		display.innerHTML += ",";
		highlightComma();
	}
}

function changeSign(){
	let display = document.getElementById('calculatorDisplay');

	if(display.innerHTML[display.innerHTML.length-1] == ","){
		let value = display.innerHTML.slice(0, display.innerHTML.length-1)*-1
		value += ",";
		display.innerHTML = value;
	} else if(display.innerHTML.includes(",")){
		let replacedDisplay = replaceComma(display.innerHTML);
		replacedDisplay *= -1;
		let replacedDisplayBis = replaceDot(replacedDisplay.toString());
		display.innerHTML = replacedDisplayBis;
	} else{
		display.innerHTML *= -1;
	}
}

function replaceComma(valueToChange){
	let replacedValue = valueToChange.replace(",", ".");
	return replacedValue;
}

function replaceDot(valueToChange){
	let replacedValue = valueToChange.replace(".", ",");
	return replacedValue;
}

function clearDisplay(x){
	removeAllHighlights();
	cleanTemporaryVars();
	document.getElementById('calculatorDisplay').innerHTML = x;
}

function checkLength(){
	let display = document.getElementById('calculatorDisplay');
	if(
		(display.innerHTML.length == 10 && display.innerHTML.includes(",") == false && display.innerHTML.includes("-") == false) ||
	    (display.innerHTML.length == 11 && display.innerHTML.includes(",") == false && display.innerHTML.includes("-") == true) ||
	    (display.innerHTML.length == 11 && display.innerHTML.includes(",") == true && display.innerHTML.includes("-") == false) ||
		(display.innerHTML.length == 12 && display.innerHTML.includes(",") == true && display.innerHTML.includes("-") == true)
	){
		highlightComma();
		highlightNumbers();
	}
}

function highlightOperator(x){
	removeAllHighlights();
	let changeClass = x.currentTarget.classList;
	changeClass.add("highlightOperator");
}

function highlightComma(){
	document.getElementById("decimal").classList.add("disabledComa");
}

function highlightNumbers(){
	let numbers = document.getElementsByClassName("numbers");

	for(let i = 0; i < numbers.length; i++){
		numbers[i].classList.add("disabledNumbers");
	}
}

function removeOperatorsHighlight(){
	let changeClass = document.getElementsByClassName('operators');
	for(let i = 0; i < changeClass.length; i++){
		changeClass[i].classList.remove('highlightOperator');
	}
} 

function removeComaHighlight(){
	let coma = document.getElementById("decimal");
	coma.classList.remove("disabledComa")
}

function removeNumbersHighlight(){
	let changeClass = document.getElementsByClassName('numbers');
	for(let i = 0; i < changeClass.length; i++){
		changeClass[i].classList.remove('disabledNumbers');
	}
}

function removeAllHighlights(){
	removeOperatorsHighlight();
	removeComaHighlight();
	removeNumbersHighlight();
}


/* ---- Function about the backspace, but it was erased ftm ---- */
function deleteCharacter(){
	let display = document.getElementById('calculatorDisplay');
	display.innerHTML = display.innerHTML.slice(0, display.innerHTML.length-1);
	if(display.innerHTML == ""){
		display.innerHTML = "0";
	}
}


/* ----- Calculation functions ------ */

var firstNumber = 0
var operatorSign = ""
var secondNumber = 0

function calculateResult(keyValue){

	var operationResult = 0;

	secondNumber = document.getElementById('calculatorDisplay').innerHTML;

	if(operatorSign == '+'){
		operationResult = calculateSum();
	} else if(operatorSign == '-'){
		operationResult = calculateSubtraction();
	} else if(operatorSign == '*'){
		operationResult = calculateMultiplication();
	} else if(operatorSign == '/'){
		operationResult = calculateDivision();
	} else{
		if(secondNumber[secondNumber.length-1] == ","){
			document.getElementById('calculatorDisplay').innerHTML = secondNumber.slice(0, secondNumber.length-1)
		}
	}

	if(operationResult.toString().includes(",")){
		highlightComma();
	} else{
		removeComaHighlight();
	}

	firstNumber = operationResult;
	secondNumber = 0;

	if(keyValue != "="){
		multipleOperation = true;
	} else{
		cleanTemporaryVars();
		multipleOperation = false;
	}
}

function calculateSum(){
	checkCommas();
	let sum = (Math.floor((parseFloat(firstNumber) + parseFloat(secondNumber))*1000))/1000

	if(sum.toString().includes(".")){
		sum = replaceDot(sum.toString());
	}

	let error = checkResultLength(sum);

	if(error == false){
		document.getElementById('calculatorDisplay').innerHTML = sum;
	} else{
		document.getElementById('calculatorDisplay').innerHTML = "ERROR (result too long)";
		highlightComma();
		highlightNumbers();
	}
	return sum;
}

function calculateSubtraction(){
	checkCommas();
	let substraction = (Math.floor((parseFloat(firstNumber) - parseFloat(secondNumber))*1000))/1000

	if(substraction.toString().includes(".")){
		substraction = replaceDot(substraction.toString());
	}

	let error = checkResultLength(substraction);

	if(error == false){
		document.getElementById('calculatorDisplay').innerHTML = substraction;
	} else{
		document.getElementById('calculatorDisplay').innerHTML = "ERROR (result too long)";
		highlightComma();
		highlightNumbers();
	}
	return substraction;
}

function calculateMultiplication(){
	checkCommas();
	let mult = parseFloat(firstNumber) * parseFloat(secondNumber);

	if(mult.toString().includes(".")){
		mult = replaceDot(mult.toString());
	}

	let error = checkResultLength(mult);

	if(error == false){
		document.getElementById('calculatorDisplay').innerHTML = mult;
	} else{
		document.getElementById('calculatorDisplay').innerHTML = "ERROR (result too long)";
		highlightComma();
		highlightNumbers();
	}
	return mult;
}

function calculateDivision(){
	checkCommas();
	let div = parseFloat(firstNumber) / parseFloat(secondNumber);

	if(div.toString().includes(".")){
		div = replaceDot(div.toString());
	}

	//puedo hacer que dentro de check result length me checkee la long y de error o no, y ademas me lo corte si fuera necesario;

	let error = checkResultLength(div);

	if(secondNumber == 0){
		error = true;
	}

	if(error == false){
		document.getElementById('calculatorDisplay').innerHTML = div;
	} else{
		document.getElementById('calculatorDisplay').innerHTML = "ERROR (result too long)";
		highlightComma();
		highlightNumbers();
	}
	return div;
}

function cleanTemporaryVars(){
	firstNumber = 0;
	secondNumber = 0;
	operatorSign = "";
}

function checkCommas(){
	if(firstNumber.toString().includes(",")){
		firstNumber = replaceComma(firstNumber);
	}
	if(secondNumber.toString().includes(",")){
		secondNumber = replaceComma(secondNumber);
	}
}

function checkResultLength(result){
	let error = false;
	/*
	console.log(result)
	console.log(typeof(result))     //ejemplo del 84 / 4,3
	console.log(Math.abs(result))
	console.log(Math.abs(result).toString().length)
	*/

	if(Math.abs(result).toString().length <= 10 || (Math.abs(result).toString().length == 11 && result.toString().includes(","))){
		//console.log("Todo correcto makina")
	} else if(Math.abs(result).toString().length > 11 && result.toString().includes(",")){
		//console.log("A este le tienes qe cortar decimales")
	} else if (Math.abs(result).toString().length > 11 && result.toString().includes(",") == false){
		//console.log("Este num es demasiado grande")
	} else{
		//console.log("lol")
	}

	if(result.length >= 10){
		if(	(result.length == 10 && result.includes(",") == false && result.includes("-") == false) ||
			(result.length == 11 && result.includes(",") == false && result.includes("-") == true) ||
			(result.length == 11 && result.includes(",") == true && result.includes("-") == false) ||
			(result.length == 12 && result.includes(",") == true && result.includes("-") == true)				//esto se puede manejar mejoor si pones qe solo se fije en el abs, te ahorras casos del or
		){
			error = false;
		} else{
			error = true;
		}
	} 
	return error;
}