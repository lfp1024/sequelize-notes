const { DATE } = require('sequelize')
const Sequelize = require('sequelize')
const { database } = require('./config')

// 实例化 sequelize，连接数据库
const sequelize = new Sequelize(
    database.dbName,
    database.username,
    database.password,
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        pool: {
            max: 20,
            min: 0,
        },
        underscored: true,
        timezone: '+08:00', //时区转换 东八区
        dialectOptions: {
            // typeCast: true,
            // dateStrings: true,

            dateStrings: true,
            typeCast(field, next) {
                console.log('000000000000000000000', field);
                console.log('111111111111111111111 ', Function.toString.call(field.string));
                if (field.type === 'DATETIME') {
                    return field.string(); // 原始字符串
                }
                return next();
            },

            // dateStrings: true,
            // typeCast(field, next) {
            //     console.log('000000000000000000000', field);
            //     console.log('111111111111111111111 ', Function.toString.call(field.string));
            //     if (field.type === 'DATETIME') {
            //         return field.string(); // 原始字符串
            //     }
            //     return next();
            // },

        },
        logging: (sql) => console.log(sql),
    }
)
// 测试连接
sequelize.authenticate()
    // 必须是已经存在的数据库才能连接成功
    .then((data) => { console.log('连接成功，data:', data) })
    .catch((err) => { console.log('连接失败：error:', err) })

// 定义模型
let Student = sequelize.define('student', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
    age: Sequelize.INTEGER,
    isAdult: Sequelize.BOOLEAN,
    class_id: Sequelize.INTEGER,
}, {
    timestamps: false,
    underscored: true,
});

let Class = sequelize.define('class', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
    student_num: Sequelize.INTEGER,
}, {
    // timestamps: false
    underscored: true
    // true => SELECT `id`, `name`, `student_num`, `created_at` AS `createdAt`, `updated_at` AS `updatedAt` FROM `classes` AS `class` WHERE `class`.`name` = '一年级' LIMIT 1;
    // false=> SELECT `id`, `name`, `student_num`, `createdAt`, `updatedAt` FROM `classes` AS `class` WHERE `class`.`name` = '一年级' LIMIT 1
});

let Teacher = sequelize.define('teacher', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
    birthday: Sequelize.STRING,
    sex: Sequelize.INTEGER,
    desc: Sequelize.JSON,
});

// 同步数据模型，建立表
// Teacher.sync({
//     alter: true
// }).then((data) => { console.log(`${database.dbName} 表修改创建成功`) })


module.exports = {
    sequelize,
    Student,
    Class,
    Teacher,
}