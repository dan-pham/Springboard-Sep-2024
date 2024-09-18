// Task 1: Declare The Task Array and The Interval ID
let oneTimeTasks = [];
let monitoringTaskId = "";

// Task 2: Add One-Time Task Function
function addOneTimeTask(func, delay) {
  oneTimeTasks.push({ func: func, delay: delay });
}

// Task 3: Run One-Time Tasks Function
function runOneTimeTasks() {
  oneTimeTasks.forEach((task) => {
    setTimeout(task.func, task.delay);
  });
}

// Task 4: Start Monitoring Function
function startMonitoring() {
  const oneSecond = 1000;
  const fiveSeconds = 5000;
  const range = fiveSeconds - oneSecond + 1;
  const offset = oneSecond;
  const randomInterval = Math.floor(Math.random() * range) + offset;

  const intervalId = setInterval(() => {
    console.log("Monitoring in progress...");
  }, randomInterval);

  monitoringTaskId = intervalId;
}

// Task 5: Stop Monitoring Function
function stopMonitoring() {
  clearInterval(monitoringTaskId);
  console.log("Monitoring stopped.");
}

// Task 6: Start Countdown Function
function startCountdown(duration) {
  let timeRemaining = duration;
  const oneSecond = 1000;

  console.log(`Countdown started: ${timeRemaining} seconds remaining`);

  const countdownTimerId = setInterval(() => {
    timeRemaining--;
    console.log(`${timeRemaining} seconds remaining`);

    if (timeRemaining <= 0) {
      clearInterval(countdownTimerId);
      console.log("Liftoff!");
    }
  }, oneSecond);
}

// Task 7: Schedule Pre-Launch Activities and Launch
function scheduleMission() {
  startMonitoring();

  addOneTimeTask(() => {
    console.log("Pre-launch system check complete");
  }, 2000);

  addOneTimeTask(() => {
    stopMonitoring();
  }, 4000);

  addOneTimeTask(() => {
    startCountdown(10);
  }, 5000);

  runOneTimeTasks();
}

scheduleMission(); // Starts the mission.
