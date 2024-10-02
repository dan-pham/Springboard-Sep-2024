const inventory = [];

export function addItem(itemName) {
  inventory.push(itemName);
  console.log(`Added ${itemName}`);
}

export function removeItem(itemName) {
  const itemIndex = inventory.findIndex((item) => item === itemName);
  let itemFound = itemIndex !== -1;

  if (itemFound) {
    inventory.splice(itemIndex, 1);
    console.log(`Removed ${itemName}`);
  } else {
    console.log(`${itemName} could not be found`);
  }
}

export function listItems(itemName) {
  if (inventory.length === 0) {
    console.log("Inventory is empty.");
  } else {
    console.log("Current Inventory:");
    inventory.forEach((item) => console.log(`- ${item}`));
  }
}
