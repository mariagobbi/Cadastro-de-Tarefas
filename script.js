function salvarTarefa(event) {
    event.preventDefault();

    const prioridade = document.getElementById("prioridade").value;
    const descricao = document.getElementById("descricao").value;
    const local = document.getElementById("local").value;
    const recursos = document.getElementById("recursos").value.split(",");
    const dataLimite = document.getElementById("dataLimite").value;
    const matricula = document.getElementById("matricula").value;

    if (!prioridade || !descricao || !local || !dataLimite || !matricula) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const tarefa = {
        prioridade,
        descricao,
        local,
        recursosNecessarios: recursos.filter(r => r.trim() !== ""),
        dataLimite,
        matricula
    };

    let lista = JSON.parse(localStorage.getItem("tarefas")) || [];
    lista.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(lista));

    alert("Tarefa cadastrada com sucesso!");
    window.location.href = "index.html";
}

function carregarTarefas() {
    let lista = JSON.parse(localStorage.getItem("tarefas")) || [];

    const container = document.getElementById("listaTarefas");

    if (lista.length === 0) {
        container.innerHTML = `<p class="msg">Nenhuma tarefa cadastrada</p>`;
        return;
    }

    let tabela = `
        <table>
            <tr>
                <th>Prioridade</th>
                <th>Descrição</th>
                <th>Local</th>
                <th>Recursos</th>
                <th>Data Limite</th>
                <th>Matrícula</th>
            </tr>
    `;

    lista.forEach(tarefa => {
        tabela += `
            <tr class="${tarefa.prioridade === 'Urgente' ? 'urgente' : ''}">
                <td>${tarefa.prioridade}</td>
                <td>${tarefa.descricao}</td>
                <td>${tarefa.local}</td>
                <td>${tarefa.recursosNecessarios.join(", ")}</td>
                <td>${tarefa.dataLimite.replace("T", " ")}</td>
                <td>${tarefa.matricula}</td>
            </tr>
        `;
    });

    tabela += `</table>`;
    container.innerHTML = tabela;
}
