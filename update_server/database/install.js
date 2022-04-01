const { newDatabaseConnection } = require("./db");

const db = newDatabaseConnection();

db.run(
	"CREATE TABLE IF NOT EXISTS UPDATES (id int NOT NULL, target TEXT, version TEXT, url TEXT, signature TEXT, PRIMARY KEY (id))"
);

module.exports = { db };
