module.exports = {
  apps: [
    {
      name: "only_media",
      script: "npm",
      automation: false,
      args: "start",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
}
