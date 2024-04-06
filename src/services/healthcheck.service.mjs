import MyDatabase from "../configurations/database.config.mjs";

export default function healthcheckService () {
    return {
        uptime: process.uptime(),
        mongo: true
    }
}