/*    JavaScript 7th Edition
      Chapter 3
      Project 03-01

      Application to calculate total order cost
      Author: Pat M
      Date:   09/04/26

      Filename: project03-01.js
*/

//Set the menuItems variable as the menuItem class
let menuItems = document.getElementsByClassName("menuItem");


//Loop to attach an event listener to each checkbox directing to the calcTotal function
for (let i = 0; i < menuItems.length; i++) {

  menuItems[i].addEventListener("click", calcTotal);

}

//Function to calculate total cost each time a checkbox is selected
function calcTotal(){
  let orderTotal = 0; //reset orderTotal to 0

  //Loop once for each menuItem checkbox. If that box is checked add its corresponding value amount to the orderTotal
  for (let i = 0; i < menuItems.length; i++) {

    if (menuItems[i].checked) {

      orderTotal += Number(menuItems[i].value);

    }
  }

  //Update display if billTotal element on page to the new orderTotal amount
  document.getElementById("billTotal").innerHTML = formatCurrency(orderTotal);
}

 // Function to display a numeric value as a text string in the format $##.##
 function formatCurrency(value) {
    return "$" + value.toFixed(2);
 }