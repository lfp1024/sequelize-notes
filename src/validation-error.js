'use strict';

const { Student, Teacher, Class, sequelize } = require('./init');
const { Op } = require('sequelize');
const { sleep } = require('./util');

/**
 * 有唯一性约束的表中插入数据
 * 1. 如果快速插入两个相关的记录，第二次插入会因违反唯一性约束而抛出异常 SequelizeUniqueConstraintError: Validation error
 * 2. 一般情况下是需要避免插入两个相同的记录。通过代码先获取表中记录，判断是否有相同的记录，没有再插入
 *   此时执行插入操作的方法需要加锁，即第一次调用的时候，获取到表所有记录，判断没有该新记录，执行插入操作，在操作没有结束之前，不能执行第二次调用
 *   否则，第二次调用在第一次调用插入操作完成之前获取到表所有记录，判断也没有改新记录，也去执行插入操作，就会触发唯一性约束。
 */

(() => {
    let n = 0
    // 以下代码会触发唯一性约束: UnhandledPromiseRejectionWarning: SequelizeUniqueConstraintError: Validation error
    // async function readAndWrite() {
    //     console.log('called1', n += 1);
    //     const students = await Student.findAll();
    //     console.log('called2', n += 1);
    //     await sleep(1000);
    //     console.log('called3', n += 1);
    //     const student = {
    //         name: 'lfo',
    //         age: 28,
    //         isAdult: 1,
    //         class_id: 1
    //     }
    //     console.log('create student', student.name);
    //     if (!students.find(student => student.name === 'lfo')) {
    //         console.log('not found lfo');
    //         await Student.create(student);
    //         console.log('create success');
    //     }
    // }

    // 加锁
    let lock = false; // 方法作用域之外
    let waitQueue = [];
    async function readAndWrite(name) {
        if (lock) {
            console.log('readAndWrite = ', readAndWrite);
            return waitQueue.push(() => readAndWrite(name))
        }
        lock = true;
        console.log('called1', n += 1, name);
        const students = await Student.findAll();
        console.log('called2', n += 1);
        await sleep(1000);
        console.log('called3', n += 1);
        const student = {
            name: 'lfo',
            age: 28,
            isAdult: 1,
            class_id: 1
        }
        console.log('create student', student.name);
        if (!students.find(student => student.name === 'lfo')) {
            console.log('not found lfo');
            await Student.create(student);
            console.log('create success');
        } else {
            console.log('found lfo');
        }
        lock = false;
        waitQueue.length > 0 ? waitQueue.shift()() : null;
    }

    const name = ['小米', '小明']
    new Array(2).fill(null).forEach(async ele => {
        await readAndWrite(name.pop());
    });

})();
