module.exports = {
    sleep: async millisec => {
        return new Promise(res => setTimeout(res, millisec))
    }
}