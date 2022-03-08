//localStorage.clear()
//localStorage.removeItem('noteEl');
//localStorage.removeItem('profile-name')
//localStorage.removeItem("Acessos")
//localStorage.removeItem('profile-picture')
let localStorageAcessos = localStorage.getItem("Acessos");
let acessos = localStorage.getItem("Acessos") !== null ? localStorageAcessos : 0;
const themeLocalStorage = localStorage.getItem('theme');
let theme = localStorage.getItem('theme') !== null ? themeLocalStorage : 'ligth';
acessos++
let namePerson = localStorage.getItem('profile-name') !== null ? localStorage.getItem('profile-name') : 'Profissional';
let user = localStorage.getItem('profile-picture') !== null ? localStorage.getItem('profile-picture') : '';
const profileName = document.querySelector('#profileName');
if(acessos == '1'){
	localStorage.setItem('Acessos', `${acessos}`);
	namePerson = prompt('Seu nome:');
	localStorage.setItem('profile-name', namePerson);
	const nameLocalStorage = localStorage.getItem('profile-name');
	profileName.innerText = localStorage.getItem('profile-name') !== null ? `${localStorage.getItem('profile-name')}` : 'Profissional';
}
const container = document.querySelector('.container');
const body = document.getElementsByTagName('body')[0];
const profileDiv = document.querySelector('#profileDiv');
const notePadDiv = document.querySelector('#notePadDiv');
const helpDiv = document.querySelector('#helpDiv');
const sttsDiv = document.querySelector('#sttsDiv');
const icons = document.getElementsByName('ion-icon');
const taskList = document.querySelector('#taskList');
const showMenu = document.querySelector('#showMenu');
const showPerfil = document.querySelector('#showPerfil');
const profilePicture = document.querySelector('#profilePicture');
profilePicture.src = localStorage.getItem('profile-picture') !== null || localStorage.getItem('profile-picture') !== '' ? `https://github.com/${user}.png` : './Imgs/profile-picture.jpg';
const gitPhotoForm = document.querySelector('#githubPhoto__form');
const gitHubName = document.querySelector('#githubName');
const closeProfile = document.querySelector('#closeProfile');
const form = document.querySelector('.form');
const nameTaskInput = document.querySelector('#nameTaskInput');
const moreIcon = document.querySelector('#moreIcon');
const moreInfoBttn = document.querySelector('#moreInfoBttn');
const moreInfo = document.querySelector('#formMoreInfo');
const moreInfoDate = document.querySelector('#moreInfo__date');
const materias = document.querySelector('#materias');
const menuDiv = document.querySelector('.menuDiv');
const closeMenu = document.querySelector(`#closeMenu`);
const menuIcon = document.querySelector('#menuIcon');
const filterDiv = document.querySelector('#filterDiv');
const filterIcon = document.querySelector('#filterIcon');
const filterBttn = document.querySelector('#filterBttn');
const filterMaterias = document.querySelector('#filter__materias');
const finishCheck = document.querySelector('#finishCheck');
const proxCheck = document.querySelector('#proxCheck');
const showNotePad = document.querySelector('#showNotePad');
const formNote = document.querySelector('#formNote');
const showHelp = document.querySelector('#showHelp');
const closeHelp = document.querySelector('#closeHelp');
const showStts = document.querySelector('#showSettings');
changeTheme();

const taskLocalStorage = JSON.parse(localStorage.getItem('taskEl'));
let arrayTasks = localStorage.getItem('taskEl') !== null ? taskLocalStorage : [];

const nameLocalStorage = localStorage.getItem('profile-name');
profileName.innerHTML = localStorage.getItem('profile-name') !== null ? nameLocalStorage : 'Aluno';
let htmlTasks = [];

let sortTasks = null;
let totalPendente = [];
let totalAntece = [];
let totalAtraso = [];

const noteLocalStorage = JSON.parse(localStorage.getItem('noteEl'));
let arrayNotes = localStorage.getItem('noteEl') !== null ? noteLocalStorage : [];
let htmlNote = [];

const colorTaskPendente = document.querySelector('#colorTaskPendente');
const colorTaskConcluidas = document.querySelector('#colorTaskConcluidas');
const colorTaskAtraso = document.querySelector('#colorTaskAtraso');
const colorNote = document.querySelector('#colorNotes');

let localStorageColors = JSON.parse(localStorage.getItem('colors'));
let getColors = localStorage.getItem('colors') !== null ? localStorageColors : new colorPattern();

function colorPattern(){
	this.taskC = '#008cf5';
	this.taskA = '#dc143c';
	this.taskP = '#008cf5';
	this.note = '#91a4c2';
}
let colors = {
	taskC: getColors.taskC,
	taskP: getColors.taskP,
	taskA: getColors.taskA,
	note: getColors.note,
};
updateLocalStorage();

if(arrayTasks.length > 0){
	for(let pos in arrayTasks){
		createHTMLTask(arrayTasks[pos])
	}
}

if(arrayNotes.length > 0){
	for(let pos in arrayNotes){
		createHTMLNote(arrayNotes[pos])
	}
}

if(finishCheck.checked == false){
	for(let pos in arrayTasks){
		if(arrayTasks[pos].finish == null){
			taskList.appendChild(htmlTasks[pos]);
			htmlTasks[pos].style.display = "flex";
		}else{
			taskList.appendChild(htmlTasks[pos]);
			htmlTasks[pos].style.display = "none";
		}
	}
}
showStts.addEventListener('click', ()=>{
	container.style.display = 'none';
	sttsDiv.style.display = 'flex';
	
	colorTaskAtraso.value = colors.taskA;
	colorTaskConcluidas.value = colors.taskC;
	colorTaskPendente.value = colors.taskP;
	colorNote.value = colors.note;
	
	colors.taskC = colorTaskConcluidas.value;
	colors.taskP = colorTaskPendente.value;
	colors.taskA = colorTaskAtraso.value;
	colors.note = colorNote.value;
	
	const closeStts = document.querySelector('#closeStts');
	const sttsName = document.querySelector('#sttsName');
	const ligth = document.querySelector('#ligth');
	const dark = document.querySelector('#dark');
	const deleteAll = document.querySelector('#deleteAll');
	const resetColors = document.querySelector('#resetColors');

	sttsName.value = localStorage.getItem('profile-name') !== null ? `${localStorage.getItem('profile-name')}` : 'Profissional';
	gitHubName.value = user;
	
	for(let pos in arrayTasks){
		taskList.removeChild(taskList.lastChild);
	}
	for(let pos in arrayNotes){
		noteMain.removeChild(noteMain.lastChild);
	}
	
	updateLocalStorage();
});
gitPhotoForm.addEventListener('submit', (e)=>{
	e.preventDefault();
	const applyGitPhoto = document.querySelector('#applyGitPhoto');
	applyGitPhoto.innerText = 'Aplicado';
	setTimeout(function(){
		applyGitPhoto.innerText = 'Aplicar';
	},3000)
	user = gitHubName.value;
	profilePicture.src = user != '' ? `https://github.com/${user}.png` : './Imgs/profile-picture.jpg';
	updateLocalStorage(user);
});
deleteAll.addEventListener('click', ()=>{
	let confirmDeleteAll = confirm(`Você realmente deseja excluir tudo? Todas as suas atividades e notas serão excluidas PERMANENTEMENTE!`);
	if(confirmDeleteAll === true){
		while(arrayTasks.length || arrayNotes.length){
			arrayNotes.pop();
			arrayTasks.pop();
		}
		localStorage.removeItem('taskEl');
		localStorage.removeItem('noteEl');
		localStorage.removeItem('profile-name');
		localStorage.removeItem('acessos');
		alert('Todas as suas Notas, Atividades e Informações foram permanentemente excluídas!');
		location.reload();
	}else{
		return;
	}
});
resetColors.addEventListener('click', ()=>{
	let confirmReset = confirm('Deseja resetar todas as cores para cores padrões?');
	if(confirmReset){
		colorTaskPendente.value = '#008cf5';
		colorTaskConcluidas.value = '#008cf5';
		colorTaskAtraso.value = '#dc143c';
		colorNote.value = '#91a4c2';
		colors.taskA = '#dc143c';
		colors.taskC = '#008cf5';
		colors.taskP = '#008cf5';
		colors.note = '#91a4c2';
		updateLocalStorage();
	}else{
		return;
	}
});
ligth.addEventListener('click', ()=>{
	dark.checked = false;
	theme = 'ligth';
	updateLocalStorage();
	changeTheme();
});
dark.addEventListener('click', ()=>{
	ligth.checked = false;
	theme = 'dark';
	updateLocalStorage();
	changeTheme();
});
colorTaskAtraso.addEventListener('input', ()=>{
	getColors.taskA = colorTaskAtraso.value;
	colors.taskA = colorTaskAtraso.value;
	updateLocalStorage();
});
colorTaskConcluidas.addEventListener('input', ()=>{
	getColors.taskC = colorTaskConcluidas.value;
	colors.taskC = colorTaskConcluidas.value;
	updateLocalStorage();
});
colorTaskPendente.addEventListener('input', ()=>{
	getColors.taskP = colorTaskPendente.value;
	colors.taskP = colorTaskPendente.value;
	updateLocalStorage();
});
colorNote.addEventListener('input', ()=>{
	getColors.note = colorNote.value;
	colors.note = colorNote.value;
	updateLocalStorage();
});
closeStts.addEventListener('click', ()=>{
	for(let pos in arrayTasks){
		createHTMLTask(arrayTasks[pos]);
	}
	verifiFinish();
	verifiMaterias();
	for(let pos in arrayNotes){
		createHTMLNote(arrayNotes[pos]);
	}
	menuDiv.classList.remove('menuDivOpen');
	menuDiv.classList.add('menuDiv');
	container.style.display = 'flex';
	sttsDiv.style.display = 'none';
	profileName.innerHTML = sttsName.value;
	namePerson = sttsName.value
	
	updateLocalStorage();
});
showHelp.addEventListener('click', ()=>{
	container.style.display = 'none';
	helpDiv.style.display = 'flex'
	body.style.padding = '0';
});
closeHelp.addEventListener('click', ()=>{
	menuDiv.classList.remove('menuDivOpen');
	menuDiv.classList.add('menuDiv');
	container.style.display = 'flex';
	helpDiv.style.display = 'none'
	//body.style.padding = '120px';
});

showPerfil.addEventListener('click', ()=>{
	const totalNotes = document.querySelector('#totalNotes');
	const totalTaskInput = document.querySelector('#totalTasks');
	const totalPendenteInput = document.querySelector('#totalPendente');
	const totalAtrasoInput = document.querySelector('#totalAtraso');
	const totalAnteceInput = document.querySelector('#totalAntecedencia');
	const pendenteBttn = document.querySelector('#pendenteBttn');
	const antecedenciaBttn = document.querySelector('#antecedenciaBttn');
	const atrasoBttn = document.querySelector('#atrasoBttn');
	const estatisticaTaskList = document.querySelector('#estatisticaTaskList');
	
	profileDiv.style.display = 'flex';
	container.style.display = 'none';
	if(arrayTasks.length > 0){
		totalPendente = arrayTasks.filter(item=>
		item.finish === null);
		totalAntece = arrayTasks.filter(item=>
		item.diferenca > 0 && item.finish !== null);
		totalAtraso = arrayTasks.filter(item=>
		item.diferenca < 0 && item.finish !== null);
	}
	totalNotes.value = arrayNotes.length;
	totalTaskInput.value = arrayTasks.length;
	totalPendenteInput.value = totalPendente.length;
	totalAnteceInput.value = totalAntece.length;
	totalAtrasoInput.value = totalAtraso.length;
});

closeProfile.addEventListener('click', ()=>{
	menuDiv.classList.remove('menuDivOpen');
	menuDiv.classList.add('menuDiv');
	container.style.display = 'flex';
	profileDiv.style.display = 'none';
	atrasoBttn.style.color = '#000';
	antecedenciaBttn.style.color = '#000';
	while(estatisticaTaskList.childElementCount){
		estatisticaTaskList.removeChild(estatisticaTaskList.lastChild)
	}
});
pendenteBttn.addEventListener('click', ()=>{
	pendenteBttn.style.color = 'var(--blue)';
	if(theme === 'ligth'){
		atrasoBttn.style.color = '#000';
		antecedenciaBttn.style.color = '#000';
	}else{
		atrasoBttn.style.color = '#fff';
		antecedenciaBttn.style.color = '#fff';
	}
	while(estatisticaTaskList.childElementCount){
		estatisticaTaskList.removeChild(estatisticaTaskList.lastChild)
	}
	for(let pos in totalPendente){
		createHTMLTask(totalPendente[pos]);
	}
});

antecedenciaBttn.addEventListener('click', ()=>{
	antecedenciaBttn.style.color = 'var(--blue)';
	if(theme === 'ligth'){
		atrasoBttn.style.color = '#000';
		pendenteBttn.style.color = '#000';
	}else{
		atrasoBttn.style.color = '#fff';
		pendenteBttn.style.color = '#fff';
	}
	while(estatisticaTaskList.childElementCount){
		estatisticaTaskList.removeChild(estatisticaTaskList.lastChild)
	}
	for(let pos in totalAntece){
		createHTMLTask(totalAntece[pos]);
	}
});

atrasoBttn.addEventListener('click', ()=>{
	atrasoBttn.style.color = 'var(--blue)';
	if(theme === 'ligth'){
		antecedenciaBttn.style.color = '#000';
		pendenteBttn.style.color = '#000';
	}else{
		antecedenciaBttn.style.color = '#fff';
		pendenteBttn.style.color = '#fff';
	}
	while(estatisticaTaskList.childElementCount){
		estatisticaTaskList.removeChild(estatisticaTaskList.lastChild)
	}
	for(let pos in totalAtraso){
		createHTMLTask(totalAtraso[pos]);
	}
});

moreInfoBttn.addEventListener('click', ()=>{
	if(moreIcon.name == 'add'){
		moreIcon.name = 'close';
		moreInfo.style.display = 'flex';
	}else if(moreIcon.name == 'close'){
		moreIcon.name = 'add';
		moreInfo.style.display = 'none';
		taskList.style.paddingTop = '0';
	}
});
filterBttn.addEventListener('click', ()=>{
	if(filterIcon.name == 'filter'){
		filterIcon.name = 'close';
		menuIcon.name = 'menu';
		menuDiv.classList.remove('menuDivOpen');
		menuDiv.classList.add('menuDiv');
		filterDiv.style.display = 'flex';
	}else if(filterIcon.name = 'close'){
		filterIcon.name = 'filter';
		filterDiv.style.display = 'none';
	}else{
		return;
	}
});
showMenu.addEventListener('click', ()=>{
	menuDiv.classList.remove('menuDiv');
	menuDiv.classList.add('menuDivOpen');
});
closeMenu.addEventListener('click', ()=>{
	menuDiv.classList.remove('menuDivOpen');
	menuDiv.classList.add('menuDiv');
});

filterMaterias.addEventListener('input', verifiMaterias);
function verifiMaterias(){
	while(taskList.childElementCount != 0){
		taskList.removeChild(taskList.lastChild)
	}
	proxCheck.checked = false;
	if(filterMaterias.value != 'All'
	&& arrayTasks.length > 0 && finishCheck.checked == true){
		for(let pos in arrayTasks){
			if(arrayTasks[pos].materia == filterMaterias.value
			&& arrayTasks[pos].finish !== null){
				createHTMLTask(arrayTasks[pos]);
			}else{
				continue;
			}
		}
	}else if(filterMaterias.value != 'All'
	&& arrayTasks.length > 0 && finishCheck.checked == false){
		for(let pos in arrayTasks){
			if(arrayTasks[pos].materia == filterMaterias.value
			&& arrayTasks[pos].finish === null){
				createHTMLTask(arrayTasks[pos]);
			}else{
				continue;
			}
		}
	}
	
	else if (filterMaterias.value == 'All'
	&& arrayTasks.length > 0 && finishCheck.checked == true){
		for(let pos in arrayTasks){
			taskList.appendChild(createHTMLTask(arrayTasks[pos]));
			if(arrayTasks[pos].finish == true){
				taskList.appendChild(createHTMLTask(arrayTasks[pos]));
			}else{
				continue;
			}
		}
	}else if (filterMaterias.value == 'All'
	&& arrayTasks.length > 0 && finishCheck.checked == false){
		for(let pos in arrayTasks){
			if(arrayTasks[pos].finish == null){
				createHTMLTask(arrayTasks[pos]);
			}else{
				continue;
			}
		}
	}else{
		return;
	}
};
finishCheck.addEventListener('click', verifiFinish);
function verifiFinish(){
	while(taskList.childElementCount != 0){
		taskList.removeChild(taskList.lastChild)
	}
	if(finishCheck.checked == true){
		for(let pos in arrayTasks){
			if(filterMaterias.value == 'All' 
			&& arrayTasks[pos].finish == true){
				createHTMLTask(arrayTasks[pos]);
			}else if(arrayTasks[pos].materia == filterMaterias.value
			&& arrayTasks[pos].finish == true){
				createHTMLTask(arrayTasks[pos]);
			}else{
				continue;
			}
		}
	}
	if(finishCheck.checked == false){
		if(proxCheck.checked){
			verifiProx();
		}
		for(let pos in arrayTasks){
			if(filterMaterias.value == 'All' 
			&& arrayTasks[pos].finish === null){
				createHTMLTask(arrayTasks[pos]);
			}else if(arrayTasks[pos].materia == filterMaterias.value
			&& arrayTasks[pos].finish === null){
				createHTMLTask(arrayTasks[pos]);
			}else{
				continue;
			}
		}
	}
};

proxCheck.addEventListener('click', verifiProx);
function verifiProx(){
	if(proxCheck.checked == true){
		sortTasks = arrayTasks.filter(item=>
		item.diferenca !== null && item.finish === null);
		sortTasks = sortTasks.sort((a, b)=>{
		if(a.diferenca < b.diferenca){
			return -1;
		}else{
			return true;
		}
		});
		while(taskList.childElementCount){
			taskList.removeChild(taskList.lastChild);
		}
		for(let pos in sortTasks){
			createHTMLTask(sortTasks[pos]);
		}
	}else{
		while(sortTasks.length > 0){
			taskList.removeChild(taskList.lastChild);
			sortTasks.pop();
		}
		verifiMaterias();
		verifiFinish();
	}
};

function updateLocalStorage(){
	localStorage.setItem('taskEl', JSON.stringify(arrayTasks));
	localStorage.setItem('noteEl', JSON.stringify(arrayNotes));
	localStorage.setItem('profile-name', namePerson);
	localStorage.setItem('theme', theme);
	localStorage.setItem('colors', JSON.stringify(colors));
	localStorage.setItem('profile-picture', user);
}

form.addEventListener('submit', (e)=>{
	e.preventDefault();
	let nameTask = nameTaskInput.value;
	let prazoTask = moreInfoDate.value;
	let materiaTask = materias.value;
	
	let objTask = new createObjTask(nameTask, prazoTask, materiaTask);
	
	arrayTasks.push(objTask);
	updateLocalStorage();
	
	createHTMLTask(objTask);
	nameTaskInput.value = '';
	moreInfoDate.value = '';
	materias.value = '';
});
function createObjTask(nameTask, prazoTask, materiaTask){
	this.name = nameTask;
	this.prazo = prazoTask;
	this.materia = materiaTask;
	this.finish = null;
	this.dateFinish = 'Concluir';
	this.diferenca = calcDiff();
	
	function calcDiff(){
		let dtNow = new Date();
		let end = new Date(`${moreInfoDate.value} 00:00:00`);
		
		let diff = (end - dtNow) / 1000;
		let days = Math.round(diff / 60 / 60 / 24);
		return days;
	}
}
function createHTMLTask(taskPos){
	const divTask = document.createElement('div');
	divTask.classList.add(`task`);
	
	const divName = document.createElement('div');
	
	const inputName = document.createElement('input');
	inputName.type = 'text';
	inputName.classList.add('task__name');
	inputName.value = taskPos.name;
	inputName.setAttribute('readonly', 'readonly');
	if(taskPos.finish !== null){
		inputName.style.textDecoration = 'line-through';
	}else{
		inputName.style.textDecoration = '';
	}
	const editBttn = document.createElement('button');
	editBttn.classList.add('editBttn');
	editBttn.style.backgroundColor = colors.taskP;
	editBttn.innerText = 'Edit';
	inputName.style.color = editBttn.style.backgroundColor;
	
	const div = document.createElement('div');
	
	const label = document.createElement('label');
	label.for = 'task__prazo';
	label.innerText = 'Prazo';
	
	const inputPrazo = document.createElement('input');
	inputPrazo.type = 'date';
	inputPrazo.classList.add('task__prazo');
	inputPrazo.value = taskPos.prazo;
	inputPrazo.setAttribute(`readonly`, 'readonly')
	
	const taskBttn = document.createElement('div');
	taskBttn.classList.add('taskBttn');
	
	const finishBttn = document.createElement('button');
	finishBttn.classList.add('finishBttn');
	finishBttn.style.backgroundColor = colors.taskP;
	finishBttn.innerText = `${taskPos.dateFinish}`;
	if(profileDiv.style.display == 'flex'){
		finishBttn.setAttribute('disabled', 'disabled');
	}
	
	const trashBttn = document.createElement('button');
	trashBttn.classList.add('trashBttn');
	trashBttn.innerHTML = 'Apagar';
	taskBttn.appendChild(finishBttn);
	taskBttn.appendChild(trashBttn);
	div.appendChild(label);
	div.appendChild(inputPrazo);
	divName.appendChild(inputName);
	divName.appendChild(editBttn);
	divTask.appendChild(divName);
	divTask.appendChild(div);
	divTask.appendChild(taskBttn);
	
	if(taskPos.diferenca != -1 
	&& taskPos.diferenca < 0){
		inputName.style.color = colors.taskA;
		finishBttn.style.backgroundColor = colors.taskA;
		editBttn.style.backgroundColor = colors.taskA;
		finishBttn.innerText = `Atraso de ${(-taskPos.diferenca)} dias!`;
	}
	if(taskPos.finish !== null){
		finishBttn.innerText = taskPos.dateFinish;
		finishBttn.style.backgroundColor = colors.taskC;
		editBttn.style.backgroundColor = colors.taskC;
		inputName.style.color = colors.taskC;
	}
	
	if(taskPos.materia == filterMaterias.value
	|| filterMaterias.value == 'All' || profileDiv.style.display != 'flex'){
		taskList.appendChild(divTask);
	}
	if(profileDiv.style.display != 'flex'){
		htmlTasks.push(divTask);
	}else{
		estatisticaTaskList.appendChild(divTask)
	}
	
	trashBttn.addEventListener('click', ()=>{
		if(profileDiv.style.display != 'flex'){
			let deleteObj = htmlTasks.indexOf(divTask);
			htmlTasks.splice(deleteObj, 1);
			arrayTasks.splice(deleteObj, 1);
			taskList.removeChild(divTask);
		}else{
			if(atrasoBttn.style.color != 'var(--blue)'){
				let deleteObj = totalAntece.indexOf(divTask);
				arrayTasks.splice(deleteObj, 1);
				totalAntece.splice(deleteObj, 1);
				estatisticaTaskList.removeChild(divTask);
			}else if(atrasoBttn.style.color == 'var(--blue)'){
				let deleteObj = totalAtraso.indexOf(divTask);
				arrayTasks.splice(deleteObj, 1);
				totalAtraso.splice(deleteObj, 1);
				estatisticaTaskList.removeChild(divTask);
			}
			totalTaskInput.value = `${arrayTasks.length}`;
			totalAnteceInput.value = `${totalAntece.length}`;
			totalAtrasoInput.value = `${totalAtraso.length}`;
		}
		updateLocalStorage();
	});
	finishBttn.addEventListener('click', ()=>{
		inputName.style.textDecoration = 'line-through';
		let now = new Date();
		let day = now.getDate();
		let month = now.getMonth() +1;
		let year = now.getFullYear();
		taskPos.finish = true;
		if(finishBttn.disabled != 'disabled'){
			if(finishBttn.style.backgroundColor == '#dc143c'){
				taskPos.dateFinish = `Concluído com atraso em ${day}/${month}/${year}`;
				finishBttn.innerText = `${taskPos.dateFinish}`;
			}else{
				taskPos.dateFinish = `Concluído em ${day}/${month}/${year}`;
				finishBttn.innerText = `${taskPos.dateFinish}`;
			}
			finishBttn.setAttribute('disabled', 'disabled');
			taskList.removeChild(divTask);
			updateLocalStorage();
		}else{
			return;
		}
	});
	editBttn.addEventListener('click', ()=>{
		let now = new Date();
		let day = now.getDate();
		let month = now.getMonth() +1;
		let year = now.getFullYear();
		if(editBttn.innerText == 'Edit'){
			editBttn.innerText = 'Save';
			inputName.removeAttribute('readonly');
			inputPrazo.removeAttribute('readonly');
		}else{
			editBttn.innerText = 'Edit';
			inputName.setAttribute('readonly', 'readonly');
			inputPrazo.setAttribute(`readonly`, 'readonly');
			taskPos.name = inputName.value;
			taskPos.prazo = inputPrazo.value;
			taskPos.diferenca = newCalcDiff();
			function newCalcDiff(){
				let dtNow = new Date();
				let end = new Date(`${inputPrazo.value} 00:00:00`);
				
				let diff = (end - dtNow) / 1000;
				let days = Math.round(diff / 60 / 60 / 24);
				return days;
			}
			if(taskPos.finish !== null && taskPos.diferenca >= 0){
				inputName.style.color = colors.taskC;
				finishBttn.style.backgroundColor = colors.taskC;
				editBttn.style.backgroundColor = colors.taskC;
				taskPos.dateFinish = `Concluído em ${day}/${month}/${year}`;
				finishBttn.innerText = `${taskPos.dateFinish}`;
			}else if(taskPos.finish !== null && taskPos.diferenca < 0){
				inputName.style.color = colors.taskA;
				finishBttn.style.backgroundColor = colors.taskA;
				editBttn.style.backgroundColor = colors.taskA;
				finishBttn.innerText = `Concluído com atraso de ${(-taskPos.diferenca)} dias!`;
			}else if(taskPos.finish === null && taskPos.diferenca < 0){
				inputName.style.color = colors.taskA;
				finishBttn.style.backgroundColor = colors.taskA;
				editBttn.style.backgroundColor = colors.taskA;
				finishBttn.innerText = `Atraso de ${(-taskPos.diferenca)} dias!`;
			}else if(taskPos.finish === null && taskPos.diferenca >= 0){
				inputName.style.color = colors.taskP;
				finishBttn.style.backgroundColor = colors.taskP;
				editBttn.style.backgroundColor = colors.taskP;
				finishBttn.innerText = `Concluir`;
			}
		};
		updateLocalStorage();
	});
	updateLocalStorage();
}

const infoDiv = document.querySelector('.infoDiv');
const nameInfo = document.querySelector('#noteNameInfo');
const createInfo = document.querySelector('#noteCreateInfo');
const lastAcessInfo = document.querySelector('#noteLastAcessInfo');

showNotePad.addEventListener('click', ()=>{
	
	const title = document.querySelector('#titleNotePad');
	const noteOpen = document.querySelector('#noteOpen');
	const notePadHeader = document.querySelector('#notePadHeader');
	const searchNote = document.querySelector('#searchNote');
	const menuNotePad = document.querySelector('#menuNotePad');
	const addNoteBttn = document.querySelector('#addNoteBttn');
	const closeNotePad = document.querySelector('#closeNotePad');
	const newNote = document.querySelector('#newNote');
	const newNoteInput = document.querySelector('#newNoteInput');
	const newNoteCancel = document.querySelector('#newNoteCancel');
	const newNoteOk = document.querySelector('#neeNoteCancel');
	const closeNote = document.querySelector('#closeNote');
	const trashNote = document.querySelector('#trashNote');
	const infoNote = document.querySelector('#infoNote');
	const nameNoteOpen = document.querySelector('#nameNoteOpen');
	const infoDiv = document.querySelector('#infoDiv');
	const nameInfo = document.querySelector('#noteNameInfo');
	const createInfo = document.querySelector('#noteCreateInfo');
	const lastAcessInfo = document.querySelector('#noteLastAcessInfo');
	
	menuIcon.name = 'menu';
	notePadHeader.style.width = `${notePadDiv.style.width}`;
	body.style.paddingTop = '80px';
	notePadDiv.style.display = 'flex';
	container.style.display = 'none';
	addNoteBttn.style.backgroundColor = colors.note;
	
});
searchNote.addEventListener('input', ()=>{
	if(searchNote.value != ''){
		let searchNotesArray = arrayNotes.filter(item => 
		item.name.toUpperCase()
		.indexOf(`${searchNote.value.toUpperCase()}`) != -1);
		
		while(noteMain.childElementCount != 0){
			noteMain.removeChild(noteMain.lastChild)
		}
		for(let pos in searchNotesArray){
			createHTMLNote(searchNotesArray[pos]);
		}
	}else{
		while(noteMain.childElementCount != 0){
			noteMain.removeChild(noteMain.lastChild)
		}
		
		for(let pos in arrayNotes){
			createHTMLNote(arrayNotes[pos]);
		}
	}
});
addNoteBttn.addEventListener('click', ()=>{
	newNote.style.display = 'flex';
});
newNoteCancel.addEventListener('click', ()=>{
	newNote.style.display = 'none';
	newNoteInput.value = '';
});
closeNotePad.addEventListener('click', ()=>{
	menuDiv.classList.remove('menuDivOpen');
	menuDiv.classList.add('menuDiv');
	body.style.paddingTop = '0';
	notePadDiv.style.display = 'none';
	container.style.display = 'flex';
	newNote.style.display = 'none';
});
formNote.addEventListener('submit', (e)=>{
	e.preventDefault();
	
	let noteName = newNoteInput.value;
	
	newNote.style.display = 'none';
	newNoteInput.value = '';
	
	let objNote = new createObjNote(noteName);
	
	arrayNotes.push(objNote)
	updateLocalStorage();
	
	createHTMLNote(objNote)
	
	newNoteInput.value = '';
});

function createObjNote(noteName){
	this.name = noteName;
	this.text = null;
	this.createDt = dtNote();
	this.lastAcess = null;
}
function dtNote(){
	let now = new Date();
	let day = now.getDate();
	let month = now.getMonth();
	let year = now.getFullYear();
	let hour = now.getHours();
	let minutes = now.getMinutes();
	if(minutes < 10){
		minutes = `0${minutes}`;
	}
	
	const monthArray = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
	'Julho', 'Agosto', 'Setembro', ''];
	
	let dt = `${day} de ${monthArray[month]} de ${year} às ${hour}:${minutes}`;
	
	return dt;
}
function createHTMLNote(notePos){

	const div = document.createElement('div');
	div.classList.add('note');
	
	const noteHeader = document.createElement('header');
	noteHeader.classList.add('noteHeader');
	const closeNote = document.createElement('button');
	closeNote.innerHTML = '<ion-icon name="close"></ion-icon>';
	const divBttn = document.createElement('div');
	const trashNote = document.createElement('button');
	trashNote.innerHTML = '<ion-icon name="trash-outline">';
	const infoNote = document.createElement('button');
	infoNote.innerHTML = '<ion-icon name="information-circle-outline"></ion-icon>';
	const editNote = document.createElement('button');
	editNote.classList.add('editNote');
	editNote.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
	editNote.style.backgroundColor = colors.note;
	
	const showText = document.createElement('div');
	showText.classList.add('showTextNote')
	const p = document.createElement('div');
	const textarea = document.createElement('textarea');
	textarea.classList.add('conteudoNote');
	textarea.setAttribute('readonly', 'readonly');
	textarea.value = notePos.text;
	p.innerHTML = textarea.value;
	const nameDiv = document.createElement('div');
	nameDiv.innerHTML = '<ion-icon name="document-text-outline"></ion-icon>';
	nameDiv.classList.add('nameNoteDiv');
	const nameInput = document.createElement('input');
	nameInput.classList.add('nameNote');
	nameInput.setAttribute('readonly', 'readonly');
	if(notePos.name != ''){
		nameInput.value = notePos.name;
	}else{
		notePos.name = 'Documento sem nome';
		nameInput.value = notePos.name;
	}
	noteHeader.appendChild(closeNote);
	divBttn.appendChild(trashNote);
	divBttn.appendChild(infoNote);
	noteHeader.appendChild(divBttn);
	nameDiv.appendChild(nameInput);
	div.appendChild(noteHeader);
	div.appendChild(textarea);
	showText.appendChild(p);
	div.appendChild(showText);
	div.appendChild(editNote);
	div.appendChild(nameDiv);
	div.style.borderColor = colors.note;
	nameDiv.style.backgroundColor = colors.note;
	htmlNote.push(div);
	
	noteMain.appendChild(div);
	
	updateLocalStorage();
	
	showText.addEventListener('click', ()=>{
		showText.style.display = 'flex';
		textarea.style.display = 'none';
		p.innerHTML = textarea.value;
		notePadHeader.style.display = 'none';
		div.classList.remove('note');
		div.classList.add('noteOpen');
		noteHeader.classList.remove('noteHeader');
		noteHeader.classList.add('noteHeaderOpen');
		noteHeader.style.borderColor = colors.note;
		body.style.padding = '0';
		notePos.lastAcess = dtNote();
		
		nameInput.value = notePos.name;
		noteHeader.appendChild(closeNote);
		noteHeader.appendChild(nameInput);
		noteHeader.appendChild(divBttn);
		div.appendChild(noteHeader);
		nameDiv.style.display = 'none';
		div.append(textarea);
		div.appendChild(showText);
		div.appendChild(editNote);
	});
	closeNote.addEventListener('click', ()=>{
		p.innerHTML = textarea.value;
		showText.style.display = 'flex';
		textarea.style.display = 'none';
		infoDiv.classList.remove('infoDivOpen');
		infoDiv.classList.add('infoDiv');
		infoNote.innerHTML = '<ion-icon name="information-circle-outline"></ion-icon>';
		notePadHeader.style.display = 'flex';
		div.classList.remove('noteOpen');
		div.classList.add('note');
		noteHeader.classList.remove('noteHeaderOpen');
		noteHeader.classList.add('noteHeader');
		nameDiv.style.display = 'flex';
		body.style.paddingTop = '80px';
		textarea.setAttribute('readonly', 'readonly');
		editNote.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
		
		noteHeader.appendChild(closeNote);
		divBttn.appendChild(trashNote);
		divBttn.appendChild(infoNote);
		noteHeader.appendChild(divBttn);
		nameDiv.appendChild(nameInput);
		div.appendChild(noteHeader);
		div.append(textarea);
		div.appendChild(showText);
		div.appendChild(editNote);
		div.appendChild(nameDiv);
	});
	trashNote.addEventListener('click', ()=>{
		let confirmDelete;
		if(notePos.name == ''){
			confirmDelete = confirm(`Você deseja deletar esta nota?`)
		}else{
			confirmDelete =  confirm(`Você deseja deletar "${notePos.name}"?`)
		}
		if(confirmDelete){
			let objDelete = arrayNotes.indexOf(notePos);
			arrayNotes.splice(objDelete, 1);
			noteMain.removeChild(div);
			body.style.paddingTop = '80px';
			notePadHeader.style.display = 'flex';
			infoDiv.classList.remove('infoDivOpen');
			infoDiv.classList.add('infoDiv');
			updateLocalStorage();
		}else{
			return;
		}
	});
	editNote.addEventListener('click', ()=>{
		if(editNote.classList == 'editNote'){
			showText.style.display = 'none';
			textarea.style.display = 'flex';
			textarea.removeAttribute('readonly');
			textarea.style.fontSize = '0.8em>';
			editNote.innerHTML = '<ion-icon name="save-outline"></ion-icon>';
			editNote.classList.remove('editNote');
			editNote.classList.add('saveNote');
			nameInput.removeAttribute('readonly');
		}else if(editNote.classList == 'saveNote'){
			showText.style.display = 'flex';
			textarea.style.display = 'none';
			// 	alert(textarea.value.split(" "))
			p.innerHTML = textarea.value;
			textarea.setAttribute('readonly', 'readonly');
			editNote.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
			editNote.classList.remove('saveNote');
			editNote.classList.add('editNote');
			nameInput.setAttribute('readonly', 'readonly');
			notePos.text = textarea.value;
			notePos.name = nameInput.value;
			updateLocalStorage();
		}else{
			return;
		}
		updateLocalStorage();
	});
	nameInput.addEventListener('input', ()=>{
		notePos.name = nameInput.value;
		updateLocalStorage();
	});
	textarea.addEventListener('input', ()=>{
		notePos.text = textarea.value;
		p.innerHTML = textarea.value;
		updateLocalStorage();
	});
	textarea.addEventListener('keydown', (e)=>{
		if(e.key == `Enter`){
			textarea.value += '<br>';
		}else{
			return;
		}
	});
	nameInput.addEventListener('input',()=>{
		if(nameInput.value != ''){
			nameInfo.value = nameInput.value;
		}else{
			nameInfo.value = 'Documento sem nome';
		}
	});
	infoNote.addEventListener('click', ()=>{
		if(infoDiv.classList == 'infoDiv'){
			infoDiv.classList.remove('infoDiv');
			infoDiv.classList.add('infoDivOpen');
			if(notePos.name != ''){
				nameInfo.value = notePos.name;
			}else{
				nameInfo.value = 'Documento sem nome';
			}
			createInfo.value = notePos.createDt;
			lastAcessInfo.value = notePos.lastAcess;
			infoNote.innerHTML = '<ion-icon name="close"></ion-icon>';
		}else if(infoDiv.classList == 'infoDivOpen'){
			infoDiv.classList.remove('infoDivOpen');
			infoDiv.classList.add('infoDiv');
			nameInfo.value = '';
			createInfo.value = '';
			lastAcessInfo.value = '';
			infoNote.innerHTML = '<ion-icon name="information-circle-outline"></ion-icon>';
		}else{
			return;
		}
	});
	updateLocalStorage();
}
function changeTheme(){
	if(theme === 'dark'){
		ligth.checked = false;
		dark.checked = true;
		body.style.color = '#fff';
		body.style.backgroundColor = 'rgba(0,0,0,0.9)';
		/*Task List*/
		taskList.style.backgroundColor = 'rgba(0,0,0,0.9)';
		container.style.backgroundColor = 'rgba(0,0,0,0.9)';
		menuIcon.style.color = '#fff';
		filterIcon.style.color = '#fff';
		/*Filter*/
		filterDiv.style.backgroundColor = 'rgba(0,0,0,0.9)';
		filterDiv.style.color = '#fff';
		/*Menu*/
		menuDiv.style.backgroundColor = 'rgba(0,0,0,0.9)';
		menuDiv.style.color = '#fff';
		showPerfil.style.color = '#fff';
		showNotePad.style.color = '#fff';
		showHelp.style.color = '#fff';
		showStts.style.color = '#fff';
		closeMenu.style.color = '#fff';
		/*Note Pad*/
		searchNote.style.backgroundColor = 'rgba(208,208,208,0.7)';
		searchNote.style.color = '#fff';
		searchNote.style.border = 'none';
		closeNotePad.style.color = '#fff';
		notePadHeader.style.backgroundColor = 'rgba(0,0,0,0.9)';
		menuNotePad.style.color = '#fff';
		title.style.color = '#fff';
		newNote.style.backgroundColor = 'rgba(0,0,0,0.9)';
		formNote.style.color = '#fff';
		/*Profile*/
		closeProfile.style.color = '#fff';
		antecedenciaBttn.style.color = '#fff';
		atrasoBttn.style.color = '#fff';
		pendenteBttn.style.color = '#fff';
		/**/
		closeHelp.style.color = '#fff';
		closeStts.style.color = '#fff';
	}else if(theme === 'ligth'){
		ligth.checked = true;
		dark.checked = false;
		body.style.color = '#000';
		body.style.backgroundColor = '#fff';
		/*Task List*/
		taskList.style.backgroundColor = '#fff';
		container.style.backgroundColor = '#fff';
		menuIcon.style.color = '#000';
		filterIcon.style.color = '#000';
		/*Filter*/
		filterDiv.style.backgroundColor = '#fff';
		filterDiv.style.color = '#000';;
		/*Menu*/
		menuDiv.style.backgroundColor = '#fff';
		menuDiv.style.color = '#000';;
		showPerfil.style.color = '#000';;
		showNotePad.style.color = '#000';;
		showHelp.style.color = '#000';;
		showStts.style.color = '#000';;
		closeMenu.style.color = '#000';;
		/*Note Pad*/
		closeNotePad.style.color = '#000';;
		notePadHeader.style.backgroundColor = '#fff';
		menuNotePad.style.color = '#000';;
		title.style.color = '#000';
		newNote.style.backgroundColor = '#fff';
		formNote.style.color = '#000';
		/*Profile*/
		closeProfile.style.color = '#000';;
		antecedenciaBttn.style.color = '#000';;
		atrasoBttn.style.color = '#000';;
		pendenteBttn.style.color = '#000';;
		/**/
		closeHelp.style.color = '#000';;
		closeStts.style.color = '#000';;
	}else{
		return;
	}
}
//});
//});