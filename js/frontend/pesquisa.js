// Usamos uma função anônima para encapsular nosso código e proteger o escopo global.
(function() {
    const formPesquisa = document.getElementById('formPesquisa');
    if (!formPesquisa) return; // Se o formulário não existir, para a execução.

    const inputPesquisa = formPesquisa.querySelector('.input-pesquisa');

    // Listas de palavras-chave expandidas e corrigidas
    const termosDeBusca = {
        'index.html': [
            // Termos Principais
            'inicio', 'início', 'home', 'principal', 'começo', 'começar', 'iniciar', 'voltar', 'retornar', 'recomeçar',
            'página inicial', 'pagina inicial', 'tela inicial', 'menu principal', 'capa', 'portal', 'entrada',
            // Sinônimos e Conceitos
            'painel', 'dashboard', 'resumo', 'central', 'hub', 'índice', 'raiz', 'sumário', 'visão geral', 'vista geral',
            'ponto de partida', 'guia principal', 'acesso rápido', 'área de trabalho', 'plataforma', 'front page',
            'tela de boas-vindas', 'menu inicial', 'navegação', 'página de aterrissagem', 'tela principal', 'desktop',
            'ambiente inicial', 'apresentação', 'geral', 'tudo', 'conteúdo', 'site todo', 'mapa do site',
            // Ações do Usuário
            'ir para home', 'voltar ao inicio', 'voltar para o começo', 'ir para o começo', 'quero voltar',
            // Erros Comuns
            'inico', 'inicoo', 'home page', 'comecar', 'volta', 'inicair', 'principal', 'hme', 'incio',
            // Termos em Inglês
            'start', 'main', 'main page', 'beginning', 'front', 'cover', 'go back', 'reset', 'overview'
        ],
        'sobre-projeto.html': [
            // Termos Principais
            'projeto', 'sobre', 'sobre o projeto', 'ideia', 'idéia do projeto', 'informações', 'info', 'detalhes',
            'explicação', 'objetivo', 'propósito', 'finalidade', 'escopo', 'proposta', 'conceito', 'documentação',
            // Sinônimos e Conceitos
            'o que é', 'como funciona', 'para que serve', 'missão', 'visão', 'valores', 'fundamentos', 'iniciativa',
            'história', 'contexto', 'metodologia', 'descrição', 'justificativa', 'premissa', 'briefing', 'concepção',
            'filosofia', 'sumário executivo', 'a respeito do projeto', 'base do projeto', 'entenda a ideia',
            'sobre a ferramenta', 'declaração', 'manifesto', 'guia', 'manual', 'apresentação', 'sobre a iniciativa',
            'ods', 'objetivos de desenvolvimento sustentável', 'agenda 2030', 'ods 9', 'inovação', 'infraestrutura',
            // Ações do Usuário
            'qual o objetivo', 'o porquê do projeto', 'quero saber mais', 'mais detalhes', 'ler sobre',
            // Erros Comuns
            'pojeto', 'sobr', 'detalhe', 'informacoes', 'esplicacao', 'objetvo', 'proposito', 'ideia',
            // Termos em Inglês
            'project', 'about', 'about the project', 'information', 'details', 'explanation', 'goal', 'purpose', 'scope'
        ],
        'Criaçao.html': [
            // Termos Principais
            'criação', 'criacao', 'o projeto', 'desenvolvimento', 'construção', 'fases', 'etapas', 'processo',
            'como foi feito', 'montagem', 'fabricação', 'implementação', 'execução', 'andamento',
            // Sinônimos e Conceitos
            'jornada', 'passo a passo', 'making of', 'bastidores', 'pesquisa', 'planejamento', 'prototipagem',
            'programação', 'calibragem', 'hardware', 'software', 'componentes', 'peças', 'eletrônica', 'mecânica',
            'detalhes técnicos', 'tecnologia', 'arduino', 'grbl', 'cnc shield', 'motores de passo', 'nema 17',
            'estrutura', 'perfis de alumínio', 'g-code', 'firmware', 'calibração',
            // Ações do Usuário
            'ver o andamento', 'etapas do projeto', 'como construíram', 'making of do projeto', 'ver a criação',
            // Erros Comuns
            'criacão', 'criacão', 'desenvolvimiento', 'procesos', 'faze', 'etapa', 'hardwere', 'softwere',
            // Termos em Inglês
            'creation', 'development', 'making of', 'the project', 'how it was made', 'build process', 'steps', 'phases'
        ],
        'desenvolvedores.html': [
            // Termos Principais
            'desenvolvedores', 'devs', 'criadores', 'autores', 'time', 'equipe', 'créditos', 'programadores',
            'quem fez', 'quem desenvolveu', 'equipe de desenvolvimento', 'membros', 'grupo', 'contato',
            // Sinônimos e Conceitos
            'realizadores', 'construtores', 'idealizadores', 'colaboradores', 'participantes', 'staff',
            'mentes por trás', 'quem somos', 'squad', 'contribuidores', 'produtores', 'autoria', 'expediente',
 'realização', 'equipe técnica', 'mentes criativas', 'engenheiros', 'os responsáveis', 'ficha técnica',
            'painel de créditos', 'equipe de criação', 'os arquitetos do projeto',
            // Ações do Usuário
            'falar com os devs', 'contatar a equipe', 'quem está por trás', 'quem são os criadores',
            // Erros Comuns
            'desenvoledores', 'desenvolvedors', 'dev', 'criador', 'autores', 'time', 'equpe', 'creditos',
            // Termos em Inglês
            'developers', 'devs', 'creators', 'authors', 'team', 'credits', 'programmers', 'who made this', 'the team'
        ]
    };

    /**
     * @param {string} termo O termo digitado pelo usuário.
     */
    function buscarPagina(termo) {
        const termoFormatado = termo.trim().toLowerCase();
        let destinoEncontrado = null;

        if (termoFormatado === '') {
            return; // Não faz nada se a busca for vazia
        }

        for (const url in termosDeBusca) {
            if (termosDeBusca[url].includes(termoFormatado)) {
                destinoEncontrado = url;
                break;
            }
        }

        if (destinoEncontrado) {
            // Se a página atual já for o destino, não faz nada
            if (window.location.pathname.endsWith(destinoEncontrado)) {
                return;
            }
            window.location.href = destinoEncontrado;
        } else {
            // Feedback visual de erro
            inputPesquisa.value = ''; // Limpa o campo
            inputPesquisa.placeholder = 'Nada encontrado...';
            formPesquisa.classList.add('erro-pesquisa');

            // Remove a classe de erro após a animação terminar
            setTimeout(() => {
                formPesquisa.classList.remove('erro-pesquisa');
                inputPesquisa.placeholder = 'Barra de pesquisa...';
            }, 1000);
        }
    }

    formPesquisa.addEventListener('submit', function(event) {
        event.preventDefault();
        buscarPagina(inputPesquisa.value);
    });

})();