import React from 'react';

//executa clique em célula e retorna:
//-1 se perdeu, 0 se continua, 1 se ganhou
export default function onPressCelula(props, state, celulaPressionada) {
  const x = props.x;
  const y = props. y;
  const tamanho = x * y;
  const bombas = props.bombas;
  let campo = state.campo.slice();
  let celulasAbertas = state.celulasAbertas.slice();
  let isFirstPress = state.isFirstPress;
  
  //preenche o campo com bombas em lugares aleatórios exceto onde foi clicado e ao redor
	function preencheBombas(celulaPressionada) {
    let celula;

	  //adiciona bombas temporariamente onde foi clicado e ao redor para o código não inserir
	  campo[celulaPressionada] = "bomba";
    for (let celula of celulasAoRedor(celulaPressionada)) {
      campo[celula] = "bomba";
    }

		//adiciona bombas em células aleatóriamente exceto onde já existe
		for(let i = 0; i < bombas; i++) {
			do {
				celula = Math.floor(Math.random() * tamanho);
			} while (campo[celula] === "bomba"); //impede adicionar bomba onde já tem
			campo[celula] = "bomba";
		}

		 //remove as bombas temporárias pois não são desejadas
		campo[celulaPressionada] = null; 
    for (celula of celulasAoRedor(celulaPressionada)) {
      campo[celula] = null;
    }    
	}

  //preenche o campo com os numeros num campo com bombas
  function preencheNumeros() {
		const dicionario = [null, "one", "two", "three", "four", "five", "six", "seven", "eight"];

		for(let celula = 0; celula < tamanho; celula++) {
			if(campo[celula] === null) {
				campo[celula] = dicionario[bombasAoRedor(celula)];
			}
		}

		return campo;
	}

	function bombasAoRedor(celula) {
		//verifica se está nas bordas
		const bordaSuperior = (celula < x);
		const bordaInferior = (celula >= (x*y - x));
		const bordaEsquerda = (celula % x === 0);
		const bordaDireita = ((celula-x+1) % x === 0);
    let total = 0;
    for(let c of celulasAoRedor(celula)) {
      if(campo[c] === "bomba") {
        total ++;
      }
    }

		return total;
	}

  function celulasAoRedor(celula) {
    //verifica se está nas bordas
    const bordaSuperior = (celula < x);
		const bordaInferior = (celula >= (x*y - x));
		const bordaEsquerda = (celula % x === 0);
		const bordaDireita = ((celula-x+1) % x === 0);
    const celulas = [];

    if(!bordaSuperior) celulas.push(celula - x); //em cima
    if(!bordaInferior) celulas.push(celula + x); //embaixo
    if(!bordaEsquerda) celulas.push(celula - 1); //esquerda
    if(!bordaDireita) celulas.push(celula + 1); //direita
    if(!bordaSuperior && !bordaEsquerda) celulas.push(celula - x - 1); //em cima + esquerda
    if(!bordaSuperior && !bordaDireita) celulas.push(celula - x + 1); //em cima + direita
    if(!bordaInferior && !bordaEsquerda) celulas.push(celula + x - 1); //embaixo + esquerda
    if(!bordaInferior && !bordaDireita) celulas.push(celula + x + 1);

    return celulas;
  }

  function isBomba(celula) {
    return campo[celula] === "bomba";
  }

  function abrirCelula(celula) {
    celulasAbertas[celula] = true;
  }

	//abre todas as células ao redor de uma célula null recursivamente
	//através de um algoritmo de propagação
  function abrirPropagando(celulaPressionada) {
    //abre todas as células recursivamente com o uso de uma pilha
		//a célula é aberta e desempilhada
		//depois são abertas todas as células ao redor e as células null fechadas são empilhadas
    const pilha = [celulaPressionada];
    let celula = 0;
    while(pilha.length) {
      celula = pilha.pop();
      abrirCelula(celula);
      for(let redor of celulasAoRedor(celula)) {
        if(!isAberta(redor) && campo[redor] === null) {
          pilha.push(redor);
        }
        abrirCelula(redor);
      }
    }
  }

  function isAberta(celula) {
    return celulasAbertas[celula];
  }

  function novoState() {
    return {campo, celulasAbertas, isFirstPress};
  }

  function totalAbertas() {
    let total = 0;
    for(let celula of celulasAbertas)
      if(celula) 
        total++;
    return total;
  }

  //-1 se perdeu, 0 se continua, 1 se ganhou
  function resultado() {
    if(campo[celulaPressionada] === "bomba")
      return -1;
    else if(totalAbertas() === tamanho - bombas) {
      return 1;
    }
    return 0;
  }

  if(isFirstPress) {
    preencheBombas(celulaPressionada);
    preencheNumeros();
    isFirstPress = false;
  }

  if(!isAberta(celulaPressionada)) {
    if(campo[celulaPressionada] === null) {
      abrirPropagando(celulaPressionada);
    }
    else {
      abrirCelula(celulaPressionada);
    }
  }
  return [novoState(), resultado()];
}
