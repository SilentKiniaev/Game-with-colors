'use strict'

const rowSize = 4;
const startButton = document.getElementById('start-button');
let root = document.getElementById('root');
let sec = document.getElementById('sec');
let min = document.getElementById('min');
let timerID = null;
let isStart = false;
const colorsNum = 8;
const cellsList = () => document.getElementsByClassName('cell');

let start = () => {
	if(!isStart){
		timerID = setInterval(counter, 1000);
		isStart = !isStart;	
	}
};

let stop = () => {
	clearInterval(timerID);
	alert(`Ваш результат: ${min.innerText}:${sec.innerText}`);
};

let counter = () => {
	if(+sec.innerText == 59) { 
		min.innerText = (++min.innerText <= 9 ? "0": "") + min.innerText;
		sec.innerText = "00"; 
	} else {
		sec.innerText = (++sec.innerText <= 9 ? "0": "") + sec.innerText;
	}
};

const randomColor = () => {
	const cells = cellsList();
	let count = 0;
	let random;
	for(let k = 0; k < cells.length; k++){
		while(1){
			count = 0;
			random = Math.floor(Math.random() * colorsNum);
			for(let i = 0; i < k; i++) {
				if (cells[i].classList.contains("color"+random)) ++count;
			}

			if(count < 2){
				cells[k].classList.add("color"+random);
				break;
			} 
		}		
	}
};

const getColor = (cell) => {
	for(let i = 0; i < colorsNum ; i++){
		if(cell.classList.contains('color'+i)) return 'color'+i;
	}
};

const isBoardFull = () => {
	const cells = cellsList();
	for(let i = 0; i < cells.length; i++)
		if(cells[i].classList.contains('empty')) return false;
	return true;
};

const isBoardEmpty = () => {
	const cells = cellsList();
	for(let i = 0; i < cells.length; i++)
		if(!cells[i].classList.contains('empty')) return false;
	return true;
};

let prevIndex = -1;

const findColor = (index,e) => {
	if(isStart){
		const cells = cellsList();
		if(isBoardEmpty() || prevIndex == -1){//если доска пуста или предыдущий индех не назначен
			cells[index].classList.remove('empty');//Добавляем цвет ячейке
			prevIndex = index;//назнчаем предыдущий индех
			return;			
		}
		if(prevIndex === index) return;//если клик на ту же ячейку что и в последний раз
		if(getColor(cells[index]) !== getColor(cells[prevIndex])) {//если цвет прошлой ячейки и нынешней отличаются то обесвечиваем их с помощью "empty"
			cells[prevIndex].classList.add('empty');
			prevIndex = -1;//скидываем предыдущий индекс, так как обе ячейки ложны
		} else {
			cells[index].classList.remove('empty');//обе ячйеки одинаковы
			prevIndex = -1;//сброс, так как обе ячеки угаданы
		}
		if(isBoardFull()) stop();
	} else alert("Нажмите кнопку \"Старт\" для начала игры")
};

const printBoard = () => {
	root.innerHTML = "";
	let gameBoard = "<table id='game-board'>";
	for(let i = 0; i < rowSize; i++) {
		gameBoard += "<tr>";
		for(let j = 0; j < rowSize; j++) {
			gameBoard += "<td class='cell empty' onclick=findColor("+(i*rowSize+j)+",event)></td>";
		}
		gameBoard += "<tr>";
	}
	gameBoard += "</table>";	
	root.innerHTML = gameBoard;
	randomColor();
}

startButton.addEventListener('click',start);

printBoard();
