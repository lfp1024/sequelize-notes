const {  Teacher, sequelize } = require('./init')

// const birth = Date.now();
// const birth = '2021-02-25 09:00:00'; // 存入的时候减 8h
const birth = new Date('2021-02-25 09:00:00').getTime();
console.log('birth = ', birth); // 1614214800000 => 2021-02-25T01:00:00.000Z
async function createTeacher() {
    let teacher = {
        name: '4',
        birthday: birth,
    }
    return Teacher.create(teacher, { logging: sql => console.log(sql) });
}

async function findOne() {
    const teacher = await Teacher.findOne({ where: { id: 52 } });
    console.log('teacher = ', teacher);
}

(async (fn) => {
    fn()
        .then(data => { console.log('create user:', data) })
        .finally(() => { sequelize.close() })
})(createTeacher)