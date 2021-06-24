const { Student, Teacher, sequelize } = require('./init')

async function createUser() {
    let user = {
        name: 'wst',
        age: 19,
        isAdult: true
    }
    return await Student.create(user)
}


// 1. 字段值设置为 undefined，不报错。值为undefined的字段，不会出现在sql语句中
async function upsertUser() {
    let user = {
        name: 'xh',
        age: 12,
        isAdult: undefined
    }
    return await Student.create(user)
}
// const birth = Date.now();
// const birth = '2021-02-25 09:00:00'; // 存入的时候减 8h
const birth  = new Date('2021-02-25 09:00:00').getTime();
console.log('birth = ', birth);
async function createTeacher() {
    let teacher = {
        name: '4',
        birthday: birth,
    }
    return Teacher.create(teacher, { logging: sql => console.log(sql) });
}

(async (fn) => {
    fn()
        .then(data => { console.log('create user:', data) })
        .finally(() => { sequelize.close() })
})(createTeacher)