
let generate = (err, message, statusCode, data) => {
    let response = {
        error: err,
        message: message,
        statusCode: statusCode,
        data: data
    }
    return response;
}

module.exports = {
    generate: generate
}