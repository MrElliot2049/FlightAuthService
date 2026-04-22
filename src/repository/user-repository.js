const { User } = require('../models/index');

class UserRepository {
    async createUser(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong at the repository layer.');
            throw error;
        }
    }

    async deleteUser(UserId) {
        try {
            await User.destroy({
                where : {
                    id: UserId
                }
            });
            return true;
        } catch (error) {
            console.log('Something went wrong at the repository layer.')
            throw {error};
        }
    }

}

module.exports = UserRepository;