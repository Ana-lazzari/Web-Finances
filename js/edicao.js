// Adiciona o evento que será executado quando o conteúdo da página for carregado
document.addEventListener("DOMContentLoaded", function() //Garante que o código JavaScript execute suas ações somente após o DOM estar pronto
{
  
  // Referências aos elementos da página
  const transactionsTableBody = document.querySelector("#transactions-table tbody");  // transactionsTableBody: Corpo da tabela onde as transações serão exibidas
  const editSection = document.querySelector("#edit-section");  //editSection: Seção onde o formulário de edição será exibido
  const editForm = document.querySelector("#edit-form");  // editForm: Formulário de edição
  const cancelEditButton = document.querySelector("#cancel-edit");  // cancelEditButton: Botão para cancelar a edição
  
  // Recuperar as transações do LocalStorage
  //Tenta recuperar os dados de transações armazenados no LocalStorage. Se não houver transações, inicia com um array vazio ([])
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];  
  
  // Variável para armazenar o índice da transação sendo editada
  let currentEditIndex = null;

  // Função para atualizar a tabela
  function updateTable() 
  {
    transactionsTableBody.innerHTML = "";  // Primeiro, ela limpa a tabela com innerHTML = """
    transactions.forEach((transaction, index) => 
    //=>: é usada no seu código para definir uma função anônima que será executada para cada item no array transactions.
    //Ela permite uma forma mais compacta de escrever funções, mantendo o mesmo comportamento funcional.
    {
      const row = document.createElement("tr"); //Depois, para cada transação no array transactions, ela cria uma linha (<tr>) com os dados dessa transação
      //A descrição, categoria (se é receita ou despesa), data (formatada como "pt-BR") e valor (formatado como moeda BRL) são inseridos nas células da linha
      row.innerHTML = `
        <td>${transaction.descricao}</td>
        <td>${transaction.categoria === "receita" ? "Receita" : "Despesa"}</td>
        <td>${new Date(transaction.data).toLocaleDateString("pt-BR")}</td>
        <td>${transaction.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
        <td>
          <button class="edit-btn" data-index="${index}">Editar</button>
          <button class="delete-btn" data-index="${index}">Excluir</button>
        </td>
      `;
      //Botões "Editar" e "Excluir" são adicionados à tabela, e cada um deles recebe um atributo data-index com o índice da transação
      transactionsTableBody.appendChild(row);  // Adiciona a linha à tabela
    });
  }

  // Função para editar uma transação
  function startEdit(index) //
  { 
    currentEditIndex = index;//Armazena o índice da transação a ser editada em currentEditIndex
    const transaction = transactions[index];
    // Preenche o formulário com os dados da transação
    editForm.descricao.value = transaction.descricao;
    editForm.categoria.value = transaction.categoria;
    editForm.data.value = transaction.data;
    editForm.valor.value = transaction.valor;

    // Exibe a seção de edição, tornando-a visível (display: "block")
    editSection.style.display = "block"; 
  }

  // Função para salvar a edição
  editForm.addEventListener("submit", function(e) //O objeto de evento (e) contém informações sobre o evento que foi disparado
  {
    e.preventDefault();  // Previne o comportamento padrão do formulário
    
    // Atualiza a transação com os dados do formulário
    transactions[currentEditIndex] = 
    {
      descricao: editForm.descricao.value,
      categoria: editForm.categoria.value,
      data: editForm.data.value,
      valor: parseFloat(editForm.valor.value),
    };
    
    // Atualiza o LocalStorage e a tabela
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTable();
    
    // Esconde a seção de edição
    editSection.style.display = "none";
  });

  // Função para cancelar a edição
  cancelEditButton.addEventListener("click", function() 
  {
    editSection.style.display = "none";  // Quando o usuário clica no botão de cancelar edição, a seção de edição é escondida novamente
  });

  // Função para excluir uma transação
  function deleteTransaction(index) 
  {
    transactions.splice(index, 1);  //deleteTransaction remove a transação do array quando uma transação é excluída
    
    // Atualiza o LocalStorage e a tabela
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTable();
  }

  // Event listener para os botões de ação (editar e excluir)
  transactionsTableBody.addEventListener("click", function(e) //O objeto de evento (e) contém informações sobre o evento que foi disparado
  {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("edit-btn")) //Se botão é clicado, o índice da transação é obtido do atributo data-index, e a função apropriada (editar ou excluir) é chamada.
    {
      startEdit(index);  // Inicia a edição da transação
    } 
    else if (e.target.classList.contains("delete-btn")) 
    {
      deleteTransaction(index);  // Exclui a transação
    }
  });

  // Atualiza a tabela ao carregar a página
  updateTable();  // Atualiza a tabela com as transações
});



/*
|| []: assegura que, se não houver transações previamente salvas no localStorage, 
o código sempre tenha um array vazio para trabalhar, permitindo que você adicione novas transações sem problemas.

JSON.parse(): Método para converter objetos JavaScript para uma string JSON e vice-versa.
*/ 