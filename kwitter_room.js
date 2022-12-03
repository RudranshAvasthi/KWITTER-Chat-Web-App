var firebaseConfig = {
      apiKey: "AIzaSyAGFyaBAnFNbMyUUJASuqPsXjng08nrpQ4",
      authDomain: "kwitterdb-ee5f6.firebaseapp.com",
      databaseURL: "https://kwitterdb-ee5f6-default-rtdb.firebaseio.com",
      projectId: "kwitterdb-ee5f6",
      storageBucket: "kwitterdb-ee5f6.appspot.com",
      messagingSenderId: "359892765750",
      appId: "1:359892765750:web:22c890bb7d18b802d51c97"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names);
                  row="<div class='room_name' id='"+ Room_names + "' onclick='redirect_room(this.id)'>"+Room_names+"</div> <hr>";
                  document.getElementById("output").innerHTML+=row;
                  //End code
            });
      });
}
function redirect_room(room_id){
      console.log(room_id);
      localStorage.setItem("roomname_key",room_id);
      window.location="kwitter_page.html";
}

getData();
username = localStorage.getItem("username_key");
document.getElementById("welcome").innerHTML = "welcome " + username;

function addroom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room"
      });
      localStorage.setItem("roomname_key", room_name);
      window.location = "kwitter_page.html";
}
function logout(){
    localStorage.removeItem("username_key");
    localStorage.removeItem("roomname_key"); 
    window.location = "index.html";
}