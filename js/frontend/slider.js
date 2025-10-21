let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function(){
    nextImage();
}, 4050); 

function nextImage(){
    count++;
    if(count > 6){
        count = 1;
    }
    document.getElementById("radio" + count).checked = true;
}

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os botões e os inputs de rádio
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const radioButtons = document.querySelectorAll('input[name="radio-btn"]');
    const totalSlides = radioButtons.length;

    // Função para encontrar o índice do slide atual
    function getCurrentSlideIndex() {
        let currentIndex = 0;
        radioButtons.forEach((radio, index) => {
            if (radio.checked) {
                currentIndex = index;
            }
        });
        return currentIndex;
    }

    // Evento para o botão "Próximo"
    nextBtn.addEventListener('click', () => {
        let currentIndex = getCurrentSlideIndex();
        // Calcula o próximo índice, voltando para o início se chegar ao fim
        let nextIndex = (currentIndex + 1) % totalSlides;
        radioButtons[nextIndex].checked = true;
    });

    // Evento para o botão "Anterior"
    prevBtn.addEventListener('click', () => {
        let currentIndex = getCurrentSlideIndex();
        // Calcula o índice anterior, indo para o fim se estiver no início
        let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        radioButtons[prevIndex].checked = true;
    });
});