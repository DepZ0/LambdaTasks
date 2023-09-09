
// ---------- Home Page --------------


document.querySelector('.block_3_b_chats').onclick = () => {
    document.querySelector('.block_3_b_chats').classList.add('border1pxBlack')
///   
    document.querySelector('.block_3_b_orders').classList.remove('border1pxBlack')
    document.querySelector('.block_3_b_payments').classList.remove('border1pxBlack')
/////
    document.querySelector('.block_3_switch_buddy').style.display='block';
    document.querySelector('.block_3_rightSide_budyy').style.display='block';
///
    document.querySelector('.block_3_switch_speedy').style.display='none';
    document.querySelector('.block_3_rightSide_speedy').style.display='none';

    document.querySelector('.block_3_switch_money').style.display='none';
    document.querySelector('.block_3_rightSide_money').style.display='none';
}

document.querySelector('.block_3_b_orders').onclick = () => {
    document.querySelector('.block_3_b_orders').classList.add('border1pxBlack')
///    
    document.querySelector('.block_3_b_chats').classList.remove('border1pxBlack')
    document.querySelector('.block_3_b_payments').classList.remove('border1pxBlack')
/////
    document.querySelector('.block_3_switch_speedy').style.display='block';
    document.querySelector('.block_3_rightSide_speedy').style.display='block';
///
    document.querySelector('.block_3_switch_buddy').style.display='none';
    document.querySelector('.block_3_rightSide_budyy').style.display='none';

    document.querySelector('.block_3_switch_money').style.display='none';
    document.querySelector('.block_3_rightSide_money').style.display='none';
}

document.querySelector('.block_3_b_payments').onclick = () => {
    document.querySelector('.block_3_b_payments').classList.add('border1pxBlack')
///    
    document.querySelector('.block_3_b_orders').classList.remove('border1pxBlack')
    document.querySelector('.block_3_b_chats').classList.remove('border1pxBlack')
/////
    document.querySelector('.block_3_switch_money').style.display='block';
    document.querySelector('.block_3_rightSide_money').style.display='block';
///
    document.querySelector('.block_3_switch_buddy').style.display='none';
    document.querySelector('.block_3_rightSide_budyy').style.display='none';

    document.querySelector('.block_3_switch_speedy').style.display='none';
    document.querySelector('.block_3_rightSide_speedy').style.display='none';
}

// ---------- Home Page --------------

// ---------- MENU --------------

    // document.querySelector('.menuButtom').onclick = () => {
    //     document.querySelector('.menu').style.display = 'block';
    // }

    // document.querySelector('.menuClose').onclick = () => {
    //     document.querySelector('.menu').style.display = 'none';
    // }
// ---------- MENU --------------


// ---------- Selector Of Language --------------


let isLanguageListOpen = false;

document.querySelector('.languageActive').onclick = () => {
    const languageList = document.querySelector('.languageList');
    const languageSelectorArrow = document.querySelector('.languageSelectorArrow');
    
    if (isLanguageListOpen) {
        // Если список открыт, закрываем его
        languageList.style.display = 'none';
        languageSelectorArrow.style.transform = 'rotate(0deg)';
        isLanguageListOpen = false;
    } else {
        // Если список закрыт, открываем его
        languageList.style.display = 'block';
        languageSelectorArrow.style.transform = 'rotate(180deg)';
        isLanguageListOpen = true;
    }
}

let selectedLanguage = 'en';
const languageList = ['.languageBritannia', '.languagePoland', '.languageThailand', '.languageChina'];

document.querySelector(languageList[0]).onclick = () => {
    document.querySelector('.languageActive').textContent = 'EN';
    document.querySelector('.languageList').style.display = 'none';
    document.querySelector('.languageSelectorArrow').style.transform = 'rotate(0deg)';

    isLanguageListOpen = false;
    selectedLanguage = 'en'
}

document.querySelector(languageList[1]).onclick = () => {
    document.querySelector('.languageActive').textContent = 'PL';
    document.querySelector('.languageList').style.display = 'none';
    document.querySelector('.languageSelectorArrow').style.transform = 'rotate(0deg)';

    isLanguageListOpen = false;
    selectedLanguage = 'pl'
}

document.querySelector(languageList[2]).onclick = () => {
    document.querySelector('.languageActive').textContent = 'TH';
    document.querySelector('.languageList').style.display = 'none';
    document.querySelector('.languageSelectorArrow').style.transform = 'rotate(0deg)';

    isLanguageListOpen = false;
    selectedLanguage = 'th'
}

document.querySelector(languageList[3]).onclick = () => {
    document.querySelector('.languageActive').textContent = 'CH';
    document.querySelector('.languageList').style.display = 'none';
    document.querySelector('.languageSelectorArrow').style.transform = 'rotate(0deg)';

    isLanguageListOpen = false;
    selectedLanguage = 'ch'
}



// ---------- SLIDER -----------

const imagesSqueres = document.querySelectorAll('.block_5_squere_for_slides');
let count = 0; // переменная, которая указывает на номер активного изображения в images

const next = document.querySelector('.block_5_slider_button_right');
next.onclick = nextFunction;

const prev = document.querySelector('.block_5_slider_button_left');
prev.onclick = prevFunction;

function nextFunction() {
if (count + 1 < imagesSqueres.length) {
  count++;
} else {count = 0;}
for ( i = 0; i < imagesSqueres.length; i++) {
    imagesSqueres[i].classList.remove('block_5_squre_active');
}
// -------------
imagesSqueres[count].classList.add('block_5_squre_active');

document.querySelector('.block_5_slides').src = `public/block_5_slide_${count}.svg`;
}

function prevFunction() {
  if (count - 1 >= 0) {
    count--;
  } else {count = imagesSqueres.length - 1;}
  for (i = 0; i < imagesSqueres.length; i++) {
    imagesSqueres[i].classList.remove('block_5_squre_active');
  }
  // -------------
  imagesSqueres[count].classList.add('block_5_squre_active');
  document.querySelector('.block_5_slides').src = `public/block_5_slide_${count}.svg`;
}