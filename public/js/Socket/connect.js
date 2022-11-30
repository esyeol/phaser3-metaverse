// socket 서버 요청. cors error 위해 임시로 지정. 
const socket = io('ws://3.39.249.46:8080',{
    cors: { origin: '*' }
});

socket.on('connect',()=> {
    console.log('test');
});

// jwt 토큰값 소켓 서버로 전송.
socket.emit("joinMetaverse","eyJhbGciOiJzaGEyNTYiLCJ0eXAiOiJKV1QifS57IlVzZXJfSUQiOiJNVEV3IiwiVV9OYW1lIjoiYUc5dVp6UT0iLCJVX0VtYWlsIjoiYUc5dVp6UkFibUYyWlhJdVkyOXQifS4yN2Y0Nzg5NjczYjFlNWRkYzZmNzRhZTI2NDRmNDQ4YmUzNzhkZmNjZmI0YzNmNTM3MzEyNTAzNTMzOTBkYjJi");

/**
 * 복호화된 paramater 값을 인자로 소켓서버에서 리턴받음. 
 * @param {id} jwt 토큰에서 복호화한 user 테이블의 id value. 
 * @param {email} jwt 토큰에서 복호화한 user 테이블의 email vlaue.
 */
socket.on('userData', (id,eamil) => {   
    console.log(id);
    console.log(eamil);
});

