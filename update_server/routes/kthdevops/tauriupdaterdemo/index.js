var express = require("express");
var router = express.Router();
const db = require("../../../database/db");
const { check } = require("express-validator");

const targets = ["windows", "linux", "macos"];

/* GET home page. */
router.get(
	"/:target/:version",
	check("target").exists().isString().escape().if(!targets.includes(target)),
	check("target")
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

module.exports = router;
