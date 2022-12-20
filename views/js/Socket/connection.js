// export default class connected {
//     constructor(){

//     }

//     // socket 서버 요청. cors error 위해 임시로 지정. 
//     const socket = io('ws://3.39.249.46:8080',{
//         cors: { origin: '*' }
//       });


// }
// const socket = io();
// console.log(socket.id);


// export default function connected() {
   
//     // let userId;
    
//     const socket = io('ws://3.39.249.46:8080',{
//         cors: { origin: '*' }});

//         // socket.emit("joinMeta","eyJhbGciOiJzaGEyNTYiLCJ0eXAiOiJKV1QifS57ImV4cCI6MTY3MDkyNDAwMiwiaWF0IjoxNjcwOTAyNDAyLCJVc2VyX0lEIjoiTXpJMCIsIlVfTmFtZSI6IjdabU43WU9jN0oyWSIsIlVfRW1haWwiOiJaMmhrZUc5a2JXeEFibUYyWlhJdVkyOXQiLCJUaW1lWm9uZSI6IkxURXkifS4xYmQ4OWM0ZDJkMjYzNzkzOTFkYTc3M2I5NDJmN2ExMzI3Y2U4NGE1YzJlZjIxNjJiOTQ0ZDRhYWNiMTM1MzIw");
//         // // 소켓 서버에서 복호화 실패시, 작업 내용 작성.
//         // socket.on('errorMsg',(data)=>{
//         //     console.log(` err : ${data}`)
//         // });
//         // // 소켓 서버에서 복호화 성공시, 작업 내용 작성.
//         // socket.on('succMeta',(data)=>{
//         //     console.log(`succ : ${data}`);
//         //     userId = data;
//         // });
        
//         return socket;
// } 


// socket 서버 요청. co`rs error 위해 임시로 지정. 
// const socket = io('ws://3.39.249.46:8080',{
//     cors: { origin: '*' }
// });

// // const socket = io();
// socket.on('test',(data)=> {
//     console.log('test');
//     console.log(data);
// });

// jwt 토큰값 소켓 서버로 전송.
// socket.emit("joinMetaverse","eyJhbGciOiJzaGEyNTYiLCJ0eXAiOiJKV1QifS57IlVzZXJfSUQiOiJNVEV3IiwiVV9OYW1lIjoiYUc5dVp6UT0iLCJVX0VtYWlsIjoiYUc5dVp6UkFibUYyWlhJdVkyOXQifS4yN2Y0Nzg5NjczYjFlNWRkYzZmNzRhZTI2NDRmNDQ4YmUzNzhkZmNjZmI0YzNmNTM3MzEyNTAzNTMzOTBkYjJi");

// /**
//  * 복호화된 paramater 값을 인자로 소켓서버에서 리턴받음. 
//  * @param {id} jwt 토큰에서 복호화한 user 테이블의 id value. 
//  * @param {email} jwt 토큰에서 복호화한 user 테이블의 email vlaue.
//  */
// socket.on('userData', (id,eamil) => {   
//     console.log(id);
//     console.log(eamil);
// });

// export default class socket{
//     constructor(){
//         this.socket=io();
//     }
// }





