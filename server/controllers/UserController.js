const Controller = require("./Controller");

let signIn = ctx => {};
let signOut = ctx => {};

const inc = {};
Object.assign(inc, Controller);
inc["POST /signIn"] = signIn;
inc["POST /signOut"] = signOut;
module.exports = inc;
