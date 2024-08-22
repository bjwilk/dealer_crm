const config = require('./index');
require('dotenv').config();
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DATABASE_URL, 
//   {
//     dialect: 'postgres',
//     define: {
//       schema: 'dev_crm_db' // Specify the schema here
//     },
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       }
//     },
//     logging: (msg) => console.log(msg) // Enable logging if needed
//   }
// );


// module.exports = {
//   development: {
//     use_env_variable: 'DATABASE_URL',
//     dialect: 'postgres',
//     seederStorage: 'sequelize',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false, // This option allows self-signed certificates or other SSL issues
//       }
//     },
//     database: process.env.DB_NAME,
//     username: process.env.DATABASE_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     define: {
//       schema: 'crm_db' // Ensure the schema matches
//     },
//     logging: (msg) => console.log(msg) // Enable logging if needed
//   },
//   production: {
//     use_env_variable: 'DATABASE_URL',
//     dialect: 'postgres',
//     seederStorage: 'sequelize',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       }
//     },
//     define: {
//       schema: process.env.SCHEMA
//     },
//     logQueryParameters: true,
//   }
// };

// module.exports = {
//   development: {
//     storage: config.dbFile,
//     dialect: "sqlite",
//     seederStorage: "sequelize",
//     logQueryParameters: true,
//     typeValidation: true
//   },
//   production: {
//     use_env_variable: 'DATABASE_URL',
//     dialect: 'postgres',
//     seederStorage: 'sequelize',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       }
//     },
//     define: {
//       schema: process.env.SCHEMA
//     }
//   }
// };


module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    },
    logging: console.log
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    },
    logging: console.log
  }
};