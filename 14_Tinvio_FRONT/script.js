
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