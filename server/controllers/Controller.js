const SqliteService = require("../service/SqliteService");

let all = ctx => {
  ctx.body = SqliteService.all(ctx.entity);
};

let show = ctx => {
  ctx.body = SqliteService.getById(ctx.entity, ctx.request.body._id);
};

let query = ctx => {
  ctx.body = SqliteService.query(ctx.entity, ctx.request.body);
};

let save = ctx => {
  ctx.body = SqliteService.saveOrUpdate(ctx.entity, ctx.request.body);
};

let del = ctx => {
  ctx.body = SqliteService.del(ctx.entity, ctx.request.body._id);
};

module.exports = {
  "GET /all": all,
  "GET /show": show,
  "GET /query": query,
  "POST /save": save,
  "POST /del": del
};
