
// ---------- Home Page --------------


document.querySelector('.block_3_b_chats').onclick = () => {
    document.querySelector('.block_3_b_chats').classList.add('border1pxBlack')
///   
    document.querySelector('.block_3_b_orders').classList.remove('border1pxBlack')
    document.querySelector('.block_3_b_payments').classList.remove('border1pxBlack')
/////
    document.querySelector('.block_3_svg_1').style.display='block';
    document.querySelector('.block_3_svg_1_1').style.display='block';
///
    document.querySelector('.block_3_svg_2').style.display='none';
    document.querySelector('.block_3_svg_3').style.display='none';

    document.querySelector('.block_3_svg_2_2').style.display='none';
    document.querySelector('.block_3_svg_3_3').style.display='none';
}

document.querySelector('.block_3_b_orders').onclick = () => {
    document.querySelector('.block_3_b_orders').classList.add('border1pxBlack')
///    
    document.querySelector('.block_3_b_chats').classList.remove('border1pxBlack')
    document.querySelector('.block_3_b_payments').classList.remove('border1pxBlack')
/////
    document.querySelector('.block_3_svg_2').style.display='block';
    document.querySelector('.block_3_svg_2_2').style.display='block';
///
    document.querySelector('.block_3_svg_1').style.display='none';
    document.querySelector('.block_3_svg_3').style.display='none';

    document.querySelector('.block_3_svg_1_1').style.display='none';
    document.querySelector('.block_3_svg_3_3').style.display='none';
}

document.querySelector('.block_3_b_payments').onclick = () => {
    document.querySelector('.block_3_b_payments').classList.add('border1pxBlack')
///    
    document.querySelector('.block_3_b_orders').classList.remove('border1pxBlack')
    document.querySelector('.block_3_b_chats').classList.remove('border1pxBlack')
/////
    document.querySelector('.block_3_svg_3').style.display='block';
    document.querySelector('.block_3_svg_3_3').style.display='block';
///
    document.querySelector('.block_3_svg_1').style.display='none';
    document.querySelector('.block_3_svg_2').style.display='none';

    document.querySelector('.block_3_svg_1_1').style.display='none';
    document.querySelector('.block_3_svg_2_2').style.display='none';
}

// ---------- Home Page --------------

// ---------- MENU --------------

    document.querySelector('.menuButtom').onclick = () => {
        document.querySelector('.menu').style.display = 'block';
    }

    document.querySelector('.menuClose').onclick = () => {
        document.querySelector('.menu').style.display = 'none';
    }
// ---------- MENU --------------