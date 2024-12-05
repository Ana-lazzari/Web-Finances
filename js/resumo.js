// Adiciona o evento que será executado quando o conteúdo da página for carregado
document.addEventListener("DOMContentLoaded", function()  //addEventListener será executada assim que o HTML for carregado
{
  
  // Recupera as transações armazenadas no LocalStorage ou cria um array vazio se não houver transações
  //JSON.parse converte o conteúdo armazenado para um array. Caso não existam transações, um array vazio é utilizado como fallback (padrão que permite que seu serviço continue a execução em caso de falha na solicitação de outro serviço)
  var transactions = JSON.parse(localStorage.getItem("transactions")) || []; 
  
  // Variáveis para acumular as receitas e despesas
  var totalReceitas = 0;
  var totalDespesas = 0;
  
  // Calcula o total de receitas e despesas
  transactions.forEach(function(transaction) 
  {
    //Através de um loop forEach, o código percorre cada transação armazenada e, com base na categoria (receita ou despesa), 
    //acumula o valor correspondente nas variáveis totalReceitas e totalDespesas
    if (transaction.categoria === "receita") 
    {
      totalReceitas += transaction.valor;
    } 
    else if (transaction.categoria === "despesa") 
    {
      totalDespesas += transaction.valor;
    }
  });

  // Calcula o saldo final
  var saldoFinal = totalReceitas - totalDespesas; //O saldo final é calculado subtraindo as despesas das receitas


  // Atualiza os valores no HTML
  //getElementById para acessar elementos HTML com os IDs total-receitas, total-despesas e saldo-final
  document.getElementById("total-receitas").textContent = totalReceitas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  document.getElementById("total-despesas").textContent = totalDespesas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  document.getElementById("saldo-final").textContent = saldoFinal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Criação do gráfico de pizza
  var ctxPie = document.getElementById("pieChart").getContext("2d");

  // Configuração e criação do gráfico de pizza utilizando a biblioteca Chart.js
  new Chart(ctxPie, 
  {
    type: "pie",
    data: 
    {
      labels: ["Receitas", "Despesas"],  // Rótulos do gráfico
      datasets: [
      {
        data: [totalReceitas, totalDespesas],  // Dados para receitas e despesas
        backgroundColor: ["rgb(34, 160, 91)", "red"],  // Cores do gráfico
        borderColor: ["#ffffff", "#ffffff"],  // Cor das bordas
        borderWidth: 1  // Largura da borda
      }]
    },
    options: 
    {
      plugins: 
      {
        legend: 
        {
          position: "top"  // Posição da legenda no gráfico
        }
      }
    }
  });

  /*
  // Criação do gráfico de barras (caso desejado)
  var ctxBar = document.getElementById("barChart").getContext("2d");

  // Configuração e criação do gráfico de barras (chart.js)
  new Chart(ctxBar, 
    {
    type: "bar",
    data: 
    {
      labels: ["Receitas", "Despesas"],  // Rótulos do gráfico
      datasets: [
      {
        label: "Valor",
        data: [totalReceitas, totalDespesas],  // Dados para receitas e despesas
        backgroundColor: ["rgb(34, 160, 91)", "red"],  // Cores do gráfico
        borderColor: ["#ffffff", "#ffffff"],  // Cor das bordas
        borderWidth: 1  // Largura da borda
      }]
    },
    options: 
    {
      responsive: true,
      plugins: 
      {
        legend: 
        {
          position: "top"  // Posição da legenda no gráfico
        }
      },
      scales: 
      {
        y: 
        {
          beginAtZero: true  // Garante que o gráfico comece do zero no eixo Y
        }
      }
    }
  });
  */
}); 



/*
|| []: assegura que, se não houver transações previamente salvas no localStorage, 
o código sempre tenha um array vazio para trabalhar, permitindo que você adicione novas transações sem problemas.

JSON.parse(): Método para converter objetos JavaScript para uma string JSON e vice-versa.
*/ 