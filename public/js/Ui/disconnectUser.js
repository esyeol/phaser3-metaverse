export default function disconnectUser(nickname){
    const userList = document.querySelector('#user-list');
    const delList = document.getElementById(nickname);
    delList.remove();

}