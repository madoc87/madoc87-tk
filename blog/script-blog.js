//Script para carregamento dinamico do conteudo
    document.addEventListener("DOMContentLoaded", function () {

        // Função para obter o valor do parâmetro 'postagem' da URL
        function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        const postagemNome = getQueryParam('postagem') || 'postagem-1'; // Padrão para 'postagem-1.html' se nenhum parâmetro for fornecido
        const container = document.getElementById("conteudo-principal");

        // Função para carregar a postagem
        // function carregarPostagem() {
        //     fetch(`blog/${postagemNome}.html`)
        //         .then(response => response.text())
        //         .then(html => container.innerHTML = html)
        //         .catch(err => console.log('Erro ao carregar a postagem:', err));
        // }

        function carregarPostagem() {
            fetch(`blog/${postagemNome}.html`)
                .then(response => response.text())
                .then(html => {
                    container.innerHTML = html;
                    // Depois que o conteúdo for inserido, chamamos o highlightAll para aplicar os estilos aos códigos
                    hljs.highlightAll(); 
                })
                .catch(err => console.log('Erro ao carregar a postagem:', err));
        }

        // Carrega a postagem ao carregar a página
        carregarPostagem();
    });






    //Script para pagina não carregar antes dos estilos CSS
    document.addEventListener("DOMContentLoaded", function () {

        var link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.href = "blog/style-blog.css";

        document.head.appendChild(link1);

        var link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.href = "src/css/style.css";
        document.head.appendChild(link2);
    });










    function copyCode(buttonElement) {
    // Localiza o elemento parente mais próximo que contém o exemplo de código e o botão copiar
    const codeExampleParent = buttonElement.closest('.code-example');
  
    // Encontra o elemento <code> dentro desse elemento parente
    const codeSnippet = codeExampleParent.querySelector('pre code');
  
    // Cria um objeto Range e seleciona o texto dentro do elemento <code>
    const range = document.createRange();
    range.selectNodeContents(codeSnippet);
  
    // Cria uma Selection e adiciona o range a ela
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  
    try {
        // Tenta executar o comando de copiar
        const successful = document.execCommand('copy');
        if(successful) {
            console.log('Código copiado com sucesso!');
        } else {
            console.error('Falha ao copiar código.');
        }
    } catch (err) {
        console.error('Erro ao copiar o código:', err);
    }
  
    // Remove a seleção após copiar
    selection.removeAllRanges();
  
    // Exibe a mensagem de cópia bem-sucedida
    const messageElement = codeExampleParent.querySelector('#mensagemCopiada');
    messageElement.classList.remove('visually-hidden');
    messageElement.innerText = "Código copiado!";
    setTimeout(function () {
        messageElement.innerText = "";
        messageElement.classList.add('visually-hidden');
    }, 2000); // Oculta a mensagem após 2 segundos
}

















    //Script para mostrar o ano atual
    const anoAtual = new Date().getFullYear();
    document.getElementById("ano").innerHTML = anoAtual;