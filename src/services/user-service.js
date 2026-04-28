const { JWT_KEY } = require('../config/server-config');
const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.createUser(data);
            return user;
        } catch (error) {
            console.log('Something went wrong at the service layer.');
            throw error;
        }
    }

    createToken(user) {
        try {
            const res = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
            return res;
        } catch (error) {
            console.log('Something went wrong at token creation step.');
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const res = jwt.verify(token, JWT_KEY);
            return res;
        } catch (error) {
            console.log('Something went wrong at the time of validation ', error);
            throw error;
        }
    }

    checkPassword(userPassword, encryptedPassword) {
        return bcrypt.compareSync(userPassword, encryptedPassword);
    }
}

module.exports = UserService;