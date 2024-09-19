/* Task 1: Declare a Destination Variable */
// TODO: Use `let` to declare a variable named `destination` and assign it the value `"Ancient Egypt"`.
// Print the destination to the console.
let destination = "Ancient Egypt";
console.log(destination);

/* Task 2: Change the Destination */
// TODO: Now, change the `destination` variable to `"Medieval Europe"`. Print the new destination to the console.
destination = "Medieval Europe";
console.log(destination);

/* Task 3: Declare a Constant Travel Date */
// TODO: Use `const` to declare a variable named `travelDate` and set it to `"2024-03-15"`.
// Try to change the `travelDate` to another value and observe and explain what happens as a comment.
const travelDate = "2024-03-15";

/*
 * Observations:
 * TODO: Explain here.
 * You get a TypeError because const variables cannot be reassigned.
 */

/* Task 4: Experiment with Variable Hoisting */
// TODO: Before declaring any variable, try to print a variable named `timeMachineModel` to the console.
// Then, declare `timeMachineModel` using `var` and assign it the value `"T-800"`. Observe and explain what happens as a comment.
console.log(timeMachineModel);
var timeMachineModel = "T-800";

/*
 * Observations:
 * TODO: Explain here.
 * You get an undefined rather than an error because timeMachineModel is hoisted due to the var declaration.
 * However, because you try to access it before it's assigned, you get an empty declaration.
 */
