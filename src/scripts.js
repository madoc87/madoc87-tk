// Base URL, que pode ser ajustada dependendo do ambiente (local ou produção)
const baseURL = window.location.hostname === '127.0.0.1' ? '' : '/madoc87-tk/';


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".container-blog").forEach(container => {
        const postagemUrl = baseURL + 'blog' + container.getAttribute('data-postagem-url'); // Inclui a pasta /blog no caminho
        fetch(postagemUrl)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, "text/html");

                // Extrair o título, a primeira parte do conteúdo e a imagem
                const titulo = doc.querySelector('.post-title').innerText;
                const conteudo = doc.querySelector('.post-content p').innerText;
                const imagemSrc = doc.querySelector('img').src;
                const segundoParagrafo = doc.querySelector('.post-content p:nth-of-type(2)').innerText;

                let conteudoPreview = conteudo;

                if (conteudo.length < 180) {
                    conteudoPreview += ' ' + segundoParagrafo;
                }

                // Remove a div de loading
                const loadingDiv = container.querySelector('.loading');
                loadingDiv.remove();

                // Cria a tag  e define o src
                const img = document.createElement('img');
                // img.src = imagemSrc.startsWith('http') ? imagemSrc : '../' + imagemSrc;
                img.src = imagemSrc.startsWith('http') ? imagemSrc : baseURL + imagemSrc;
                img.classList.add('img-blog');

                // Insere a imagem antes do título
                container.querySelector('.postagem-titulo').before(img);

                // Atualizar elementos filhos
                container.querySelector('.postagem-titulo').innerText = titulo;

                container.querySelector('.postagem-conteudo').innerText = conteudoPreview.substring(0, 180) + "...";

                container.querySelector('.postagem-imagem').src = imagem;
            })
            .catch(err => console.error('Erro ao carregar a postagem:', err));
    });
});

function toggleDiv(divId) {
    var div = document.getElementById(divId);
    var divs = document.getElementsByClassName("hidden-div");
    for (var i = 0; i < divs.length; i++) {
        if (divs[i] !== div) {
            divs[i].style.display = "none";
        }
    }
    // Verificar se a div está sendo exibida ou não e alternar o estado
    if (div.style.display === "block") {
        div.style.display = "none";
    } else {
        div.style.display = "block";
    }
}