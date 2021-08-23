let Signup = () => {
  let name = document.getElementById("name")
  let number = document.getElementById("number")
  let email = document.getElementById("email")
  let password = document.getElementById("password")
  let country = document.getElementById("country")
  let city = document.getElementById("city")
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      // Signed in 
      var user = res.user;
      firebase.database().ref(`customer/${user.uid}`).set(

        {
          Customername: `${name.value}`,
          Phone: `${number.value}`,
          Email: `${email.value}`,
          Password: `${password.value}`,
          Country: `${country.value}`,
          City: `${city.value}`,

        })
      // var user = userCredential.user;
      console.log(user)
      setTimeout(() => {
        window.location = "customerlogin.html"
      }, 500)

    })
}


let Login = () => {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      // Signed in
      var user = res.user;
      
      console.log(user)
      setTimeout(() => {
        window.location = "userProfile.html"
      }, 500)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
    });
}