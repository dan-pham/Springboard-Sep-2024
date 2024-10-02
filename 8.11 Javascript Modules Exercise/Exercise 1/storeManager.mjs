import { addItem, removeItem, listItems } from "./inventory.mjs";

listItems();

addItem("Milk");
addItem("Eggs");
addItem("Dog food");
listItems();

removeItem("Dog food");
removeItem("Cat food");
listItems();
