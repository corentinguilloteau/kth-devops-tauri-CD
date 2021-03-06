const { newDatabaseConnection } = require("./db");

async function installDB() {
	const db = await newDatabaseConnection();

	await db.run(
		"CREATE TABLE IF NOT EXISTS UPDATES (id int, target TEXT, version TEXT, url TEXT, signature TEXT, PRIMARY KEY (id))"
	);
}

module.exports = installDB;
