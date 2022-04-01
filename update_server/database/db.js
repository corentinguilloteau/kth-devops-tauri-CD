const sqlite3 = require("sqlite3").verbose();
const path = require("path");

function newDatabaseConnection() {
	return new sqlite3.Database(":memory:");
}

function getLatestUpdate(target) {
	updateDatabase = newDatabaseConnection();

	const data = updateDatabase.prepare(`SELECT * FROM UPDATES WHERE target = ? ORDER BY ID DESC LIMIT 1`).run(target);

	return { url: data.url, signature: data.signature, version: data.version };
}

function addNewVersion(target, version, url, signature) {
	updateDatabase = newDatabaseConnection();

	updateDatabase
		.prepare(`INSERT INTO UPDATES (target, version, url, signature) VALUES (?, ?, ?, ?)`)
		.run(target, version, url, signature);
}

module.exports = { getLatestUpdate, addNewVersion, newDatabaseConnection };
