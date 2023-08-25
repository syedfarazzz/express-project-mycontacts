const {constants} = require('../constants');
//building this middleware which gonna accept req and res and convert it to JSON Object
//as before we were having an error as html
const errorHandler =  (err, req, res, next) => {
    //if we have statusCode then it will be given otherwise 500 
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

            case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

            case constants.UNAUTHORIZED:
            res.json({
                title: "Un Authorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

            case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
    
        default:
            console.log("No Error, All Good");
            break;
    }

};

module.exports = errorHandler;