const sideMenu = document.querySelector('#side-menu');
// metaverse 내부 서랍버튼 클릭시 활성화.
const openMenu=()=> {
    sideMenu.classList.remove('right-[-320px]');
    sideMenu.classList.add('right-0');
}
// X 버튼 눌렀을 때, 서랍 닫는 기능.
const closeMenu=()=>{
    sideMenu.classList.remove('right-0');
    sideMenu.classList.add('right-[-320px]');
}