module.exports = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { // So that we don't have to import React in every jsx|tsx file
      "runtime": "automatic"
    }],
    "@babel/preset-typescript",
  ],
};