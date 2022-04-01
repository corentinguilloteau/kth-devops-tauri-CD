const sqlite3 = require("sqlite3").verbose();

const updateDatabase = new sqlite3.Database(path.resolve("./stores/updates.db"), { fileMustExist: true });

function getLatestUpdate(target) {
	const data = updateDatabase
		.prepare(`SELECT * FROM UPDATES WHERE target = ? ORDER BY ID DESC LIMIT 1`)
		.params([target]);

	return { url: data.url, signature: data.signature, version: data.version };
}

function addNewVersion(target, version, url, signature) {
	updateDatabase
		.prepare(`INSERT INTO UPDATES (target, version, url, signature) VALUES (?, ?, ?, ?)`)
		.params([target, version, url, signature]);
}

export { getLatestUpdate, addNewVersion };
