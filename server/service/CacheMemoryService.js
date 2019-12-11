/**
 * cache 的实现：
 * 1. entity的cache 通过entityId来进行cache，数据源(数据库，服务器）发生变化自动更新
 * 2. tree entity的cache实现，
 */
const cache = require("memory-cache");
const CacheKey_MData = "__mdata__";
const CacheKey_EntityMap = "__entity_map__";

//实体缓存
const CacheKey_EntityData = "__entity_data__";
//树形缓存
const CacheKey_EntityTreeData = "__entity_tree_data__";
/**
 * 关于实体每条数据的缓存
 * @param {String} entityId
 */
const getEntityData = (entityName, entityId) =>
  cache.get(CacheKey_EntityData)
    ? cache.get(CacheKey_EntityData)[`${entityName}_${entityId}`]
    : null;
/**
 *
 * @param {*} entityId
 * @param {*} value
 */
const setEntityData = (entityName, entityId, value) => {
  let c = cache.get(CacheKey_EntityData);
  c || (c = {});
  c[`${entityName}_${entityId}`] = value;
  cache.put(CacheKey_EntityData, c);
};
/**
 *
 * @param {*} entityId
 */
const delEntityData = (entityName, entityId) => {
  let c = cache.get(CacheKey_EntityData);
  c || (c = {});
  delete c[`${entityName}_${entityId}`];
  cache.put(CacheKey_EntityData, c);
};
/**
 * 清除所有实体缓存
 */
const clearAllEntityData = () => {
  cache.put(CacheKey_EntityData, {});
};
/**  树形缓存 **/

/**
 * 关于实体每条数据的缓存
 * @param {String} entityId
 */
const getEntityTreeData = path => {
  return path
    .split("/")
    .filter(item => item.length > 0)
    .reduce((re, item) => {
      return re ? re[item] : null;
    }, cache[CacheKey_EntityTreeData]);
};
/**
 *
 * @param {*} entityId
 * @param {*} value
 */
const setEntityTreeData = (path, value) => {
  let ss = path.split("/").filter(item => item.length > 0);
  let end = ss.pop();
  cache[CacheKey_EntityTreeData] || (cache[CacheKey_EntityTreeData] = {});
  let o = ss.reduce((re, item) => {
    re || (re = {});
    re[item] || (re[item] = {});
    return re[item];
  }, cache[CacheKey_EntityTreeData]);
  o[end] = value;
};
/**
 *
 * @param {*} entityId
 */
const delEntityTreeData = path => {
  if (!path) {
    return;
  }
  let ss = path.split("/").filter(item => item.length > 0);
  let end = ss.pop();
  let o = ss.reduce((re, item) => {
    return re[item] ? re[item] : null;
  }, cache[CacheKey_EntityTreeData]);
  if (o) delete o[end];
};
/**
 * 清除所有实体树缓存
 */
const clearAllEntityTreeData = () => {
  cache.put(CacheKey_EntityTreeData, {});
};

const getMDataEntityMap = table => {
  let moduleStr = cache.get(CacheKey_EntityMap)[table];
  if (!cache.get(CacheKey_MData).itemMap[moduleStr]) {
    throw global.SendError(400, new Error(`${moduleStr} is not in cache`));
  }
  return cache.get(CacheKey_MData).itemMap[moduleStr].itemMap[table];
};
const getMDataEntityModuleMap = () => cache.get(CacheKey_EntityMap);
const setMDataEntityModuleMap = data => cache.put(CacheKey_EntityMap, data);
const getMData = () => cache.get(CacheKey_MData);
const setMData = mdata => cache.put(CacheKey_MData, mdata);

const addMDataEntityMapToCache = function(item) {
  cache.get(CacheKey_EntityMap)[item.name] = item.modelName;
  cache.get(CacheKey_MData).itemMap[item.modelName].itemMap[item.name] = item;
  cache.get(CacheKey_MData).itemMap[item.modelName].items.push(item);
};
module.exports = {
  get: key => cache.get(key),
  set: (key, value, ex) => cache.put(key, value, ex),
  del: key => cache.del(key),
  getEntityData,
  setEntityData,
  delEntityData,
  clearAllEntityData,
  getEntityTreeData,
  setEntityTreeData,
  delEntityTreeData,
  clearAllEntityTreeData,
  getMData: getMData,
  setMData: setMData,
  getMDataEntityModuleMap,
  setMDataEntityModuleMap,
  getMDataEntityMap,
  addMDataEntityMapToCache
};
