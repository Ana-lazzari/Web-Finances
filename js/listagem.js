// Função para formatar o valor como moeda brasileira
function formatCurrency(value) //Recebe um valor numérico (value) e o formata como uma string de moeda brasileira (R$)
{
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });//Formatar o número com o símbolo da moeda brasileira (R$), separador de milhar e decimal
}

// Função para formatar a data
function formatDate(dateString) //Recebe uma data no formato string (dateString) e a converte para um formato de data legível no Brasil (DD/MM/AAAA)
{
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("pt-BR", options); //Formatar a data com o padrão brasileiro.
}

// Função para exibir as transações na tabela
function exibirTransacoes() 
{
  // Recupera as transações do LocalStorage ou cria um array vazio caso não haja transações
  var transactions = JSON.parse(localStorage.getItem("transactions")) || []; //Caso não haja transações, um array vazio é usado como fallback (padrão que permite que seu serviço continue a execução em caso de falha na solicitação de outro serviço)

  // Referência ao corpo da tabela onde as transações serão exibidas
  var transactionsTableBody = document.querySelector("#transactions-table tbody");

  // Limpa o conteúdo atual da tabela
  transactionsTableBody.innerHTML = ''; //Limpa qualquer conteúdo atual da tabela 

  // Preenche a tabela com as transações
  transactions.forEach(function(transaction) 
  {
    var row = document.createElement("tr"); //cria uma nova linha (<tr>) e preenche as colunas:

    // Coluna de Descrição
    var descricaoCell = document.createElement("td"); 
    descricaoCell.textContent = transaction.descricao;//Adiciona a descrição da transação
    row.appendChild(descricaoCell);

    // Coluna de Categoria
    var categoriaCell = document.createElement("td"); 
    categoriaCell.textContent = transaction.categoria === "receita" ? "Receita" : "Despesa";//Adiciona "Receita" ou "Despesa", dependendo do valor da propriedade categoria da transação
    row.appendChild(categoriaCell);

    // Coluna de Data
    var dataCell = document.createElement("td");
    dataCell.textContent = formatDate(transaction.data); //A data é formatada usando a função formatDate
    row.appendChild(dataCell);

    // Coluna de Valor
    var valorCell = document.createElement("td");
    valorCell.textContent = formatCurrency(transaction.valor); //O valor é formatado usando a função formatCurrency
    valorCell.style.color = transaction.categoria === "receita" ? "green" : "red"; //A cor do texto é definida como verde para receitas e vermelha para despesas
    row.appendChild(valorCell);

    // Adiciona a linha criada ao corpo da tabela
    transactionsTableBody.appendChild(row); //Cada linha criada é adicionada ao corpo da tabela
  });
}

// Exibe as transações ao carregar a página
document.addEventListener("DOMContentLoaded", function() 
{ 
  //O código aguarda o evento DOMContentLoaded, que é disparado quando o HTML da página é totalmente carregado
  exibirTransacoes();  //Quando isso ocorre, a função exibirTransacoes é chamada para preencher a tabela com as transações armazenadas no LocalStorage

});


/*
|| []: assegura que, se não houver transações previamente salvas no localStorage, 
o código sempre tenha um array vazio para trabalhar, permitindo que você adicione novas transações sem problemas.

JSON.parse(): Método para converter objetos JavaScript para uma string JSON e vice-versa.
*/ 