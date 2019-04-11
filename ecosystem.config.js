module.exports = {
  apps : [
      {
          name: "MOAP-Front",
          script: "npm",
          args: "start",
          env: {
              PORT: 9251
          }
      }
  ]
};
