/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig




const fs = require("fs");



module.exports = {
  env: {
    max_str_length: 50000,
    api_host: (fs.existsSync('in_docker.txt')) ? "172.17.0.1" : "localhost",
  },
}


