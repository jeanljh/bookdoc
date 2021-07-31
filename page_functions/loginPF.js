const loginPO = require('../page_objects/loginPO');
module.exports = {
    clearFields: async () => {
        await loginPO.tfEmail.clear();
        await loginPO.tfPwd.clear();
    } 
}