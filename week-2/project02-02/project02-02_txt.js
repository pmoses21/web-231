/*    JavaScript 7th Edition
      Chapter 2
      Project 02-02

      Application to test for completed form
      Author: Pat Moses
      Date:   8/17/26

      Filename: project02-02.js
 */

//Verify forum function to ensure all boxes are not empty
function verifyForm(){

  let name = document.getElementById("name").value;

  let email = document.getElementById("email").value;

  let phone = document.getElementById("phone").value;

  name && email && phone ? window.alert("Thank You!") : window.alert("Please Fill In All Fields"); //Alert if Empty. Thank if not empty

}

//Call verifyForm function on click of submit button
document.getElementById("submit").addEventListener("click", verifyForm);

