/**
 * Requires a field to be unique
 * MY GUESS IS THAT THIS WAS A LEFTOVER FUNC FROM MY ECOM PROJECT
 * DOUBLE CHECK THIS LATER BEFORE DEPLOYING TO SEE IF THIS FUNC IS ACTUALLY REFERENCED ANYWHERE
 */
const uniqueMessage = error => {
    let output;
    try {
        const fieldName = error.message.substring(
            error.message.lastIndexOf('.$') + 2,
            error.message.lastIndexOf('_1')
        );
        output = `${fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1)} already exists`;
    } catch (ex) {
        output = 'Unique field already exists';
    }

    return output;
};

/**
 * Get the erroror message from error object
 * Sends back a unique error message based on the error code
 * Ultimately, this code only makes sense if you test sending invalid reqs through Postman or something and then examine what comes back
 * deal with it :)
 */
exports.errorHandler = error => {
    let message = '';

    if (error.code) {
        switch (error.code) {
            // the error codes/cases are pulled from Postman -- simply send an invalid Post req and catch the err, then send it back to see various error codes
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default:
                message = 'Something went wrong';
        }
    }
    // some spaghetti code shit, idk
    // Think it catches multiple errors simultaneously (????)
    // I wouldn't trust it
    else {
        for (const errorName in error.errors) {
            if (error.errors[errorName].message)
                message = error.errors[errorName].message;
        }
    }

    return message;
};
