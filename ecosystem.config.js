module.exports = {
  apps: [
    {
      name: "healthcare.syura.my",
      script: "yarn",
      args: "start",
      env: require("dotenv").config({ path: ".env.production" }).parsed,
    },
  ],
};
