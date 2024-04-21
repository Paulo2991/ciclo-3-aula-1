let listaPedido = [];
let listaGorjeta = [];
let titulo = "<h1>Este pagamento terá desconto? Apenas para contas pagas pix,debito ou dinheiro!</h1>";

function abrirModal(){
	document.getElementById('myModal').style.display = 'block';
	document.getElementById('titulo').innerHTML = titulo;
	let buttonHTML = `<button id = "buttonClick">Sim</button>`;
	let button = document.getElementById('sim');
	button.innerHTML = buttonHTML;
	document.getElementById('buttonClick').addEventListener('click',function(){
		pedido();
	});
}

function closeModel(){
	document.getElementById('myModal').style.display = 'none';
}

function pedido(){
	let valorConta = parseFloat(document.getElementById('valorConta').value);
	let incluirTaxa = document.getElementById('incluirTaxa').value;
	let formaPagamento = document.getElementById('formaPagamento').value;
	let qtdPagantes = parseInt(document.getElementById('qtdPagantes').value);

	if (isNaN(valorConta) || valorConta <= 0 || isNaN(qtdPagantes) || qtdPagantes <= 0 || valorConta === "" || valorConta === null || incluirTaxa.trim() === "" || incluirTaxa === null || formaPagamento.trim() === "" || formaPagamento === null || qtdPagantes === "" || qtdPagantes == null) {
		showModalMessage(`Por favor, os campos Valor Conta,Incluir Taxa,Forma Pagamento,Quantidade De Pagantes são obrigatório ou você colocou um valor invalido nos campos Valor Conta,Quantidade De Pagantes.`);
		return;
	}

	const pedidos = {
		valorConta:valorConta,
		incluirTaxa:incluirTaxa,
		formaPagamento:formaPagamento,
		qtdPagantes:qtdPagantes,
		
	};

	listaPedido.push(pedidos);
	let pedidoCadastrado = "<h1>Pedido cadastrado com sucesso!</h1><br>";
	for(let i = 0; i < listaPedido.length; i++){
		let escolhaPagamento = listaPedido[i].formaPagamento;
		switch(escolhaPagamento){
		case "Pix":
			listaPedido[i].valorConta -= listaPedido[i].valorConta * 0.10;
			let calculoValorPix = listaPedido[i].valorConta / listaPedido[i].qtdPagantes;
			pedidoCadastrado += `ID: ${i + 1} | Valor Conta: ${calculoValorPix.toFixed(2)} | Incluir Na Taxa: ${listaPedido[i].incluirTaxa} | Forma De Pagamento: ${listaPedido[i].formaPagamento} | Quantidade De Pessoas Pagantes: ${listaPedido[i].qtdPagantes} <br>`;
			break;
		case "Dinheiro":
			listaPedido[i].valorConta -= listaPedido[i].valorConta * 0.10;
			let calculoValorDinheiro = listaPedido[i].valorConta / listaPedido[i].qtdPagantes;
			pedidoCadastrado += `ID: ${i + 1} | Valor Conta: ${calculoValorDinheiro.toFixed(2)} | Incluir Na Taxa: ${listaPedido[i].incluirTaxa} | Forma De Pagamento: ${listaPedido[i].formaPagamento} | Quantidade De Pessoas Pagantes: ${listaPedido[i].qtdPagantes} <br>`;
			break;
		case "Cartao":
			let calculoValorCartao = listaPedido[i].valorConta / listaPedido[i].qtdPagantes;
			pedidoCadastrado += `ID: ${i + 1} | Valor Conta: ${calculoValorCartao.toFixed(2)} | Incluir Na Taxa: ${listaPedido[i].incluirTaxa} | Forma De Pagamento: ${listaPedido[i].formaPagamento} | Quantidade De Pessoas Pagantes: ${listaPedido[i].qtdPagantes} <br>`;
			break;
		default:
			alert("Opção Invalida:");
		}
	}
	console.log(listaPedido);
	showModalMessage(pedidoCadastrado);
}

function showModalMessage(message) {
	document.getElementById('errorMessage').innerHTML = message;
	abrirModal();
}


function calcularGorjeta(){
	let valorGorjeta = parseFloat(document.getElementById('valorGorjeta').value);
	if(isNaN(valorGorjeta) || valorGorjeta < 0 || valorGorjeta === "" || valorGorjeta === null){
		showModalMessage(`Por favor, o campo Valor Gorjeta é obrigatório ou você colocou um valor invalido no campo Valor Gorjeta.`);
		return;
	}
	pedidoCadastrado = "Gorjeta Inserida Com Sucesso!";
	for(let j = 0; j < listaPedido.length; j++){
		if(listaPedido[j].length !== 0){
			let calculoGorjeta  = (listaPedido[j].valorConta * valorGorjeta)/100;
			listaGorjeta.push(calculoGorjeta);
			pedidoCadastrado += "O valor da gorjeta é: " + calculoGorjeta;
			console.log(calculoGorjeta);
		}else{
			console.log("Gorjeta não cadastrada:");
		}		
	}
}
