const purple = "\x1b[35m";
const reset = "\x1b[0m";
const icon = "⮞";
const logger = {
  success: (msg) => {
    console.log(`\x1b[32m✔ SUCCESS:\x1b[0m ${msg}`);
  },

  info: (msg) => {
    console.log(`\x1b[34mℹ INFO:\x1b[0m ${msg}`);
  },

  warn: (msg) => {
    console.log(`\x1b[33m⚠ WARN:\x1b[0m ${msg}`);
  },

  enter: (msg) => {
    console.log(`${purple}======= ${icon} Enter ${msg} =======${reset}`);
  },

  error: (msg) => {
    console.log(`\x1b[31m✖ ERROR:\x1b[0m ${msg}`);
  },
};

export default logger;
