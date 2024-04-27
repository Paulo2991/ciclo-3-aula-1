document.addEventListener("DOMContentLoaded", function () {
	const myForm = document.getElementById('myForm');
	const submitBtn = document.getElementById('submitBtn');
	const myModal = document.getElementById('myModal');
	const resultModal = document.getElementById('resultModal');
	const resultado = document.getElementById('resultado');
	const nao = document.getElementById('nao');
	const sim = document.getElementById('sim');
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

		const selects = document.querySelectorAll('select[required]');
		selects.forEach(select => {
			if (!select.checkValidity()) {
				camposObrigatorios += `O campo ${select.name} é obrigatório.<br>`;
			}else{
				mensagemErro.innerHTML = '';
			}
		});	

		if (camposObrigatorios === '') {
			myModal.style.display = 'block';
		} else {
			mensagemErro.innerHTML = camposObrigatorios;
		}
	});

	nao.addEventListener('click',function(){
		pedido(false);
	});

	sim.addEventListener('click',function(){
		pedido(true);
	});

	closeButtons.forEach(function (button){
		button.addEventListener('click', function(){
			myModal.style.display = 'none';
			resultModal.style.display = 'none';
		});
	});

	window.addEventListener('click', function(event){
		if(event.target == myModal || event.target == resultModal){
			myModal.style.display = 'none';
			resultModal.style.display = 'none';
		}
	});

	function pedido(disconto){
		const valorConta = document.getElementById('valorConta').value;
		const incluirTaxa = document.getElementById('incluirTaxa').value;
		const qtdPagantes = document.getElementById('qtdPagantes').value;
		let valorDisconto = parseInt(document.getElementById('sim').value);
		let i = 0;

		if(disconto === true){
			valorDisconto = valorConta * 0.10;
			let aplicandoDisconto = valorConta - valorDisconto;
			let calculoDisconto = aplicandoDisconto / qtdPagantes;
			resultado.innerHTML = `ID: ${i + 1} | Valor Conta: ${calculoDisconto.toFixed(2)} | Incluir Na Taxa: ${incluirTaxa}  | Quantidade De Pessoas Pagantes: ${qtdPagantes} <br>`;
			resultModal.style.display = 'block';
		}else{
			let calculoSemDisconto = valorConta / qtdPagantes;
			resultado.innerHTML = `ID: ${i + 1} | Valor Conta: ${calculoSemDisconto.toFixed(2)} | Incluir Na Taxa: ${incluirTaxa}  | Quantidade De Pessoas Pagantes: ${qtdPagantes} <br>`;
			resultModal.style.display = 'block';
		}
	}

});





