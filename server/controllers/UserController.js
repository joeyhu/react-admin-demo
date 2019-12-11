/**
 * User
 */
const Controller = require("./Controller");
const SqliteService = require("../service/SqliteService");
const AuthService = require("../service/AuthService");
const uuid = require("uuid");
let signIn = ctx => {
  let { email, password } = ctx.request.body;
  password = crypto
    .createHash("SHA256")
    .update(password)
    .digest("hex");
  const user = SqliteService.query(ctx.entity, { email, password });
  if (!user || !user._id) {
    throw new Error("invalid email or password!");
  }
  let deviceId = uuid.v1();
  let session = AuthService.startSession(deviceId, user._id);
  Object.assign(session, SqliteService.getById(ctx.entity, user._id));
  ctx.body = session;
};
let signUp = ctx => {};
let profile = ctx => {
  if (!ctx.currentUserId) {
    throw new Error("not sign in!");
  }
  return SqliteService.getById(ctx.entity, ctx.currentUserId);
};

const inc = {};
Object.assign(inc, Controller);
inc["POST /signIn"] = signIn;
inc["POST /signUp"] = signUp;
inc["GET /profile"] = profile;
module.exports = inc;
