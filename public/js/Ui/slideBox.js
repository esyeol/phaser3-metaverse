const sideMenu = document.querySelector('#side-menu');
const chatMenu = document.querySelector('#chat-menu');

// metaverse 내부 서랍버튼 클릭시 활성화.
const showMenu=()=> {
    closeChat();
    sideMenu.classList.remove('right-[-320px]');
    sideMenu.classList.add('right-0');
}
// X 버튼 눌렀을 때, view 제거.
const closeMenu=()=>{
    sideMenu.classList.remove('right-0');
    sideMenu.classList.add('right-[-320px]');
}
// 채팅 버튼 클릭시 활성화.
const showChat=()=> {
    closeMenu();
    chatMenu.classList.remove('right-[-320px]');
    chatMenu.classList.add('right-0');
}
// 채팅: X 버튼 눌렀을 때, 제거.
const closeChat = () =>{
    chatMenu.classList.remove('right-0');
    chatMenu.classList.add('right-[-320px]');
}

// close canvas-board
const closeModal =() => {
    document.querySelector('#board-menu').classList.add("hidden");
  }





