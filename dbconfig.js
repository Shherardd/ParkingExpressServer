module.exports = {
    user          : process.env.NODE_ORACLEDB_USER || "shd",
    password      : process.env.NODE_ORACLEDB_PASSWORD || "gg",
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost/XE",
    externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
  };
  