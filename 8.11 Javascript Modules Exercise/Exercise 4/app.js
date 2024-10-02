async function loadConfig() {
  const applyTheme = await import(`./theme.mjs`);

  const hour = new Date().getHours();
  let before6pm = hour < 18;

  if (before6pm) {
    applyTheme.setLightTheme();
  } else {
    applyTheme.setDarkTheme();
  }
}

loadConfig();
