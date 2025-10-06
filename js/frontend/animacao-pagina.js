document.addEventListener('DOMContentLoaded', () => {

    // =============================================================================
    // 1. FUNÇÕES DE ANIMAÇÃO (Nossas ferramentas)
    // =============================================================================

    /**
     * Anima o título principal de uma página, letra por letra.
     * @param {HTMLElement} container - O elemento <main> da página.
     */
    function animarTituloUnico(container) {
        const elemento = container.querySelector('.titulo-animado');
        if (elemento) {
            const texto = elemento.getAttribute('data-text');
            const velocidade = 120;
            elemento.innerHTML = '';
            
            function digitar(i = 0) {
                if (i === 0) elemento.classList.add('digitando');
                if (i < texto.length) {
                    elemento.innerHTML += texto.charAt(i);
                    setTimeout(() => digitar(i + 1), velocidade);
                } else {
                    elemento.classList.remove('digitando');
                }
            }
            digitar();
        }
    }

    /**
     * Anima múltiplos elementos em sequência (usado na página inicial).
     * @param {HTMLElement} container - O elemento <main> da página.
     */
    function animarSequencia(container) {
        const elementos = [
            container.querySelector('#titulo-animado'),
            ...container.querySelectorAll('.teste_conteudo__conteudo p')
        ];
        const velocidade = 50;

        function digitar(el, callback) {
            const texto = el.getAttribute('data-text');
            if (!texto || texto.trim() === '') {
                if (callback) callback();
                return;
            }
            el.innerHTML = '';
            el.classList.add('digitando');
            let i = 0;
            
            function proximaLetra() {
                if (i < texto.length) {
                    el.innerHTML += texto.charAt(i);
                    i++;
                    setTimeout(proximaLetra, velocidade);
                } else {
                    el.classList.remove('digitando');
                    if (callback) callback();
                }
            }
            proximaLetra();
        }

        function animar(indice) {
            if (indice < elementos.length) {
                digitar(elementos[indice], () => animar(indice + 1));
            }
        }
        animar(0);
    }
    
    /**
     * "Roteador" que decide qual animação executar com base no namespace da página.
     * @param {HTMLElement} container - O elemento <main> da página.
     */
    function iniciarAnimacoesDaPagina(container) {
        if (!container) return;
        const namespace = container.dataset.barbaNamespace;
        if (namespace === 'home') {
            animarSequencia(container);
        } else if (namespace === 'projeto' || namespace === 'criacao' || namespace === 'desenvolvedores') {
            animarTituloUnico(container);
        }
    }

    // =============================================================================
    // 2. CONFIGURAÇÃO DO BARBA.JS (Onde a transição acontece)
    // =============================================================================

    const transicaoEl = document.querySelector('.onda-transicao');
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    barba.init({
    sync: true,
    transitions: [{
        async leave(data) {
            const done = this.async();

            transicaoEl.classList.add('transicao-ativa');
            
            await delay(800); 
            
            // Libera a troca de página ENQUANTO a animação ainda está rodando
            done();
        },
        enter(data) {
            // A animação de saída já está acontecendo sozinha graças ao CSS.
            // Apenas iniciamos as animações da nova página.
            iniciarAnimacoesDaPagina(data.next.container);

            // Adicionamos um listener para limpar a classe da animação QUANDO ela terminar,
            // preparando para a próxima transição.
            transicaoEl.addEventListener('animationend', () => {
                transicaoEl.classList.remove('transicao-ativa');
            }, { once: true });
        }
    }]
});
    // =============================================================================
    // 3. INICIALIZAÇÃO (Faz a animação funcionar na primeira página)
    // =============================================================================
    
    iniciarAnimacoesDaPagina(document.querySelector('[data-barba="container"]'));
});