const sqlite3 = require("sqlite3").verbose();

const updateDatabase = new sqlite3.Database(path.resolve("./stores/updates.db"), { fileMustExist: true });

function getLatestUpdate(architecture, version) {
	const data = updateDatabase
		.prepare(`SELECT * FROM UPDATES WHERE target = ? ORDER BY ID DESC LIMIT 1`)
		.params([version]);

	return { url: data.url, signature: data.signature, version: data.version };
}
