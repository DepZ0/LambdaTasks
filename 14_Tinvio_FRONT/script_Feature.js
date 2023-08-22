// Создаем массив для хранения состояний ответов (открыто/закрыто)
const faqStates = Array(5).fill(false); 

// Функция для обработки клика на + или -
function toggleFAQ(index) {
    const faqContent = document.querySelector(`.faq_${index} p`);
    const faqButton = document.querySelector(`.faq_${index} .plus`);
    
    if (faqStates[index - 1]) {
        // Было открыто, теперь закрываем
        faqContent.style.display = 'none';
        faqButton.textContent = '+';
    } else {
        // Было закрыто, теперь открываем
        faqContent.style.display = 'block';
        faqButton.textContent = '-';
    }
    
    // Инвертируем состояние
    faqStates[index - 1] = !faqStates[index - 1];
}

// Назначаем обработчик для всех элементов .plus
for (let i = 1; i <= 5; i++) {
    document.querySelector(`.faq_${i} .plus`).onclick = () => {
        toggleFAQ(i);
    };
}
