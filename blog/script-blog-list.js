document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("conteudo-principal");

    // Função para listar todas as postagens
    function listarPostagens(postagens) {
        // Limpa o conteúdo principal antes de adicionar novas postagens ordenadas
        container.innerHTML = '';

        // Loop para adicionar cada postagem ao container
        postagens.forEach(postagem => {
            const { arquivo, titulo, imagem, texto } = postagem;
            const resumo = texto.substring(0, 250) + '...';

            const postagemDiv = document.createElement('div');
            postagemDiv.className = 'postagem';
            postagemDiv.innerHTML = `
                <a class="link" href="/blog.html?postagem=${arquivo.replace('.html', '')}">
                    <div class="container-blog">
                        <div class="blog-sec-1">
                            <img class="thumb-blog" src="${imagem}" alt="${titulo}" />
                        </div>
                        <div class="blog-sec-2">
                            <h2>${titulo}</h2>
                            <p>${resumo}</p>
                            <button>Leia mais</button>
                        </div>
                    </div>
                </a>
            `;
            container.appendChild(postagemDiv);
        });
    }

    // Função para carregar postagens e ordená-las por data
    function carregarEOrdenarPostagens() {
        const postagens = ['postagem-1.html', 'postagem-2.html', 'postagem-3.html', 'postagem-4.html', 'postagem-5.html'];
        let postsData = [];

        Promise.all(postagens.map(arquivo =>
            fetch(`blog/${arquivo}`)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const dataPostSpan = doc.getElementById("dataPost").getElementsByTagName("span")[0].textContent;
                    const dataFormatada = dataPostSpan.split("/").reverse().join("-");
                    postsData.push({
                        data: new Date(dataFormatada),
                        arquivo,
                        imagem: doc.querySelector('img').src,
                        titulo: doc.querySelector('h1').textContent,
                        texto: doc.querySelector('p').textContent
                    });
                })
        )).then(() => {
            postsData.sort((a, b) => b.data - a.data); // Ordena do mais novo para o mais antigo
            listarPostagens(postsData);
        }).catch(err => console.log('Erro ao carregar a postagem:', err));
    }

    // Carregar e ordenar as postagens ao carregar a página
    carregarEOrdenarPostagens();
});

//Script para mostrar o ano atual
const anoAtual = new Date().getFullYear();
document.getElementById("ano").textContent = anoAtual;