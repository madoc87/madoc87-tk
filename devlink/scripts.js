function toggleMode(){
    const html = document.documentElement;

    html.classList.toggle('light')

    const img = document.querySelector('#profile img')

    if(html.classList.contains('light')) {
        img.setAttribute('src', './assets/avatar-mad-light.png');
        img.setAttribute('alt', 'Robo vermelho com corpo humanoide com uma rosa em um domo no lugar da cabeça em um fundo noturno estrelado');
    } else {
        img.setAttribute('src', './assets/avatar-mad-dark.png');
        img.setAttribute('alt', 'Foto de uma mão segurando um cigarro eletrônico saindo fumaça');
    }
}