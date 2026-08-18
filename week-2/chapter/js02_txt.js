/*    JavaScript 7th Edition
      Chapter 2
      Chapter case

      Fan Trick Fine Art Photography
      Variables and functions
      Author: Pat M
      Date:   08/17/26

      Filename: js02.js
 */

//declare global constants for application
const EMP_COST = 100; //cost of photographer per hour
const BOOK_COST = 350; //cost of memory
const REPRO_COST = 1250; //cost of reproduction rights
const TRAVEL_COST = 2; //cost of travel per mile

//setup the form when the page loads
window.addEventListener("load",setupForm);

//set the forms default values
function setupForm(){
  document.getElementById("photoNum").value = 1;
  document.getElementById("photoHrs").value = 2;
  document.getElementById("makeBook").checked = false;
  document.getElementById("photoRights").checked = false;
  document.getElementById("photoDist").value = 0;

  getEstimate();

  //Event Handlers for input controls
  document.getElementById("photoNum").onchange = getEstimate;
  document.getElementById("photoHrs").onchange = getEstimate;
  document.getElementById("photoDist").onchange = getEstimate;
  document.getElementById("makeBook").onchange = getEstimate;
  document.getElementById("photoRights").onchange = getEstimate;
}

//estimate the total cost of the service
function getEstimate(){
  let totalCost = 0;
  let photographers = document.getElementById("photoNum").value;
  let hours = document.getElementById("photoHrs").value;
  let distance = document.getElementById("photoDist").value;
  let buyBook = document.getElementById("makeBook").checked;
  let buyRights = document.getElementById("photoRights").checked;

  //Add the cost of photographers for hours covered
  totalCost += photographers * hours * EMP_COST;

  //Add the cost of distance per photographer per mile
  totalCost += photographers * distance * TRAVEL_COST;

  //Add the cost of the books if purchased
  totalCost += buyBook ? BOOK_COST : 0;

  //Add the cost of the photo rights if purchased
  totalCost += buyRights ? REPRO_COST : 0;

  //Display total cost
  document.getElementById("estimate").innerHTML = "$" + totalCost;
}




