const {Sequelize} = require("sequelize");
const path = require('path');
const fs = require('fs');

const envPath = path.resolve(__dirname, '../.env');
const envVariables = fs.readFileSync(envPath, 'utf-8').split('\n');
envVariables.forEach(variable => {
  const [key, value] = variable.split('=');
  if (key && value) {
    process.env[key] = value.trim();
  }
});

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
// })

const password = "Soccer2694!";
const sequelize = new Sequelize(`postgresql://postgres:${password}@db.dnlovomafvdwfktabpye.supabase.co:5432/postgres`)


module.exports = sequelize;