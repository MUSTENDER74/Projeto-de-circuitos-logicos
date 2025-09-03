const formPesquisa = document.getElementById('formPesquisa');
const inputPesquisa = formPesquisa.querySelector('.input-pesquisa');

const termosDeBusca = {
    'index.html': [
        'inicio', 'início', 'home', 'pagina inicial', 'página inicial', 'aba inicio', 'botão inicio',
        'principal', 'tela inicial', 'menu principal', 'começo', 'voltar', 'painel', 'dashboard',
        'capa', 'voltar ao inicio', 'ir para home', 'recomeçar', 'começar', 'ir para o começo',
        'retornar', 'página principal', 'portal', 'entrada', 'home page', 'vista geral', 'resumo',
        'central', 'ponto de partida', 'reiniciar', 'guia principal', 'acesso rápido', 'área de trabalho',
        'plataforma', 'primeira página', 'front page', 'tela de boas-vindas', 'menu inicial', 'recomeço',
        'navegação', 'sumário', 'painel principal', 'página de aterrissagem', 'tela principal', 'desktop',
        'ponto central', 'hub', 'índice', 'menu de navegação', 'voltar ao começo', 'raiz', 'ambiente inicial'
    ],

    'sobre-projeto.html': [
        'projeto', 'sobre', 'sobre o projeto', 'informações', 'info',
        'detalhes', 'explicação', 'o que é', 'como funciona', 'objetivo', 'finalidade', 'escopo',
        'missão', 'visão', 'documentação', 'sobre nós', 'a respeito do projeto',
        'detalhes do projeto', 'qual o objetivo', 'para que serve', 'objetivo do projeto', 'propósito',
        'conceito', 'fundamentos', 'iniciativa', 'proposta', 'o que fazemos', 'como surgiu', 'história',
        'guia', 'manual', 'apresentação', 'contexto', 'declaração', 'valores', 'metodologia',
        'consiste', 'descrição', 'o porquê', 'justificativa', 'sobre a iniciativa', 'premissa',
        'briefing', 'o porquê do projeto', 'nosso manifesto', 'entenda a ideia', 'base do projeto',
        'sumário executivo', 'concepção', 'sobre a ferramenta', 'nossa filosofia'
    ],
    'desenvolvedores.html': [
        'desenvolvedores', 'devs', 'quem fez', 'criadores', 'time',
        'equipe', 'créditos', 'autores', 'programadores', 'quem desenvolveu', 'equipe de desenvolvimento',
        'o time', 'membros', 'realizadores', 'nossa equipe', 'falar com os devs', 'contatar a equipe',
        'engenheiros de software', 'os responsáveis', 'ficha técnica', 'responsáveis', 'construtores',
        'idealizadores', 'colaboradores', 'participantes', 'staff', 'a equipe por trás', 'mentes por trás',
        'quem somos', 'o squad', 'grupo', 'contribuidores', 'produtores', 'autoria', 'expediente',
        'quem produziu', 'realização', 'equipe técnica', 'cérebros', 'nosso time', 'os criadores',
        'mentes criativas', 'engenheiros', 'a turma', 'quem está por trás', 'contato da equipe',
        'desenvolvimento', 'a companhia', 'os arquitetos', 'painel de créditos', 'equipe de criação'
    ],
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