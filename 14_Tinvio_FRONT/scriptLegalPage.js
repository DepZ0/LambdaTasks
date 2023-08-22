

document.querySelector('.PrivatPolicyButton').onclick = () => {
//
    document.querySelector('.PrivatPolicyButton').classList.add('buttonTextColorRed');
    document.querySelector('.line_1').classList.add('line_active');
    document.querySelector('.textBlock_1').style.display='block';
    document.querySelector('footer').style.top='4800px';
    //---
    document.querySelector('.TermsButton').classList.remove('buttonTextColorRed');
    document.querySelector('.line_2').classList.remove('line_active');
    document.querySelector('.textBlock_2').style.display='none';

}
/////////////////////////////////////////////////////////////////////////////////////////////
document.querySelector('.TermsButton').onclick = () => {
//
    document.querySelector('.TermsButton').classList.add('buttonTextColorRed');
    document.querySelector('.line_2').classList.add('line_active');
    document.querySelector('.textBlock_2').style.display='block';
    //---
    document.querySelector('.PrivatPolicyButton').classList.remove('buttonTextColorRed');
    document.querySelector('.line_1').classList.remove('line_active');
    document.querySelector('.textBlock_1').style.display='none';
    document.querySelector('footer').style.top='5850px';
}