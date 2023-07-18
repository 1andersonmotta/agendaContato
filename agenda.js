const cabecalho = document.querySelector("#cabecalho");
const menu = document.querySelector("#menu");
const btn_home = document.querySelector("#btn_home");
const btn_novo = document.querySelector("#btn_novo");
const btn_pesquisar = document.querySelector("#btn_pesquisar");
const btn_filtrar = document.querySelector("#btn_filtrar");
const btn_gestao = document.querySelector("#btn_gestao");
const btn_sobre = document.querySelector("#btn_sobre");
const principal = document.querySelector("#principal");
const if_principal = document.querySelector("#if_principal");

btn_home.addEventListener("click", (evt) => {
    btn_home.setAttribute("class", "abaSelecionada")
    btn_novo.setAttribute("class", "aba")
    btn_pesquisar.setAttribute("class", "aba")
    btn_filtrar.setAttribute("class", "aba")
    btn_gestao.setAttribute("class", "aba")
    btn_sobre.setAttribute("class", "aba")
    selecionarAba(evt.target, "./home.html")
});
btn_novo.addEventListener("click", (evt) => {
    btn_home.setAttribute("class", "aba")
    btn_pesquisar.setAttribute("class", "aba")
    btn_filtrar.setAttribute("class", "aba")
    btn_gestao.setAttribute("class", "aba")
    btn_sobre.setAttribute("class", "aba")
    btn_novo.setAttribute("class", "abaSelecionada")
    selecionarAba(evt.target, "./novo.html")
});

btn_pesquisar.addEventListener("click", (evt) => {
    btn_home.setAttribute("class", "aba")
    btn_filtrar.setAttribute("class", "aba")
    btn_gestao.setAttribute("class", "aba")
    btn_sobre.setAttribute("class", "aba")
    btn_novo.setAttribute("class", "aba")
    btn_pesquisar.setAttribute("class", "abaSelecionada")
    selecionarAba(evt.target, "./pesquisar.html")
});

btn_filtrar.addEventListener("click", (evt) => {
    btn_home.setAttribute("class", "aba")
    btn_gestao.setAttribute("class", "aba")
    btn_sobre.setAttribute("class", "aba")
    btn_novo.setAttribute("class", "aba")
    btn_pesquisar.setAttribute("class", "aba")
    btn_filtrar.setAttribute("class", "abaSelecionada")
    selecionarAba(evt.target, "./filtrar.html")
});

btn_gestao.addEventListener("click", (evt) => {
    btn_home.setAttribute("class", "aba")
    btn_sobre.setAttribute("class", "aba")
    btn_novo.setAttribute("class", "aba")
    btn_pesquisar.setAttribute("class", "aba")
    btn_filtrar.setAttribute("class", "aba")
    btn_gestao.setAttribute("class", "abaSelecionada")
    selecionarAba(evt.target, "./gestao.html")
});

btn_sobre.addEventListener("click", (evt) => {
    btn_home.setAttribute("class", "aba")
    btn_novo.setAttribute("class", "aba")
    btn_pesquisar.setAttribute("class", "aba")
    btn_filtrar.setAttribute("class", "aba")
    btn_gestao.setAttribute("class", "aba")
    btn_sobre.setAttribute("class", "abaSelecionada")
    selecionarAba(evt.target, "./sobre.html")
});


const selecionarAba = (el, url) => {
    const abas = [...document.querySelectorAll(".aba")];
    abas.forEach(e => {
        e.classList.remove("abaSelecionada");
    })
    el.classList.add("abaSelelecionada")
    window.open(url, "if_principal")

}