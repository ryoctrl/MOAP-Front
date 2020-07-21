module.exports = {
  apps : [
      {
          name: "MOAP-Front",
          script: "npm",
          args: "start",
          env: {
              PORT: 9251,
              REACT_APP_API_HOST: 'https://moap-api.mosin.jp/',
              REACT_APP_NEM_HOST: 'https://nemp2p.mosin.jp/',
              REACT_APP_IMAGE_PATH: 'image/',
          }
      }
  ]
};
