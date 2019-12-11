const Sqlite = require("../db/Sqlite");

let all = ctx => {
  ctx.body = Sqlite.all(ctx.entity);
};

let show = ctx => {
  ctx.body = Sqlite.getById(ctx.entity, ctx.request.body._id);
};

let query = ctx => {
  ctx.body = Sqlite.query(ctx.entity, ctx.request.body);
};

let save = ctx => {
  ctx.body = Sqlite.saveOrUpdate(ctx.entity, ctx.request.body);
};

let del = ctx => {
  ctx.body = Sqlite.del(ctx.entity, ctx.request.body._id);
};

module.exports = {
  "GET /all": all,
  "GET /show": show,
  "GET /query": query,
  "POST /save": save,
  "POST /del": del
};
