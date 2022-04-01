const { newDatabaseConnection } = require("./db");

export default async function installDB() {
	const db = await newDatabaseConnection();

	await db.run(
		"CREATE TABLE IF NOT EXISTS UPDATES (id int NOT NULL, target TEXT, version TEXT, url TEXT, signature TEXT, PRIMARY KEY (id))"
	);
}
