// Step 1: Run the code after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Step 2: Get all the elements from the DOM (box container, new box button, color form, color input)
  const boxContainer = document.getElementById("box-container");
  const newBoxButton = document.getElementById("new-box-button");
  const colorForm = document.getElementById("color-form");
  const colorInput = document.getElementById("color-input");

  // Step 3: Create variables to store box color and counter for box ID
  let boxColor = "black";
  let boxIdCounter = 0;

  // Step 4: On form submision, get the value from the color input and set this color to all boxes
  colorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    boxColor = colorInput.value;
    colorInput.value = "";

    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.style.backgroundColor = boxColor;
    });
  });

  // Step 5: Create a function to add a new box
  function addBox() {
    const box = document.createElement("div");

    box.textContent = `Box ${boxIdCounter}`;
    box.className = "box";
    box.style.backgroundColor = boxColor;
    box.setAttribute("data-box-id", boxIdCounter.toString());

    boxContainer.appendChild(box);
    boxIdCounter++;
  }

  // Step 6: When the new box button is clicked, call addBox()
  newBoxButton.addEventListener("click", (event) => {
    addBox();
  });

  // Step 7: When there's a double-click, remove a box
  document.addEventListener("dblclick", (event) => {
    if (event.target.classList.contains("box")) {
      event.target.remove();
    }
  });

  // Step 8: When there's a mouse-over event, display a box's page coordinates
  document.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("box")) {
      const coordinates = `(x: ${event.pageX}, y: ${event.pageY})`;
      event.target.textContent = coordinates;
    }
  });

  // Step 9: Display box ID when the mouse leaves the box
  document.addEventListener("mouseout", (event) => {
    if (event.target.classList.contains("box")) {
      const boxId = event.target.getAttribute("data-box-id");
      event.target.textContent = `Box ${boxId}`;
    }
  });

  // Step 10: Listen to key-down events and create a new box when "N" is pressed
  document.addEventListener("keydown", (event) => {
    const isNPressed = event.key === "n" || event.key === "N";
    const isEventFromColorInput = event.target === colorInput;
    if (isNPressed && !isEventFromColorInput) {
      addBox();
    }
  });
});
