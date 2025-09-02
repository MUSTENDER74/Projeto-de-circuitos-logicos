const formPesquisa = document.getElementById('formPesquisa');
const inputPesquisa = formPesquisa.querySelector('.input-pesquisa');

const termosDeBusca = {
    'index.html': [
        'inicio', 'início', 'home', 'pagina inicial', 'página inicial', 'aba inicio', 'botão inicio',
        'principal', 'tela inicial', 'menu principal', 'começo', 'voltar', 'painel', 'dashboard',
        'capa', 'voltar ao inicio', 'ir para home', 'recomeçar', 'começar', 'ir para o começo',
        'retornar', 'página principal'
    ],
    'armario.html': [
        'armario', 'armário', 'meu armario', 'meu armário', 'guardaroupa',
        'roupas', 'minhas roupas', 'looks', 'meus looks', 'vestuário', 'peças', 'minhas peças',
        'combinações', 'closet', 'meu closet', 'guarda-roupa', 'ver armário', 'abrir armário',
        'organizar looks', 'ver looks'
    ],
    'sobre-projeto.html': [
        'projeto', 'sobre', 'sobre o projeto', 'informações', 'info',
        'detalhes', 'explicação', 'o que é', 'como funciona', 'objetivo', 'finalidade', 'escopo',
        'missão', 'visão', 'documentação', 'sobre nós', 'a respeito do projeto',
        'detalhes do projeto', 'qual o objetivo', 'para que serve','objetivo do projeto '
    ],
    'desenvolvedores.html': [
        'desenvolvedores', 'devs', 'quem fez', 'criadores', 'time',
        'equipe', 'créditos', 'autores', 'programadores', 'quem desenvolveu', 'equipe de desenvolvimento',
        'o time', 'membros', 'realizadores', 'nossa equipe', 'falar com os devs', 'contatar a equipe',
        'engenheiros de software', 'os responsáveis', 'ficha técnica','quem fez','responsáveis','responsaveis'
    ],
    'config.html': [
        'configurações', 'configuracoes', 'config', 'perfil', 'ajustes', 'opções',
        'minha conta', 'meu perfil', 'preferências', 'personalizar', 'painel de controle', 'ajustar',
        'dados da conta', 'minhas informações', 'editar perfil', 'mudar senha', 'alterar dados',
        'segurança', 'privacidade', 'notificações', 'definições'
    ],
    'redes.html': [
        'redes sociais', 'social', 'instagram', 'facebook', 'contato',
        'linkedin', 'twitter', 'x', 'youtube', 'tiktok', 'github', 'nos siga', 'mídias sociais',
        'comunidade', 'nossas redes', 'links sociais', 'acompanhe a gente', 'conectar',
        'fale conosco', 'mandar mensagem'
    ]
};


function buscarPagina(termo) {
    const termoFormatado = termo.trim().toLowerCase();
    let destinoEncontrado = null;

    for (const url in termosDeBusca) {
        if (termosDeBusca[url].includes(termoFormatado)) {
            destinoEncontrado = url;
            break;
        }
    }

    if (destinoEncontrado) {
        window.location.href = destinoEncontrado;
    } else {
        alert("Não encontramos resultados para: " + termo);
    }
}

formPesquisa.addEventListener('submit', function(event) {
    event.preventDefault();
    buscarPagina(inputPesquisa.value);
});