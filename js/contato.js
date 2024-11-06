/* Selecionando os elementos que serão manipulados */
const formulario = document.querySelector("form");
const campoCep = document.querySelector("#cep");
const campoTelefone = document.querySelector("#telefone");
const campoEndereco = document.querySelector("#endereco");
const campoBairro = document.querySelector("#bairro");
const campoCidade = document.querySelector("#cidade");
const campoEstado = document.querySelector("#estado");
const botaoBuscar = document.querySelector("#buscar");
const mensagemStatus = document.querySelector("#status");

// Ouvinte de evento para o botão Buscar
botaoBuscar.addEventListener("click", async function () {
    // Verificando o CEP dogotadp NÃO tem 9 dígitos
    if (campoCep.value.length !== 9) {
        mensagemStatus.innerHTML = "Digite um CEP válido";
        mensagemStatus.style.color = "red";

        // Parar completamente a execução do código
        return;

    }
    // Guardamdp o valor do cep digitado
    let cepDigitado = campoCep.value;
    console.log(cepDigitado);

    /* AJAX - Asyncrounous JavaScript abd XML
    Técnica de comunicação assíncrona (transmissão, recebimento) de dados MUITO USADA entre diferentes tipos de sistemas (site, aplicativo, jogo, software) e tecnologias  (PHP, ASP, Java, etc).  */

    // Etapa 1: preparamos o endereco junto com o CEP digitado
    let endereco = `https://viacep.com.br/ws/${cepDigitado}/json/ `;

    // Etapa 2: acessamos o ViaCEP com endereço ajustado
    const resposta = await fetch(endereco);

    // Etapa 3: extrair os dados que ViaCEP processou
    const dados = await resposta.json(); /* formato de OBJETO */
    console.log(dados);


    // Etapa 4: lidando com os dados (em casi de erro ou sucesso)
    if ("erro" in dados) {
        mensagemStatus.innerHTML = "CEP não encontrado! ☹";
        mensagemStatus.style.color = "red";
    } else {
        mensagemStatus.innerHTML = "CEP encontrado! 😃";
        mensagemStatus.style.color = "green";


    }

    // Selecionando os campos que estão escondidos
    const campos = document.querySelectorAll(".campos-restantes");

    // Loop for para acessar cada campo e remover a classe
    // fazendo com que cada campo volte a aparecer na tela
    for (let i = 0; i < campos.length; i++) {
        campos[i].classList.remove("campos-restantes");
    }

    // Atribuindo cada dado do ViaCEP à cada campo do formulário
    campoBairro.value = dados.bairro;
    campoCidade.value = dados.localidade;
    campoEstado.value = dados.uf;
    campoEndereco.value = dados.logradouro;




}); //final da função/evento do botao busca