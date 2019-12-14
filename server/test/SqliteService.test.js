const assert = require("assert");
const Sqlite = require("../service/SqliteService");
const uuid = require("uuid");
describe("#Sqlite.js", () => {
  describe("#init()", () => {
    it("init", () => {
      Sqlite.init();
    });
  });
  describe("#saveOrUpdate()", () => {
    it("save data, find data, delete data", () => {
      const _id = uuid.v1();
      Sqlite.saveOrUpdate("User", { _id, name: "joey" });
      let re = Sqlite.getById("User", _id);
      assert.strictEqual(_id, re._id);
      Sqlite.del("User", _id);
      re = Sqlite.getById("User", _id);
      assert.strictEqual(undefined, re);
    });
  });
});
