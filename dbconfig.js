module.exports = {
    user          : process.env.NODE_ORACLEDB_USER,
    password      : process.env.NODE_ORACLEDB_PASSWORD,
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING,
    externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
  };
  
