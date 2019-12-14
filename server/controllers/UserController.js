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
let saveOrUpdate = ctx => {
  let { email, password, name, phone, _id } = ctx.request.body;
  _id || (_id = uuid.v1());
  const user = SqliteService.getOne(ctx.entity, { email });
  if (user && user._id !== _id) {
    throw new Error("email exists!");
  }
  const passwordDigest = crypto
    .createHash("SHA256")
    .update(password)
    .digest("hex");

  SqliteService.saveOrUpdate(ctx.entity, {
    _id,
    email,
    password: passwordDigest,
    name,
    phone
  });
  ctx.request.body._id = _id;
  Controller["GET /show"](ctx);
};
let signUp = ctx => {
  saveOrUpdate(ctx);
  //注册成功，自动登录
  signIn(ctx);
};
let profile = ctx => {
  if (!ctx.currentUserId) {
    ctx.status = 401;
    throw new Error("not sign in!");
  }
  let user = SqliteService.getById(ctx.entity, ctx.currentUserId);
  if (!user || !user._id) {
    ctx.status = 401;
    throw new Error("not sign in!");
  }
  delete user.password;
  ctx.body = user;
};
let setProfile = ctx => {
  if (!ctx.currentUserId) {
    ctx.status = 401;
    throw new Error("not sign in!");
  }
  delete ctx.request.body.password;
  ctx.request.body._id = ctx.currentUserId;
  SqliteService.saveOrUpdate(ctx.entity, ctx.request.body);
  const user = SqliteService.getById(ctx.entity, ctx.currentUserId);
  delete user.password;
  ctx.body = user;
};
let changePassword = ctx => {
  if (!ctx.currentUserId) {
    ctx.status = 401;
    throw new Error("not sign in!");
  }
  const { password } = ctx.request.body;
  SqliteService.saveOrUpdate(ctx.entity, {
    _id: ctx.currentUserId,
    password: crypto
      .createHash("SHA256")
      .update(password)
      .digest("hex")
  });
  ctx.body = {};
};
const inc = {};
Object.assign(inc, Controller);
inc["POST /signIn"] = signIn;
inc["POST /signUp"] = signUp;
inc["POST /saveOrUpdate"] = saveOrUpdate;
inc["POST /setProfile"] = setProfile;
inc["POST /changePassword"] = changePassword;
inc["GET /profile"] = profile;
module.exports = inc;
