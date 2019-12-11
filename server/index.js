const Koa = require("koa");
const path = require("path");
const uuid = require("uuid");
const koaBody = require("koa-body");

let fs = require("fs");
const restc = require("restc");

//start Koa
const app = new Koa();

//最初的错误截获
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
    ctx.status = e.code && typeof e.code === "number" ? e.code : 500;
    ctx.body = {
      code: ctx.status,
      errMsg: e && e.message ? e.message : "服务器异常"
    };
  }
});
// 配置ctx.body解析中间件,用于解析内容和文件上传
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    // encoding: 'gzip',
    formidable: {
      // uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      hash: "md5", //如果要计算文件的 hash，则可以选择 md5/sha1
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => {
        // 文件上传前的设置操作
        console.log(`name: ${name}`);
        console.log(file);
      }
    }
  })
);

// use restc middleware, 用于格式json数据的中间件
app.use(
  restc.koa2({
    // includes: [conf.apiUrl, conf.apiUrl + '/*'],
    excludes: ["/web", /\/[^/]+\/[^/]+\/[^/]+\/exportData/]
  })
);

// 1.初始化参数
app.use(async (ctx, next) => {
  //console.log('------', ctx);
  //ctx.$k = kyb_base._k

  if (ctx.url.startsWith("/api")) {
    let ls = ctx.url.split("/");
    //console.log('------', ls);
    ctx.entity = ls[2];
    ctx.apiName = ls[3];
    ctx.apiName = ctx.apiName.split("?")[0];
    //console.log('3:', ctx.request.body);

    ctx.request.body || (ctx.request.body = {});
    ctx.request.query || (ctx.request.query = {});
    for (let k in ctx.request.query) {
      ctx.request.body[k] = decodeURIComponent(ctx.request.query[k]);
    }
    await next();
    //console.log('1:', ctx.request.body);
  } else {
  }
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});
//真正的逻辑执行
app.use(async ctx => {
  let key = `/${ctx.entity}/${ctx.apiName}@${ctx.method.toLowerCase()}`;
  if (key === "/FileItem/uploadFiles@post") {
    //保存文件
    let fileId = uuid.v1();
    // 创建可读流
    const reader = fs.createReadStream(ctx.request.files.fileObj.path);
    let filePath = path.join(__dirname, ".upload/") + `${fileId}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    ctx.body = { fileId };
  } else if (key === "/FileItem/getFile@get") {
    let filePath =
      path.join(__dirname, ".upload/") + `${ctx.request.body.fileId}`;
    const reader = fs.createReadStream(filePath);
    ctx.body = reader;
    ctx.status = 200;
  } else {
    let filePath = `${process.cwd()}/server/controllers/${
      ctx.entity
    }Controller.js`;
    if (!fs.existsSync(filePath)) {
      filePath = `${process.cwd()}/server/controllers/Controller.js`;
    }
    let mapping = require(filePath);
    let action = mapping[`${ctx.method.toUpperCase()} /${ctx.apiName}`];
    if (!action) {
      throw new Error(`${key} mapping action is not exist`);
    }
    await action(ctx);
  }
});

app.listen(7001);
console.log(`http://localhost:7001 started`);
