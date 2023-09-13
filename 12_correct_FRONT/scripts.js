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

document.querySelector('.textForOrder').oninput = () => {costCalculation()}

// -------------------------------------------
// ------------- PLACEHOLDERS ----------------
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
// ----------
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
// ----------

document.querySelector('.languageActive').hidden = true;
document.querySelector('.selectOfLang').onclick = () => {
    placeholderForSelectorOfLanguage();
    document.querySelector('.languageActive').classList.add('textColor');
}

document.querySelector('html').onmouseup = () => {
    document.querySelector('.serviceActive').classList.remove('textColor');
    document.querySelector('.languageActive').classList.remove('textColor');
    document.querySelector('.emailActive').classList.remove('textColor');
    document.querySelector('.commentActive').classList.remove('textColor');
    document.querySelector('.nameActive').classList.remove('textColor');
}
// ----------

// emailActive
document.querySelector('.in1').oninput = () => {
    if (document.querySelector('.in1').value.length > 0) {
    document.querySelector('.emailActive').classList.add('textColor')
    document.querySelector('.emailActive').style.display = 'block';
    } else {
        document.querySelector('.emailActive').style.display = 'none';
    }
}

// commentActive
document.querySelector('.in2').oninput = () => {
    if (document.querySelector('.in2').value.length > 0) {
    document.querySelector('.commentActive').classList.add('textColor')
    document.querySelector('.commentActive').style.display = 'block';
    } else {
        document.querySelector('.commentActive').style.display = 'none';
    }    
}

// nameActive
document.querySelector('.in3').oninput = () => {
    if (document.querySelector('.in3').value.length > 0) {
    document.querySelector('.nameActive').classList.add('textColor')
    document.querySelector('.nameActive').style.display = 'block';
    } else {
        document.querySelector('.nameActive').style.display = 'none';
    }
}

// ------------- PLACEHOLDERS END ------------
// -------------------------------------------


// ---------------------------------------------------------------

// function postData() {
//     const textForOrder = document.querySelector('.textForOrder').value.length;
//     const email = document.querySelector('.in1').value;
//     const comment = document.querySelector('.in2').value;
//     const username = document.querySelector('.in3').value;
//     const lang = document.querySelector('.selectOfLang').value;
//     const ext = document.querySelector('.selectOfExt').value;

//     const url = "http://localhost:3000/cost-calculation";
//     const data = {
//         language: "en",
//         mimetype: "docx",
//         count: 120000,
//         name: "Alex",
//         email: "alex@gmail.com",
//         comment: "Okay"
//       };
    
//     fetch(url, {
//       method: "POST",
//       mode: "no-cors",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//       .then(result => {
//         console.log("Response:", result);
//       })
//       .catch(error => {
//         console.error("Error:", error);
//       });
    
//   }
  
//   document.querySelector('.orderButton').onclick = () => {postData()}

// async function postData() {

//     const textForOrder = document.querySelector('.textForOrder').value.length;
//     const email = document.querySelector('.in1').value;
//     const comment = document.querySelector('.in2').value;
//     const username = document.querySelector('.in3').value;
//     const lang = document.querySelector('.selectOfLang').value;
//     const ext = document.querySelector('.selectOfExt').value;

//     const url = "http://localhost:3000/cost-calculation";
//     const data = {
//       language: lang,
//       mimetype: ext,
//       count: textForOrder,
//       name: username,
//       email: email,
//       comment: comment
//     };

//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: "POST", // *GET, POST, PUT, DELETE, etc.
//       mode: "no-cors", // no-cors, *cors, same-origin
//       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: "same-origin", // include, *same-origin, omit
//       headers: {
//         "Content-Type": "application/json",
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: "follow", // manual, *follow, error
//       referrerPolicy: "no-referrer", // no-referrer, *client
//       body: JSON.stringify(data), // body data type must match "Content-Type" header
//     });
//     return await response.json(); // parses JSON response into native JavaScript objects
//   };
  
  




//  document.querySelector('.orderButton').onclick = () => {
    
//     console.log(postData())
// };