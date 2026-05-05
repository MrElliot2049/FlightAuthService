const { where } = require('sequelize');
const { User, Role } = require('../models/index');
const ValidationError = require('../utils/validation-error');
const ClientError = require('../utils/client-error');
const {StatusCodes} = require('http-status-codes');
class UserRepository {
    async createUser(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
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

    async getById(id) {
        try {
            const user = await User.findByPk(id, {
                attributes : ['email','id']
            });
            return user;
        } catch (error) {
            console.log('Something went wrong at the repository layer.');
            throw error;
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where : {
                    email : userEmail
                }
            });
            if (!user) {
                throw new ClientError(
                    'ATTRIBUTE_NOT_FOUND',
                    'Email is wrong',
                    'no entry in the db with given mail',
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
        } catch (error) {
            console.log('Something went wrong at the repository layer.');
            throw error;            
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where : {
                    name: 'ADMIN'
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log('Something went wrong at the repository layer.');
            throw error;  
        }
    } 
}

module.exports = UserRepository;