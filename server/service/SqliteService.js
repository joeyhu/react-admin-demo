const Database = require("better-sqlite3");
const db = new Database("kyb.db", { verbose: console.log });
const uuid = require("uuid");

const entityList = {
  User: [
    { name: "_id", type: "VARCHAR" },
    { name: "email", type: "VARCHAR" },
    { name: "phone", type: "VARCHAR" },
    { name: "password", type: "VARCHAR" },
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
const getById = (table, _id) => {
  return getOne(table, { _id });
};
const all = table => {
  const stmt = db.prepare(`SELECT * FROM ${table}`);
  return stmt.all();
};
const query = (table, params) => {
  let keys = Object.keys(params).map(key => {
    return `${key}=@${key}`;
  });
  let sql = `SELECT * FROM ${table} ${
    keys.length > 0 ? "WHERE" : ""
  } ${keys.join(" and ")}`;
  const stmt = db.prepare(sql);
  return stmt.all(params);
};

const getOne = (table, params) => {
  let keys = Object.keys(params).map(key => {
    return `${key}=@${key}`;
  });
  let sql = `SELECT * FROM ${table} ${
    keys.length > 0 ? "WHERE" : ""
  } ${keys.join(" and ")}`;
  console.log("-", sql);
  const stmt = db.prepare(sql);
  return stmt.get(params);
};
const saveOrUpdate = (table, values) => {
  values || (values = {});
  values._id || (values._id = uuid.v1());
  const keys = Object.keys(values);
  let sql = `INSERT INTO ${table} (${keys.join(",")}) VALUES (${keys
    .map(v => `@${v}`)
    .join(",")})`;
  let old = getById(table, values._id);
  if (old && old._id) {
    const updateFields = keys
      .filter(v => v !== "_id")
      .map(v => `${v}=@${v}`)
      .join(",");
    sql = `UPDATE ${table} SET ${updateFields} WHERE _id=@_id`;
  }
  console.log("-", sql);
  const stmt = db.prepare(sql);
  stmt.run(values);
  return getById(table, values._id);
};
const del = (table, _id) => {
  const stmt = db.prepare(`DELETE FROM ${table} WHERE _id=?`);
  return stmt.run(_id);
};
const exeSql = (sql, v) => {
  const stmt = db.prepare(sql);
  v ? stmt.run(v) : stmt.run();
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
  getOne,
  saveOrUpdate,
  del,
  exeSql,
  queryBySql
};
