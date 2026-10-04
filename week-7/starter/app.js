"use strict";

// ============================================
// Timed Practice Quiz Application
// ============================================
// This application creates a timed math quiz that:
// - Collects participant details
// - Displays a countdown timer
// - Validates answers against correct responses
// - Highlights incorrect answers
// - Shows final results

// Quiz configuration
const quizTime = 60; // Quiz duration in seconds
const correctAnswers = ["10", "4", "-6", "5", "-7"]; // Correct answer for each question

// ============================================
// DOM Element References
// ============================================

// Setup form elements
const quizSetup = document.getElementById("quizSetup");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const emailAddress = document.getElementById("emailAddress");
const courseSection = document.getElementById("courseSection");
const quizTopic = document.getElementById("quizTopic");
const errorBox = document.getElementById("errorBox"); // Display validation errors

// Participant summary section
const summarySection = document.getElementById("summarySection");
const summaryFirstName = document.getElementById("summaryFirstName");
const summaryLastName = document.getElementById("summaryLastName");
const summaryEmailAddress = document.getElementById("summaryEmailAddress");
const summaryCourseSection = document.getElementById("summaryCourseSection");
const summaryQuizTopic = document.getElementById("summaryQuizTopic");

// Quiz and results elements
const quizSection = document.getElementById("quizSection");
const quizClock = document.getElementById("quizClock"); // Timer display
const resultsSection = document.getElementById("resultsSection");
const resultsMessage = document.getElementById("resultsMessage");

// Quiz question inputs
const questionList = document.querySelectorAll("#quizQuestions input");

// ============================================
// Application State
// ============================================
let timeLeft = quizTime; // Tracks remaining time
let timerId = null; // Stores interval ID for countdown

// Initialize timer display
quizClock.value = quizTime;

// ============================================
// Event Listeners
// ============================================

// Handle quiz setup form submission
quizSetup.addEventListener("submit", function (event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Clear any previous error messages
  errorBox.textContent = "";

  // Stop here if any required field is incomplete - quiz does not start
  const missingFields = getMissingFields();
  if (missingFields.length > 0) {
    errorBox.textContent =
      "Complete the following before starting the quiz: " +
      missingFields.join(", ") +
      ".";
    return;
  }

  // All fields are complete - copy participant details to summary and show quiz
  summaryFirstName.textContent = firstName.value.trim();
  summaryLastName.textContent = lastName.value.trim();
  summaryEmailAddress.textContent = emailAddress.value.trim();
  summaryCourseSection.textContent = courseSection.value;
  summaryQuizTopic.textContent = quizTopic.value.trim();
  summarySection.classList.remove("hidden");
  quizSection.classList.remove("hidden");
  resultsSection.classList.add("hidden");

  // Initialize and start quiz with countdown timer
  resetQuiz();
  timerId = window.setInterval(countdown, 1000); // Call countdown every 1000ms
});

// ============================================
// Validation Functions
// ============================================

/**
 * Check every required setup field and return a list of the ones
 * that are empty or invalid. An empty list means the form is complete.
 */
function getMissingFields() {
  const missingFields = [];

  if (firstName.value.trim() === "") {
    missingFields.push("First Name");
  }

  if (lastName.value.trim() === "") {
    missingFields.push("Last Name");
  }

  if (emailAddress.value.trim() === "" || !emailAddress.checkValidity()) {
    missingFields.push("valid Email Address");
  }

  if (courseSection.value === "") {
    missingFields.push("Course Section");
  }

  if (quizTopic.value.trim() === "") {
    missingFields.push("Quiz Topic");
  }

  return missingFields;
}

// ============================================
// Quiz Management Functions
// ============================================

/**
 * Reset quiz to initial state:
 * - Clear any active countdown
 * - Reset time to full duration
 * - Update the clock display
 * - Clear all question inputs
 * - Remove wrong answer styling
 */
function resetQuiz() {
  window.clearInterval(timerId);
  timeLeft = quizTime;
  updateClock();
  clearAnswers();
  clearAnswerStyles();
}

/**
 * Clear all question input values
 */
function clearAnswers() {
  questionList.forEach((input) => {
    input.value = "";
  });
}

/**
 * Remove "wronganswer" styling from all question inputs
 */
function clearAnswerStyles() {
  questionList.forEach((input) => {
    input.classList.remove("wronganswer");
  });
}

/**
 * Update the quiz clock display to reflect the current timeLeft value
 */
function updateClock() {
  quizClock.value = timeLeft;
}

/**
 * Countdown timer function - decrements time and shows results when expired
 * Called every 1000ms during active quiz
 */
function countdown() {
  if (timeLeft === 0) {
    // Time expired - stop timer and display results
    window.clearInterval(timerId);
    showResults();
  } else {
    // Decrement time and update display
    timeLeft--;
    updateClock();
  }
}

/**
 * Check all answers, show results section, and display score message
 */
function showResults() {
  // Validate and count correct answers
  const totalCorrect = checkAnswers();

  // Display results section
  resultsSection.classList.remove("hidden");

  // Build and display results message
  resultsMessage.textContent =
    summaryFirstName.textContent +
    ", you answered " +
    totalCorrect +
    " out of " +
    correctAnswers.length +
    " correctly.";
}

/**
 * Compare user answers against correct answers:
 * - Apply "wronganswer" class to incorrect responses
 * - Removes "wronganswer" class from correct responses
 * - Returns total count of correct answers
 */
function checkAnswers() {
  let correctCount = 0;

  // Check each question against its correct answer
  questionList.forEach((input, index) => {
    if (input.value.trim() === correctAnswers[index]) {
      // Correct answer - ensure styling is clean
      input.classList.remove("wronganswer");
      correctCount++;
    } else {
      // Incorrect or empty answer - highlight with error styling
      input.classList.add("wronganswer");
    }
  });

  return correctCount;
}