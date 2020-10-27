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
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        timezone: '+08:00' //时区转换
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
    classId: Sequelize.INTEGER,
}, {
    timestamps: false
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
    timestamps: false
});

// 同步数据模型，建立表
// sequelize.sync({
//     alter: true
// }).then((data) => { console.log(`${database.dbName} 表修改创建成功`) })


module.exports = {
    sequelize,
    Student,
    Class,
}