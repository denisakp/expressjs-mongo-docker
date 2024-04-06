export default function healthcheckService() {
    return {
        uptime: process.uptime(),
        mongo: true
    }
}