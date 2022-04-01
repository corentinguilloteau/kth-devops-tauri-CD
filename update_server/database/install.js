const { newDatabaseConnection } = require("./db");

const db = newDatabaseConnection();

db.run("CREATE TABLE UPDATES (id int NOT NULL, target TEXT, version TEXT, url TEXT, signature TEXT, PRIMARY KEY (id))");

db.close();
