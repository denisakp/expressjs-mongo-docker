import healthcheckService from "./healthcheck.service.mjs";

export default function healthcheckHandler(req, res) {
    const data = healthcheckService()
    return res.status(200).json(data);
}