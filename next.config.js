/**
 * @type {import('next').NextConfig}
 */

const conf = require("./package.json")
const revision = require("child_process").execSync("git rev-parse HEAD").toString().trim()

const nextConfig = {
    /* config options here */
    reactStrictMode: true,
    poweredByHeader: false,
    generateBuildId: async () => {
        // You can, for example, get the latest git commit hash here

        const version = `prod-${conf.version}.${revision}`
        console.log(version)
        return version
    },
}

module.exports = nextConfig
