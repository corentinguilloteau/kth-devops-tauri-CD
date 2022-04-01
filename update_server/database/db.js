const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const path = require("path");

async function newDatabaseConnection() {
	return open({
		filename: "./database/stores/updates.sqlite3",
		driver: sqlite3.Database,
	});
}

async function getLatestUpdate(target) {
	updateDatabase = await newDatabaseConnection();

	const data = await updateDatabase.get(`SELECT * FROM UPDATES WHERE target = ? ORDER BY ID DESC LIMIT 1`, target);

	if (data === undefined) {
		return null;
	} else {
		return { url: data.url, signature: data.signature, version: data.version };
	}
}

async function addNewVersion(target, version, url, signature) {
	updateDatabase = await newDatabaseConnection();

	await updateDatabase.run(
		`INSERT INTO UPDATES (target, version, url, signature) VALUES (?, ?, ?, ?)`,
		target,
		version,
		url,
		signature
	);
}

module.exports = { getLatestUpdate, addNewVersion, newDatabaseConnection };
