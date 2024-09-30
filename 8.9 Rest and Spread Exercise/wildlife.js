/* Task 1: Track Animal Sightings */
// TODO: Write a function with rest parameters to print sightings of different animals within the sanctuary.
// This function should accept an arbitrary number of animal names.
function printAnimalSightings(...animals) {
  console.log(animals);
}
printAnimalSightings("Monkey", "Rhino", "Lion");

/* Task 2: Merge Habitat Areas */
const forestHabitats = ["Forest A", "Forest B"];
const savannahHabitats = ["Savannah C", "Savannah D"];
// TODO: You are given two arrays of habitat names.
// Use the spread operator to combine them into a comprehensive list of protected areas within the sanctuary.
const protectedAreas = [...forestHabitats, ...savannahHabitats];
console.log(`Protected areas: ${protectedAreas}`);

/* Task 3: Update Conservation Status */
const rhinoStatus = {
  population: 500,
  status: "Endangered",
};
// TODO: You are given an object representing an animal's conservation status.
// Use the spread operator to update this status with new information, such as an increase in population or a change in habitat.
const newInfo = {
  population: 600,
  habitat: "Savannah",
};
const updatedRhinoStatus = {
  ...rhinoStatus,
  ...newInfo,
};
console.log(
  `Updated rhino status: ${JSON.stringify(updatedRhinoStatus, null, 2)}`
);

/* Task 4: Catalog Genetic Diversity */
const lionProfile = {
  name: "Leo",
  age: 5,
  species: "Lion",
};
// TODO: Duplicate an animal profile object using a shallow copy.
// Add genetic diversity information using the `genetics` property to this copy.
// Observe and explain how changes to nested properties affect both the original and the copied object.
/*
 * Observations:
 * TODO: Explain here.
 * By creating a shallow copy, the new object gets the same property values of the original, but in a new memory space.
 * Therefore, any property changes in either object do not affect the other, since they do not reference the same memory address.
 */
const lionProfileGenetics = {
  ...lionProfile,
  genetics: "Diverse",
};

lionProfile.age = 6;

console.log(`Lion Profile: ${JSON.stringify(lionProfile, null, 2)}`);
console.log(
  `Lion Profile Genetics: ${JSON.stringify(lionProfileGenetics, null, 2)}`
);

/* Task 5: Analyze Ecosystem Health */
const ecosystemHealth = {
  waterQuality: "Good",
  foodSupply: {
    herbivores: "Abundant",
    carnivores: "Sufficient",
  },
};
// TODO: You are given an object with a nested structure detailing the ecosystem's health, including water quality and food supply.
// Perform a shallow copy and modify a nested property.
// Observe and explain how changes to nested properties affect both the original and the copied object.
/*
 * Observations:
 * TODO: Explain here.
 * For shallow copies, nested objects are not duplicated. The copy still references the original nested object in memory.
 * So if you change something in the copied object, the change affects both the original and the copy.
 */
const ecosystemHealthCopy = {
  ...ecosystemHealth,
};
ecosystemHealthCopy.foodSupply.carnivores = "Insufficient";

console.log(`Ecosystem health: ${JSON.stringify(ecosystemHealth, null, 2)}`);
console.log(
  `Updated ecosystem health: ${JSON.stringify(ecosystemHealthCopy, null, 2)}`
);
