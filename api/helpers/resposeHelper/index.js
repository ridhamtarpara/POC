// # Middleware
// Handles all error code files
// Index file to manage multiple error code files at scale

const gError = require('./error.js');
// const gSuccess = require('./success.js');
const logger = require('../logger');

module.exports = {
  errBody: error => {
    const message = gError[error.message];
    // if message is not available in response code
    if (message) {
      return {
        status: 'NOTOK',
        errorcode: parseInt(error.message, 10),
        errormessage: message.errormessage,
        messagedetail: message.messagedetail,
      };
    }
    logger.log(error);
    // if unexpected error
    return {
      status: 'NOTOK',
      errorcode: 1000,
      errormessage: 'Something went wrong from our side',
      messagedetail: 'We are looking into it!! please try after some time',
    };
  },

  successMsg: (data, code) => ({
    status: 'OK',
    info: data,
  }),

  // generate error message
  generateErrorRes: (e, data) => module.exports.errBody(e),
  // generate success message
  generateSuccessRes: (data, message) => module.exports.successMsg(data, message),
};
