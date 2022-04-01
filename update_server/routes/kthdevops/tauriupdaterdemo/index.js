var express = require("express");
var router = express.Router();
const db = require("../../../database/db");
const { check } = require("express-validator");

const targets = ["windows", "linux", "macos"];

/* GET latest update. */
router.get(
	"/:target/:version",
	check("target").exists().isString().escape().if(!targets.includes(target)),
	check("version")
		.exists()
		.isString()
		.escape()
		.matches(/^[0-9]+\.[0-9]+\.[0-9]+$/),
	function (req, res, next) {
		const update = db.getLatestUpdate(req.params.target);

		if (update !== null && compareVersions(data.version, req.params.version) === 1) {
			// An update is available
			res.json(data);
		} else {
			res.sendStatus(204);
		}
	}
);

/* POST latest update. */
router.post(
	"/",
	check("target").exists().isString().escape().if(!targets.includes(target)).escape(),
	check("version")
		.exists()
		.isString()
		.escape()
		.matches(/^[0-9]+\.[0-9]+\.[0-9]+$/)
		.escape(),
	check("url")
		.exists()
		.isString()
		.isURL({
			protocols: ["https"],
			require_protocol: true,
			require_port: false,
			require_valid_protocol: true,
		})
		.escape(),
	check("signature").exists().isBase64().escape(),
	check("auth").exists().isString().escape(),
	function (req, res, next) {
		if (process.env.AUTH_SECRET && req.params.auth === process.env.AUTH_SECRET) {
			db.addNewVersion(req.params.target, req.params.version, req.params.url, req.params.signature);

			res.sendStatus(200);
		} else {
			res.sendStatus(403);
		}
	}
);

module.exports = router;
