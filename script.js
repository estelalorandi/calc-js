//vamos criar as variáveis relacionadas aos elementos que usaremos ao longo do programa.
const main = document.querySelector("main");
const input = document.getElementById("input");
const root = document.querySelector(":root");
const resultInput = document.getElementById("result");

const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "=",
  ".",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
]; //aqui criamos um array para armazenar os caracteres que podem aparecer no input da calculadora.

document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  //aqui selecionamos todos os elementos cuja classe é charKey e, para cada um, atribuímos a function
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value; // o dataset usamos para acessar os atributos data, nesse caso é o data-value
    input.value += value;
  });
});

document.getElementById("clear").addEventListener("click", function () {
  input.value = ""; //limpa o input
  input.focus(); //fará com que o cursor foque no input
  resultInput.value = "";
});

//keydown significa quando pressionamos a tecla
input.addEventListener("keydown", function (ev) {
  ev.preventDefault(); //o comportamento que queremos prevenir aqui é no caso do usuário apertar qualquer tecla que gere um resultado no input. Somente algumas teclas são permitidas. //ev.key é a tecla associada ao evento
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  }
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1); //o slice cortará o número digitado. Pegaremos até o penúltimo caractere. (-1)
  }
  if (ev.key === "Enter") {
    calculate();
  }
});

document.getElementById("equal").addEventListener("click", calculate); //refere-se ao botão "="

function calculate() {
  resultInput.value = "Error"; //se digitarmos uma conta válida, o resultado será calculado. Mas se for inválida, será mostrado 'ERRO'.
  resultInput.classList.add("error");
  const result = eval(input.value); //eval irá executar esse código se passarmos uma string. Não é indicada se houver informações sensíveis e um sistema forte de backend, pois permitirá que um código malicioso seja inserido.
  resultInput.value = result;
  resultInput.classList.remove("error");
}

//agora iremos implementar a parte de trocar o tema da página (dark - light) e o sistema de copiar o resultado.

document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});

document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (ev) {
    const button = ev.currentTarget; //currentTarget refere-se ao evento que provocou a ação
    if (button.innerText === "Copy") {
      button.innerText = "Copied!";
      button.classList.add("success"); //aqui adicionamos a classe .success presente no css para tornar o botão verde.
      window.navigator.clipboard.writeText(resultInput.value); //a propriedade navigator.clipboard.writeText copia o texto para a área de transferência!
    } else {
      button.innerText = "Copy";
      button.classList.remove("success");
    }
  });
