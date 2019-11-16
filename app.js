// console.log('connect to app.js');

const signUpButton = document.getElementById('register-btn');

signUpButton.addEventListener('click', function (event) {
 // alert('Element clicked through function!');
 event.preventDefault()

 let mail = document.getElementById("register-email").value;
 let pwd = document.getElementById("register-password").value;
 let uname = document.getElementById("register-username").value;
 console.log("mail", mail)
 console.log("password",pwd)
  console.log("username",uname)
 signUpUser(mail, pwd,uname)

 mail.value = ""
 pwd.value = ""
 uname.value = ""
});


  function signUpUser(mail,pwd,uname){

    (async () => {
      const rawResponse = await fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: mail, password: pwd, username: uname})
      });
      const content = await rawResponse.json();
    
      // console.log(content);
    })()  
  };

  (function listAllPosts(){
    fetch(`http://localhost:8080/post/list`)
    .then((response) => {
        return response.json();
      })
      .then ((response) => {
          for (let i = response.length - 1; i > response.length - 30; i--){

            //  generate Recent Posts dynamically
         let postsBoard = document.createElement("div");
         postsBoard.id = "post";
         postsBoard.className = "card mb-4";

         document.querySelector("#main-content").appendChild(postsBoard);

         let postMain = document.createElement("div");
         postMain.id = "post-main";
         postMain.className = "card-body text-truncate";
         
         let cardTitle = document.createElement("h2");
         cardTitle.className = "card-title";
         cardTitle.innerHTML = response[i].title;
      
          let cardText = document.createElement("p");
          cardText.className = "card-text";
          cardText.innerHTML = response[i].description;
      
          let cardBtn = document.createElement("a");
          cardBtn.id= response[i].id;
          cardBtn.setAttribute("data-postid", response[i].id);
          cardBtn.setAttribute("href", "#");
          cardBtn.innerHTML = "Read More →";
      
          let userName = sessionStorage.getItem("userName");

          if(userName){
          cardBtn.className = "btn btn-primary listener";
          }

          else{
          cardBtn.className = "btn btn-primary listener d-none";
          }
          
          cardBtn.title = response[i].title;
          cardBtn.cardText = response[i].description;


          // cardBtn.nodeName = response[i].user.userName;
          // cardBtn.value = response[i].user.userName;
          cardBtn.nodeName = response[i].username;
          cardBtn.value = response[i].username;
          // sessionStorage.setItem("postUserName", response[i].user.userName);
          sessionStorage.setItem("postUserName", response[i].username);
       


          postsBoard.appendChild(postMain);
           postMain.appendChild(cardTitle);
           postMain.appendChild(cardText);
           postMain.appendChild(cardBtn);


           let postFooter = document.createElement("div");
           postFooter.id = "post-footer";
           postFooter.className = "card-footer text-muted";
           postFooter.innerHTML = `created by: ${response[i].username}`;
          
          postsBoard.appendChild(postFooter);

         let commentBtn = document.createElement("a");
         commentBtn.id ="comment-btn";
         commentBtn.className = "float-right d-none";
         commentBtn.setAttribute("href", "#");
         commentBtn.innerHTML = "DELETE";

         postFooter.appendChild(commentBtn);
          }
        console.log(response); 
      })
      .catch ((err) => {
        console.log(err);
      })
      .finally (() => {
        // console.log('done');
        postEventListener();
      })
})();

// LOGIN

const loginButton = document.getElementById('login-btn');

loginButton.addEventListener('click', function (event) {
  event.preventDefault()

 let mail = document.getElementById("login-email").value;
 let pwd = document.getElementById("login-password").value;
  login(mail, pwd)

  mail.value = ""
  pwd.value = ""
});

function login(mail, pwd){
  fetch("http://localhost:8080/user/login", {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },
    body: JSON.stringify({
        email: mail,
        password: pwd,
           })
    })
    .then((response )=> {
        return response.json();
       
    })
    .then((response) =>{
      if(response.token){
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem("userName", response.username);
      window.location.reload();
      }
      else{
        alert("Wrong Username or password");
      }
    })
    .catch(function(error){
        alert("Wrong Username or password")
        console.log(error);
    })
  }

  function getCommentsByPostId(postId){

    fetch(`http://localhost:8080/post/comment/${postId}`)
    .then((response) => {
        return response.json();
      })
      .then ((response) => {
        console.log("im here");
        console.log(response.postComment[0]);
        // console.log('done');
        // console.log(response.length);

        let postTitle = sessionStorage.getItem("postTitle");
        let postDesc = sessionStorage.getItem("postDesc");

        console.log("post tile: " + postTitle);
        console.log("post description: " + postDesc);

        let mainContent = document.querySelector("#main-content");
        mainContent.className = "d-none";

          // <div class="col-lg-8">
           let mainDiv = document.createElement("div");
           mainDiv.className = "col-lg-8";

           document.querySelector("#main").appendChild(mainDiv);

          //  console.log("test");
          //  console.log(response[0].post.title);

          {/* <!-- Title --> */}
          // <h1 class="mt-4">Post Title</h1>
          let title = document.createElement("H1");
          title.className = "mt-4";
          title.innerHTML = postTitle;



          // title.innerHTML = response[0].post.title;

          // console.log("test 2" + response[0].post.title);
          // console.log("test");

         

          mainDiv.appendChild(title);
          {/* <!-- Author --> */}
          // <p class="lead"></p>
        //  let p = document.createElement("p");
        //  p.className = "lead";
        //  p.innerHTML = `create by ${response[0].post.user.username}`;

        //  mainDiv.appendChild(p);

          {/* <hr> */}
         let hr = document.createElement("hr");
          mainDiv.appendChild(hr);

             {/* Post Content  */}
          
          let postContent = document.createElement("p");
          postContent.className = "lead";
          postContent.innerHTML = postDesc;



          mainDiv.appendChild(postContent);

          {/* <!-- Comments Form --> */}

         

          //  <div class="card my-4">
             let d1 = document.createElement("div");
             d1.className = "card my-4";
          
             mainDiv.appendChild(d1);
          //   <h5 class="card-header">Leave a Comment:</h5>
               let h1 =  document.createElement("h5");
               h1.className = "card-header";
               h1.innerHTML = "Leave a Comment:";

               d1.appendChild(h1);
          //   <div class="card-body">
                let d2 = document.createElement("div");
                d2.className = "card-body";

                d1.appendChild(d2);
          //     <form>
          let f = document.createElement("form");

          d2.appendChild(f);
          //       <div class="form-group">
             let d3 = document.createElement("div");
             d3.className = "form-group";

             f.appendChild(d3);
          //         <textarea class="form-control" rows="3"></textarea>
           let t = document.createElement("textarea");
           t.id = "comment-text-area"
            t.className= "form-control";
            t.setAttribute = ("rows", 3);

            d3.appendChild(t);
          //       </div>
          //       <button type="submit" class="btn btn-primary">Submit</button>
          let d = document.createElement("button");
          d.id = "create-comment";
          d.className = "btn btn-primary";
          d.setAttribute = ("type", "submit");
          d.innerHTML = "Submit";

          f.appendChild(d);
          //     </form>
          //   </div>
          // </div>

          //  <!-- Single Comment --> 
          //  <div class="media mb-4">

          for(let i=0; i<response.postComment.length; i++){

          let d4 = document.createElement("div");
          d4.className = "media mb-4"
          
         mainDiv.appendChild(d4);
      
          //   <div class="media-body">
          let d5 = document.createElement("div");
          d5.className = "media-body"

          d4.appendChild(d5);
          //     <h5 class="mt-0">Commenter Name</h5>
          let commenterName = document.createElement("h5");
          commenterName.className = "mt-0"
          commenterName.innerHTML = response.postComment[i].username;

          // console.log(response[0]);
          // console.log(response[0].user);

          d5.appendChild(commenterName);

          let p2 = document.createElement("p");
          p2.innerHTML = response.postComment[i].text;
          d5.appendChild(p2);
          // loop finishes here

          if(sessionStorage.getItem("userName") === response.postComment[i].username){
             let btn = document.createElement("button");
             btn.innerHTML = "DELETE";
             btn.id = response.postComment[i].id;
             d5.appendChild(btn);

             btn.addEventListener("click", function(){
              delComment(event.target.id);
              console.log("from click fiunction");
             })

             
          }
        }

        console.log(document.getElementById("create-comment"), 'create comment node');
        //console.log("im right here")
        document.getElementById("create-comment").addEventListener('click', function(e){
        e.preventDefault();
        commentTextArea = document.getElementById("comment-text-area")
        text = commentTextArea.value;
        createComment(text)
        commentTextArea.value = "";

})
      })
      .catch ((err) => {
        console.log(err);
      })
      .finally ((response) => {

       })
      }

  

  // on login 

  window.onload = function(){
    const token = sessionStorage.getItem("token");
    const userName = sessionStorage.getItem("userName");

    if(userName){
      let elem = document.querySelector("#displayUser");
    let userName = sessionStorage.getItem("userName");

    // on login display welcome message
      elem.innerHTML = `Welcome, ${userName}`;

    // and display the logout and create post options
    let createPost = document.querySelector("#post-dropdown");
    let logout = document.querySelector("#logout");

    createPost.className ="btn-group";
    logout.className = "btn btn-primary";

    // target register and login dropdowns
    let registerDrop = document.querySelector("#register-dropdown");
    let loginDrop = document.querySelector("#login-dropdown");

    // remove display of register and login dropdowns
    registerDrop.className = "d-none";
    loginDrop.className = "d-none";

    let profileDrop = document.querySelector("#profile-dropdown");
    profileDrop.className = "btn-group";
    }
  }


const postButton = document.getElementById('create-post');

postButton.addEventListener('click', function (event) {
  event.preventDefault()

let token = sessionStorage.getItem("token") 
 let title = document.getElementById("post-title").value;
 let description = document.getElementById("post-description").value;
  createPost(token, title, description)

  title.value = ""
  description.value = ""

});


function createPost(bearer_token, title, description){
  let bearer = 'Bearer ' + bearer_token;
  fetch("http://localhost:8080/post/post", {
    method: 'POST',

    headers:{
      'Authorization': bearer,
      'Accept': 'application/json',
      'Content-Type': 'application/json'          
  },

    body: JSON.stringify({
        title: title,
        description: description,
           })
    })
    .then(() => {
      window.location.reload();
    })
  }

// create event listener on each button and return the post ID
function postEventListener(){
 let postList = document.querySelectorAll(".listener");
 for(let i=0; i< postList.length; i++){
   postList[i].addEventListener("click", function(){

     sessionStorage.setItem("PostId", event.target.id);
     sessionStorage.setItem("postTitle", event.target.title);
     sessionStorage.setItem("postDesc", event.target.cardText);
       
     getCommentsByPostId(event.target.id)
   

   });
 }
};

// COMMENT


function createComment(text){
  let postId = sessionStorage.getItem("PostId")
  let bearer_token = sessionStorage.getItem("token")
  let bearer = 'Bearer ' + bearer_token;
  fetch(`http://localhost:8080/comment/comment/${postId}`, {
    method: 'POST',

    headers:{
    'Authorization': bearer,
    'Accept': 'application/json',
    'Content-Type': 'application/json'          
  },

  body: JSON.stringify({
        text: text,
           })
    }).then((response) => {
          alert("Your comment was entered")
          return response.json();

    }).then((data) => {
      console.log(data);
    }) 
    
}


function delComment(commentId){
  let id = commentId;

  console.log("comment Id: " + id);
  let bearer_token = sessionStorage.getItem("token")
  let bearer = 'Bearer ' + bearer_token;
  fetch(`http://localhost:8080/comment/${commentId}`, {
    method: 'DELETE',

    headers:{
    'Authorization': bearer,
    'Accept': 'application/json',
    'Content-Type': 'application/json'          
  },

    }).then((response) => {
          alert("Your comment was deleted")
          return response.json();

    }).then((data) => {
      console.log(data);
    }) 
    
}

// PROFILE

const createProfileButton = document.getElementById("create-profile");

createProfileButton.addEventListener('click',function (event){
  
  event.preventDefault();
  
   const addMail = document.getElementById("additional-email").value;
   const mobile = document.getElementById("mobile").value; 
   const address = document.getElementById("address").value;
console.log("got info")
   createProfile(addMail, mobile, address);
})

function createProfile(addMail, mobile, address){
  (async () => {
    const rawResponse = await 
 console.log(addMail, mobile, address);
  let bearer_token = sessionStorage.getItem("token")
  let bearer = 'Bearer ' + bearer_token;
  fetch(`http://localhost:8080/user/profile`, {
    method: 'POST',

    headers:{
    'Authorization': bearer,
    'Content-Type': 'application/json'          
  },

  body: JSON.stringify({
        "additionalEmail": addMail,
        "mobile": mobile,
        "address": address,
           })
    }).then((response) => {
          if(response.status === 200)
            alert("Your profile was created");

          return response.json();

    }).then((response) => {
      console.log(response);
    }) .catch ((err) => {
      console.log(err);
    })
   })() 
    }

document.querySelector("#logout").addEventListener("click", function(){
  sessionStorage.clear();
  window.location.reload();
})

document.querySelector("#logo").addEventListener("click", function(){
  window.location.reload();
})