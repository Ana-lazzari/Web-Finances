// Acessa o formulário através do getElementById e fica "escutando"/esperando o evento submit (ao clicar no botão de enviar)
document.getElementById("transaction-form").addEventListener("submit", function(event) //Quando o formulário é enviado, a função anônima é executada
{
  // Não deixa carregar uma nova página
  event.preventDefault(); //Impede que o navegador carregue uma nova página 
    
  // Declara as variáveis e pega os valores dos id´s nos campos do formulário
  var descricao = document.getElementById('descricao').value;
  var categoria = document.getElementById('categoria').value;
  var data = document.getElementById('data').value;
  var valor = parseFloat(document.getElementById('valor').value);
    
  // Cria o objeto da transação com os dados coletados
  var novaTransacao = {descricao: descricao, categoria: categoria, data: data, valor: valor}; //Armazena as informações sobre a transação que foi preenchida pelo usuário

  // Cria a lista de transações, carrega do LocalStorage se houver, ou cria uma lista vazia caso contrário
  //localStorage.getItem('transactions') busca os dados, JSON.parse() converte o texto para um objeto JavaScript
  //Se não houver transações armazenadas, é criada uma lista vazia [] por padrão (através do operador ||)
  var listaTransacoes = JSON.parse(localStorage.getItem('transactions')) || [];
    
  // Insere a nova transação na lista
  listaTransacoes.push(novaTransacao); //A nova transação é adicionada à lista de transações (array) existente no LocalStorage

  // Adiciona a lista de transações ao LocalStorage
  localStorage.setItem('transactions', JSON.stringify(listaTransacoes)); //Armazena novamente a lista de transações, mas antes converte a lista para uma string com JSON.stringify()
    
  // Exibe a mensagem de sucesso
  var successMessage = document.getElementById('success-message'); //Mensagem que informa ao usuário que a transação foi registrada com sucesso
  successMessage.style.display = "block";//Torna mensagem de sucesso visível ao definir seu estilo display como "block"

  // Limpa o formulário após o cadastro
  document.getElementById('transaction-form').reset(); //Todos os campos de entrada são limpos após o envio da transação
    
  // Esconde a mensagem de sucesso após 3 segundos
  setTimeout(function() //A função setTimeout é usada para aguardar 3 segundos (3000 milissegundos) antes de esconder novamente a mensagem 
  {
    successMessage.style.display = "none"; // Tornando o elemento invisível com style.display = "none" após os 3 segundos
  }, 3000); 
});


/*
|| []: assegura que, se não houver transações previamente salvas no localStorage, 
o código sempre tenha um array vazio para trabalhar, permitindo que você adicione novas transações sem problemas.

JSON.parse(): Método para converter objetos JavaScript para uma string JSON e vice-versa.
*/ 