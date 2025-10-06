document.addEventListener('DOMContentLoaded', () => {

    const elementosParaAnimar = [
        document.querySelector('#titulo-animado'),
        ...document.querySelectorAll('.teste_conteudo__conteudo p')
    ];

    const velocidade = 70; 

    function digitar(elemento, callback) {
        const texto = elemento.getAttribute('data-text');
        let i = 0;
        
        elemento.classList.add('digitando');

        function proximaLetra() {
            if (i < texto.length) {
                // ========= NOVA LÓGICA PARA RECONHECER HTML =========
                // Se o caractere atual for '<', significa que uma tag HTML começou
                if (texto.charAt(i) === '<') {
                    // Encontra a posição do '>' de fechamento da tag
                    const finalDaTag = texto.indexOf('>', i);
                    // Pega a tag inteira (ex: '<b class="negrito1">')
                    const tagCompleta = texto.substring(i, finalDaTag + 1);
                    // Adiciona a tag completa de uma vez ao HTML
                    elemento.innerHTML += tagCompleta;
                    // Pula o índice 'i' para o final da tag
                    i = finalDaTag;
                } else {
                    // Se não for uma tag, apenas adiciona a letra
                    elemento.innerHTML += texto.charAt(i);
                }
                // =======================================================

                i++;
                setTimeout(proximaLetra, velocidade);
            } else {
                elemento.classList.remove('digitando');
                if (callback) {
                    callback();
                }
            }
        }
        proximaLetra();
    }

    function animarEmSequencia(indice) {
        if (indice < elementosParaAnimar.length) {
            const elementoAtual = elementosParaAnimar[indice];
            digitar(elementoAtual, () => {
                animarEmSequencia(indice + 1);
            });
        }
    }

    animarEmSequencia(0);
});

/* SCRIPT REUTILIZÁVEL PARA ANIMAR TÍTULOS DE PÁGINA */
document.addEventListener('DOMContentLoaded', () => {

    // Procura por um elemento na página com a classe 'titulo-animado'
    const elementoParaAnimar = document.querySelector('.titulo-animado');

    // Se encontrar o elemento, inicia a animação
    if (elementoParaAnimar) {
        const texto = elementoParaAnimar.getAttribute('data-text');
        const velocidade = 120; // Ajuste a velocidade se quiser

        function digitar(elemento, texto, i = 0) {
            if (i === 0) {
                elemento.classList.add('digitando'); // Adiciona o cursor no início
            }

            if (i < texto.length) {
                elemento.innerHTML += texto.charAt(i);
                setTimeout(() => digitar(elemento, texto, i + 1), velocidade);
            } else {
                elemento.classList.remove('digitando'); // Remove o cursor no final
            }
        }

        // Inicia a animação
        digitar(elementoParaAnimar, texto);
    }
});