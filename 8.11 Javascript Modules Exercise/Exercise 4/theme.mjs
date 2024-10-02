const Theme = Object.freeze({
  LIGHT: "light",
  DARK: "dark",
});

let theme = Theme.LIGHT;

export function setLightTheme() {
  console.log("Setting light theme");
  theme = Theme.LIGHT;
}

export function setDarkTheme() {
  console.log("Setting dark theme");
  theme = Theme.DARK;
}
