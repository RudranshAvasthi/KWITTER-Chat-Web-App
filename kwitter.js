function add_user(){
username=document.getElementById("user_name").value;
localStorage.setItem("username_key",username);
window.location="kwitter_room.html";

}