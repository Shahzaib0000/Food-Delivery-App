let signup = () => {
  let name = document.getElementById("name")
  let email = document.getElementById("email1")
  let password = document.getElementById("password1")
  let country = document.getElementById("country")
  let city = document.getElementById("city")

  firebase.auth().createUserWithEmailAndPassword(email1.value, password1.value)
    .then((res) => {
      // Signed in 
      var user = res.user;
      firebase.database().ref(`restaurant/${user.uid}`).set(
        {
          Restaurantname: `${name.value}`,
          Email: `${email1.value}`,
          Password: `${password1.value}`,
          Country: `${country.value}`,
          City: `${city.value}`,

        })
      var user = res.user;
      console.log(user)
      setTimeout(() => {
        window.location = "loginforresturant.html"
      }, 500)

    })
    // .catch((error) => {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   console.log(errorMessage)
    // });
}


let login = () => {
  let name = document.getElementById("name")
  let email = document.getElementById("email1")
  let password = document.getElementById("password1")
  let country = document.getElementById("country")
  let city = document.getElementById("city")
  firebase.auth().signInWithEmailAndPassword(email1.value, password1.value)
    .then((res) => {
      // Signed in
      var user = res.user;
      console.log(user)
      setTimeout(() => {
        window.location = "dishes.html"
      }, 500)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
    });
}
  
let uploadFiles = (file,ref) => {
  return new Promise((resolve, reject) => {
      let storageRef = ref;
      let uploading = storageRef.put(file)
      uploading.on('state_changed',
          (snapshot) => {
            switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED:
                      console.log('Upload is paused');
                      break;
                  case firebase.storage.TaskState.RUNNING:
                      console.log('Upload is running');
                      break;
              }
          },
          (error) => {
              reject(error)
          },
          () => {
              uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  resolve(downloadURL)
              });
          }
      );
  })
}

let Dish = async ()=>{
  let dishcategory = document.getElementById("dishcategory")
  let dishname = document.getElementById("dishname")
  let dishprice = document.getElementById("dishprice")
  let dishpic = document.getElementById("dishpic")
  let deliverytype = document.getElementById("deliverytype")
  
  // uploading dish picture on firebase storage
  let Ref = firebase.storage().ref(`dishpic/${dishpic.files[0].name}`)
  let picUrl = await uploadFiles(dishpic.files[0],Ref)  
  let closebtn = document.getElementById("closebtn1")
  
 
                  // used on state change just to get user id
                  firebase.auth().onAuthStateChanged((user) => {
                            firebase.database().ref(`restaurant/${user.uid}/dishes`).push({
                                Dishname: dishname.value,
                                Dishprice: dishprice.value,
                                Picurl: picUrl,
                                Deliverytype: deliverytype.value,
                                Category: dishcategory.value
                            })
                            .then(()=>{
                               
                                closebtn.click()
                                
                            })
                        
                        })

}

firebase.auth().onAuthStateChanged((user) => {
   
                     
  if (user) {
      let dishcard = document.getElementById("dishcard")
      dishcard.innerHTML=""
      var uid = user.uid;
      firebase.database().ref(`restaurant/${user.uid}/dishes`)
      .on("child_added",(data)=>{
  
              let card = ` <div class="card" style="width: 18rem;">
                                <img height=200px width=100%  src="${data.val().Picurl}" alt="...">
                                <div class="card-body">
                                  <h5   class="card-title">${data.val().Dishname}</h5>
                                  <h6  >Rs: ${data.val().Dishprice} </h6>
                                  <h6>Delivery: ${data.val().Deliverytype} </h6>
                                  <h6>Category: ${data.val().Category} </h6>
                                </div>
                              </div>`   
                              
                              dishcard.innerHTML += card;
         
      })
  }
})
