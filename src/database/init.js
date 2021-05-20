const Database = require("./config");

const database = await Database();

database.exec(`
  CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    vacation_per_year INT,
    value_hour INT
  );
`);

database.exec(`
  CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours TEXT,
    total_hours TEXT,
    created_at DATETIME
  );
`);

database.run(`
  INSERT INTO profile (
    name,
    avatar,
    monthly-budget,
    days_per_week,
    vacation_per_year,
    value_hour
  ) VALUES (
    "Pedro Duarte",
    "https://github.com/pedroduarte2005.png",
    7000,
    6,
    3,
    72
  );
`);

database.run(`
  INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
  ) VALUES (
    "Proffy",
    4,
    3,
    1617514376018
  );
`);

database.close();
