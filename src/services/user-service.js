const { JWT_KEY } = require('../config/server-config');
const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../utils/error-handler');
class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.createUser(data);
            return user;
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                throw error;
            }
            console.log('Something went wrong at the service layer.');
            throw new AppError(
                'ServerError', 
                'Something went wrong',
                'Logical issue found',
                500
            );
        }
    }

    async signIn(email, password) {
        try {
            // step 1 fetch user by email.
            const user = await this.userRepository.getByEmail(email);
            // step 2 incoming password with encrypted passwork
            const samePword = this.checkPassword(password, user.password);
            if (!samePword) {
                console.log('Password does not match');
                throw {error : 'Incorrect password'};
            }
            // step 3 if passwords match create new jwt token.
            const jwtToken = this.createToken({email: user.email, id: user.id});
            return jwtToken;
        } catch (error) {
            console.log('Something went wrong at the service layer.');
            throw error;
        }
    }
    async isAuthenticated(token) {
        const response = this.verifyToken(token);
        if (!response) {
            throw {error : 'Invalid Token'};
        } 
        const user = await this.userRepository.getById(response.id);
        if (!user) {
            throw {error :'User no longer exists'};
        }
        return user.id;
    }

    async isAdmin(userId) {
        try {
            const response = await this.userRepository.isAdmin(userId);
            return response;
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
        try {
            return bcrypt.compareSync(userPassword, encryptedPassword);
        } catch (error) {
            console.log("Password doesn't match.");
            throw error;
        }
    }
}

module.exports = UserService;