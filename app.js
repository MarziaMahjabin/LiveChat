// Selectors
let chatList = document.querySelector('.chat_list');
let chatInput = document.querySelector('.chatBox');
let all_chat = document.querySelector('.all_chat')
let ourForm = document.querySelector('.ourForm')
let chatPname = prompt("What's your name?");



//get data
db.collection('chats').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
  let unsub = snapshot.docChanges().forEach(change => {
    if (change.type === "added") {
      let html = `
        <div class="chat-div col-sm-12">
          <li class="col-sm-2 pName">${change.doc.data().person}</li>
          <li class= "col-sm-1 chatUser"><i class="fas fa-user-circle"></i></li>
          <li class="col-sm-5 chat" >${change.doc.data().message}</li>
        </div>
      `
      all_chat.innerHTML += html
    }
  })
  return unsub
});

ourForm.addEventListener('submit', e => {
  e.preventDefault();
  if(chatInput.value){
    db.collection("chats").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: chatInput.value,
      person: chatPname
    })
      chatInput.value='';
  }
});
