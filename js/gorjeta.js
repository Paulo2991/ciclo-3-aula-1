const myForm = document.getElementById('myForm');
const submitBtn = document.getElementById('submitBtn');
const resultModal = document.getElementById('resultModal');
const resultado = document.getElementById('resultado');
const closeButtons = document.querySelectorAll('.close');
const mensagemErro = document.getElementById('mensagemErro');

function isNumeric(value) {
	return /^-?\d*\.?\d+$/.test(value);
}

submitBtn.addEventListener('click',function(){
	let camposObrigatorios = '';
	const inputs = document.querySelectorAll('input[required]');
	inputs.forEach(input => {
		if (!input.checkValidity()) {
			camposObrigatorios += `O campo ${input.name} é obrigatório.<br>`;
		}else if(input.value <= 0){
			camposObrigatorios += `O ${input.name} deve ser maior que 0. <br>`;
		}else if(!isNumeric(input.value.trim())){
			camposObrigatorios += `O ${input.name} é númerico. <br>`;
		}else{
			mensagemErro.innerHTML = '';
		}
	});

	if (camposObrigatorios === '') {
		const valorGorjeta = document.getElementById('valorGorjeta').value;
		resultado.innerHTML = `A gorjeta é: ${valorGorjeta}`;
		resultModal.style.display = 'block';
	} else {
		mensagemErro.innerHTML = camposObrigatorios;
	}	
});

closeButtons.forEach(function (button){
	button.addEventListener('click', function(){
		resultModal.style.display = 'none';
	});
});