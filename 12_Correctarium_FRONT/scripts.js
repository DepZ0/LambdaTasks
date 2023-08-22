const workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const workingHours = { start: 10, end: 19 };
const ukrLangCost = 0.05; // За 1 символ.
const engLangCost = 0.12; // За 1 символ.
const minUkrRuCost = 50;
const minEngKyUzLaCost = 120;

function costCalculation() {
       
    const service = document.querySelector('.selectOfService').value;
    const textForOrder = document.querySelector('.textForOrder').value;
    const email = document.querySelector('.in1').value;
    const comment = document.querySelector('.in2').value;
    const username = document.querySelector('.in3').value;
    const lang = document.querySelector('.selectOfLang').value;

    let count = 0;
    let finalCost = '';
    let grnText = '';

    let strOfTextOrder = textForOrder.length;
    if (service == 'value1' && email != '' && username != '') {
        
        if (lang == 'ukr') {
            count += ukrLangCost * strOfTextOrder;
        } if (lang == 'eng') {
            count += engLangCost * strOfTextOrder
        } if (lang == 'ru') {
            count += ukrLangCost * strOfTextOrder;
        }
        
        if (lang == 'ukr' && count < minUkrRuCost) {
            count = minUkrRuCost
        } 
        if (lang == 'ru' && count < minUkrRuCost) {
            count = minUkrRuCost
        } 
        if (lang == 'eng' && count < minEngKyUzLaCost) {
            count = minEngKyUzLaCost
        }
            finalCost = Number(Math.floor(count));
            grnText = 'грн'
    } else {
      finalCost = '';
        grnText = 'Заповніть всі поля';
    }






    document.querySelector('.orderPrice').textContent = finalCost;
    document.querySelector('.orderPriceText').textContent = grnText;
}

document.querySelector('.orderButton').onclick = () => {costCalculation()}



// ---------------------------------------------

function placeholderForSelectorOfService () {
    const docOfSelectService = document.querySelector('.selectOfService').value;
    const docOfServiceText = document.querySelector('.serviceActive');
    if (docOfSelectService == 'value1') {
        docOfServiceText.hidden = false;
    }
}
document.querySelector('.serviceActive').hidden = true;
document.querySelector('.selectOfService').onclick = () => {
    placeholderForSelectorOfService();
    document.querySelector('.serviceActive').classList.add('textColor');
}

function placeholderForSelectorOfLanguage () {
    const docOfSelectLanguage = document.querySelector('.selectOfLang').value;
    const docOfLanguageText = document.querySelector('.languageActive');
    if (docOfSelectLanguage == 'ukr' ||
        docOfSelectLanguage == 'ru' ||
        docOfSelectLanguage == 'eng'
     ) {
        docOfLanguageText.hidden = false;
    }
}
document.querySelector('.languageActive').hidden = true;
document.querySelector('.selectOfLang').onclick = () => {
    placeholderForSelectorOfLanguage();
    document.querySelector('.languageActive').classList.add('textColor');
}

document.querySelector('html').onmouseup = () => {
    document.querySelector('.serviceActive').classList.remove('textColor');
    document.querySelector('.languageActive').classList.remove('textColor');
}