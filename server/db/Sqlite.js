const Database = require("better-sqlite3");
const db = new Database("kyb.db", { verbose: console.log });
const uuid = require("uuid");

const entityList = {
  User: [
    { name: "_id", type: "VARCHAR" },
    { name: "email", type: "VARCHAR" },
    { name: "phone", type: "VARCHAR" },
    { name: "address", type: "VARCHAR" },
    { name: "name", type: "VARCHAR" },
    { name: "avatar", type: "VARCHAR" }
  ],
  Product: [
    { name: "_id", type: "VARCHAR" },
    { name: "name", type: "VARCHAR" },
    { name: "desc", type: "VARCHAR" },
    { name: "price", type: "double" },
    { name: "icon", type: "VARCHAR" }
  ]
};
/**
 * create table
 */
const init = () => {
  Object.keys(entityList).forEach(table => {
    let fields = entityList[table].map(field => {
      return `${field.name} ${field.type} ${
        field === "_id" ? "primary key" : ""
      }`;
    });
    const stmt = db.prepare(
      `create table if not exists ${table}(${fields.join(",")})`
    );
    stmt.run();
  });
};
const getById = (table, id) => {
  const stmt = db.prepare(`SELECT * FROM ${table} WHERE _id = ?`);
  return stmt.get(id);
};
const all = table => {
  const stmt = db.prepare(`SELECT * FROM ${table}`);
  return stmt.all();
};
const query = (table, params) => {
  let paramValues = [];
  let keys = Object.keys(params).map(key => {
    paramValues.push(params[key]);
    return `${key}=@${key}`;
  });
  const stmt = db.prepare(
    `SELECT * FROM ${table} ${keys.length > 0 ? "WHERE" : ""} ${keys.join(
      " and "
    )}`
  );
  return stmt.all(paramValues);
};
const saveOrUpdate = (table, values) => {
  values || (values = {});
  values._id || (values._id = uuid.v1());
  const keys = entityList[table].map(item => item.name);
  const saveValues = entityList[table].map(item => {
    return values[item.name];
  });
  const stmt = db.prepare(
    `INSERT OR REPLACE INTO ${table} (${keys.join(",")}) VALUES (${keys
      .map(v => "?")
      .join(",")})`
  );
  stmt.run(saveValues);
};
const del = (table, _id) => {
  const stmt = db.prepare(`DELETE FROM ${table} WHERE _id=?`);
  return stmt.run(_id);
};
const exeSql = (sql, v) => {
  const stmt = db.prepare(sql);
  stmt.run(v);
};
const queryBySql = (sql, v) => {
  const stmt = db.prepare(sql);
  stmt.all(v);
};
module.exports = {
  init,
  getById,
  all,
  query,
  saveOrUpdate,
  del,
  exeSql,
  queryBySql
};
