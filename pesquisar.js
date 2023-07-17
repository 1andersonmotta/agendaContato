const btn_pesq = document.querySelector('#btn_pesq')
const f_txtpesq = document.querySelector('#f_txtpesq')
const dados = document.querySelector('#dados')

const campo = document.getElementById('nasc');
campo.addEventListener('click', () => {
    if (campo.value == 'nasc') {
        f_txtpesq.value = "";
        f_txtpesq.setAttribute("placeholder", "ex: 00/00/0000")
    }

})

btn_pesq.addEventListener('click', (evt) => {
    dados.innerHTML = "";
    let pesq = f_txtpesq.value
    if (pesq == '') {
        alert("Digite um valor");
        f_txtpesq.focus();
        return;
    }
    const f_pesq = document.querySelector("input[name=f_pesq]:checked").value;

    if (f_pesq == 'nasc') {

        function formatarData(dataString) {
            // Extrair componentes da data
            var partes = dataString.split("/");
            var dia = partes[0];
            var mes = partes[1];
            var ano = partes[2];

            // Formatar a data no formato desejado
            var data = ano + '-' + mes + '-' + dia;

            return data;
        }

        const originalDate = new Date(formatarData(pesq))

        const year = originalDate.getFullYear(); // Obtém o ano
        const month = originalDate.getMonth() + 1; // Os meses em JavaScript são baseados em zero, então adicione 1
        const day = originalDate.getDate() + 1; // Obtém o dia
        const hour = originalDate.getHours(); // Obtém a hora
        const minute = originalDate.getMinutes(); // Obtém os minutos
        const second = originalDate.getSeconds(); // Obtém os segundos
        const millisecond = originalDate.getMilliseconds(); // Obtém os milissegundos

        pesq = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}.${millisecond.toString().padStart(3, '0')}Z`;

        const regex = /^(\d{4}-\d{2}-\d{2})/;
        const match = pesq.match(regex);

        if (match) {
            const extractedDate = match[1];
            pesq = extractedDate
        } else {
            console.log("Não foi possível extrair a data.");
        }

    }

    const endpoint = `http://127.0.0.1:1880/pesquisarcontatos/${f_pesq}/${pesq}`;
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
                    c1.setAttribute("class", "coluna c1");
                    c1.innerHTML = el.n_contato_contato;
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
                    dados.appendChild(linha);

                });
            }
        })
});



