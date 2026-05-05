const AppError = require('./error-handler');
const {StatusCodes} = require('http-status-codes');

class ValidationError extends AppError {
    constructor(error) {
        let ErrorName = error.name;
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        super(
            ErrorName,
            'Validation error has occured',
            explanation,
            StatusCodes.BAD_REQUEST
        ) 
    }
}

module.exports = ValidationError;