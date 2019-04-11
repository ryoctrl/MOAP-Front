module.exports = {
  apps : [
      {
          name: "MOAP-Front",
          script: "npm",
          args: "start",
          env: {
              PORT: 9251,
              REACT_APP_API_HOST: 'https://moap-api.mosin.jp/'
          }
      }
  ]
};
