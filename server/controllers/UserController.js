/**
 * User
 */
const Controller = require("./Controller");
const SqliteService = require("../service/SqliteService");
const AuthService = require("../service/AuthService");
const uuid = require("uuid");
const crypto = require("crypto");
let signIn = ctx => {
  let { email, password } = ctx.request.body;
  password = crypto
    .createHash("SHA256")
    .update(password)
    .digest("hex");
  const user = SqliteService.getOne(ctx.entity, { email, password });
  if (!user || !user._id) {
    throw new Error("invalid email or password!");
  }
  let deviceId = uuid.v1();
  let session = AuthService.startSession(deviceId, user._id);
  Object.assign(session, SqliteService.getById(ctx.entity, user._id));
  delete session.password;
  ctx.body = session;
};
let signUp = ctx => {
  let { email, password, name, phone } = ctx.request.body;
  const user = SqliteService.getOne(ctx.entity, { email });
  if (user && user._id) {
    throw new Error("email exists!");
  }
  const passwordDigest = crypto
    .createHash("SHA256")
    .update(password)
    .digest("hex");
  const _id = uuid.v1();
  SqliteService.saveOrUpdate(ctx.entity, {
    _id,
    email,
    password: passwordDigest,
    name,
    phone
  });
  //注册成功，自动登录
  signIn(ctx);
};
let profile = ctx => {
  if (!ctx.currentUserId) {
    throw new Error("not sign in!");
  }
  const user = SqliteService.getById(ctx.entity, ctx.currentUserId);
  delete user.password;
  ctx.body = user;
};
let setProfile = ctx => {
  if (!ctx.currentUserId) {
    throw new Error("not sign in!");
  }
  delete ctx.request.body.password;
  ctx.request.body._id = ctx.currentUserId;
  SqliteService.saveOrUpdate(ctx.entity, ctx.request.body);
  const user = SqliteService.getById(ctx.entity, ctx.currentUserId);
  delete user.password;
  ctx.body = user;
};

const inc = {};
Object.assign(inc, Controller);
inc["POST /signIn"] = signIn;
inc["POST /signUp"] = signUp;
inc["POST /setProfile"] = setProfile;
inc["GET /profile"] = profile;
module.exports = inc;
