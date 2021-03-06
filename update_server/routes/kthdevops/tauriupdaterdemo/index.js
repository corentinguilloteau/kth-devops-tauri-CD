var express = require("express");
var router = express.Router();
const db = require("../../../database/db");
const { check } = require("express-validator");
const compareVersions = require("compare-versions");

const targets = ["windows", "linux", "macos"];

router.get("/changelog", (req, res) => {
	res.redirect("https://xkcd.com/1172/");
});

/* GET latest update. */
router.get(
	"/:target/:version",
	check("target")
		.exists()
		.isString()
		.escape()
		.custom((value) => {
			if (!targets.includes(value)) {
				throw new Error("Invalid target");
			}
		}),
	check("version")
		.exists()
		.isString()
		.escape()
		.matches(/^[0-9]+\.[0-9]+\.[0-9]+$/),
	async function (req, res, next) {
		const update = await db.getLatestUpdate(req.params.target);

		if (update !== null && compareVersions(update.version, req.params.version) === 1) {
			update.notes = "Read changelog at https://cg-dev.rezel.net/kthdevops/tauriupdaterdemo/changelog";
			// An update is available
			res.json(update);
		} else {
			res.sendStatus(204);
		}
	}
);

/* POST latest update. */
router.post(
	"/",
	check("target")
		.exists()
		.isString()
		.escape()
		.custom((value) => {
			if (!targets.includes(value)) {
				throw new Error("Invalid target");
			}
		})
		.escape(),
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
		}),
	check("signature").exists().isBase64().escape(),
	check("auth").exists().isString().escape(),
	async function (req, res, next) {
		if (process.env.AUTH_SECRET && req.body.auth === process.env.AUTH_SECRET) {
			await db.addNewVersion(req.body.target, req.body.version, req.body.url, req.body.signature);

			res.sendStatus(200);
		} else {
			res.sendStatus(403);
		}
	}
);

module.exports = router;
