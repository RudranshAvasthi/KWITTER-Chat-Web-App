//YOUR FIREBASE LINKS
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
user_name = localStorage.getItem("username_key");
room_name = localStorage.getItem("roomname_key");

function send_message() {
      msg = document.getElementById("user_message").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0

      });
      document.getElementById("user_message").value="";

}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        subfolder_id = childKey;
                        message_data = childData;
                        //Start code
                        u_name = message_data["name"];
                        u_msg = message_data["message"];
                        u_like = message_data["like"];
                        console.log(u_like);
                        name_tag = '<h4>' + u_name + '<img src="tick.png" class="user_tick"></h4>';
                        msg_tag = '<h4 class="message_h4">' + u_msg + '</h4>';
                        btn_start_tag = '<button class="btn btn-warning" onclick="update_likes(this.id)" id="' + subfolder_id + '"value="' + u_like + '">';
                        btn_end_tag = "<span class='glyphicon glyphicon-thumbs-up'> like:" + u_like + "</span> </button> <hr>";
                        row = name_tag + msg_tag + btn_start_tag + btn_end_tag;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}

function update_likes(subfolder_name) {
      Number_likes = Number(document.getElementById(subfolder_name).value);
      Number_likes = Number_likes + 1;
      firebase.database().ref(room_name).child(subfolder_name).update({
            like: Number_likes
      });
}
getData();

function logout() {
      localStorage.removeItem("username_key");
      localStorage.removeItem("roomname_key");
      window.location = "index.html";
}