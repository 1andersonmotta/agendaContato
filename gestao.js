const dados = document.querySelector('#dados')
const fundopopup = document.querySelector('#fundopopup');
const btn_gravar = document.querySelector('#btn_gravar');
const btn_cancelar = document.querySelector('#btn_cancelar');
const f_id = document.querySelector('#f_id');
const f_nome = document.querySelector('#f_nome');
const f_celular = document.querySelector('#f_celular');
const f_email = document.querySelector('#f_email');
const f_dtnasc = document.querySelector('#f_dtnasc');

btn_gravar.addEventListener('click', () => {
    fundopopup.classList.add("ocultar")
    const originalDate = new Date(formatarData(f_dtnasc.value))
    const year = originalDate.getFullYear(); // Obtém o ano
    const month = originalDate.getMonth() + 1; // Os meses em JavaScript são baseados em zero, então adicione 1
    const day = originalDate.getDate() + 1; // Obtém o dia
    const hour = originalDate.getHours(); // Obtém a hora
    const minute = originalDate.getMinutes(); // Obtém os minutos
    const second = originalDate.getSeconds(); // Obtém os segundos
    const millisecond = originalDate.getMilliseconds(); // Obtém os milissegundos

    const convertedDateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}.${millisecond.toString().padStart(3, '0')}Z`;

    const endpoint = `http://127.0.0.1:1880/atualizarcontatos/${f_id.value}/${f_nome.value}/${f_celular.value}/${f_email.value}/${convertedDateString}`;
    fetch(endpoint)
        .then(res => {
            if (res.status == 200) {
                alert("Contato atualizado com sucesso")
                preencherdgv()
            } else {
                alert("Erro ao atualizar contato")
            }
        });

});

btn_cancelar.addEventListener('click', () => {
    fundopopup.classList.add("ocultar")

});

const preencherdgv = () => {
    dados.innerHTML = "";
    const endpoint = `http://127.0.0.1:1880/pesquisartodoscontatos`;
    fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            if (res.length == 0) {
                alert("Usuário não encontrado")
                location.reload();
            } else {

                res.forEach(el => {
                    const linha = document.createElement("div");
                    linha.setAttribute("class", "linhadados");

                    const c1 = document.createElement("div");
                    c1.setAttribute("class", "coluna c1 ");
                    c1.innerHTML = el.n_contato_contato
                    linha.appendChild(c1);

                    const c2 = document.createElement("div");
                    c2.setAttribute("class", "coluna c2");
                    c2.innerHTML = el.s_nome_contato;
                    linha.appendChild(c2);

                    const c3 = document.createElement("div");
                    c3.setAttribute("class", "coluna c3");
                    c3.innerHTML = el.s_celular_contato;
                    linha.appendChild(c3);

                    const c4 = document.createElement("div");
                    c4.setAttribute("class", "coluna c4");
                    c4.innerHTML = el.s_email_contato;
                    linha.appendChild(c4);

                    const c5 = document.createElement("div");
                    c5.setAttribute("class", "coluna c5");
                    c5.innerHTML = new Date(el.dt_dtnasc_contato).toLocaleDateString("pt-BR");
                    linha.appendChild(c5);

                    const c6 = document.createElement("div");
                    c6.setAttribute("class", "coluna c6 c_op");
                    const imgdelete = document.createElement("img");
                    imgdelete.setAttribute("src", "delete.svg")
                    imgdelete.setAttribute("class", "iconeop")
                    imgdelete.addEventListener("click", () => {
                        const validDelet = confirm(`Deseja realmente deletar ${el.s_nome_contato}?`);
                        if (validDelet) {
                            fetch(`http://127.0.0.1:1880/deletarcontatos/${el.n_contato_contato}`)
                                .then(res => res.json())
                        }
                        location.reload();
                    })
                    const imgeditar = document.createElement("img");
                    imgeditar.setAttribute("src", "edit.svg")
                    imgeditar.setAttribute("class", "iconeop")
                    imgeditar.addEventListener("click", (evt) => {
                        fundopopup.classList.remove("ocultar")
                        const dados = evt.target.parentNode.parentNode.childNodes
                        console.log([...dados])
                        f_id.value = dados[0].innerHTML
                        f_nome.value = dados[1].innerHTML
                        f_celular.value = dados[2].innerHTML
                        f_email.value = dados[3].innerHTML
                        f_dtnasc.value = dados[4].innerHTML

                    });

                    c6.appendChild(imgdelete);
                    c6.appendChild(imgeditar);
                    linha.appendChild(c6);

                    dados.appendChild(linha);

                });
            }
        })
}
preencherdgv();

function formatarData(dataString) {
    var partes = dataString.split("/");
    var dia = partes[0];
    var mes = partes[1];
    var ano = partes[2];
    var data = ano + '-' + mes + '-' + dia;

    return data;
}






