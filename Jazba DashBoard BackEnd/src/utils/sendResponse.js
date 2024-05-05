export const sendResponse = (res, success, message, data = null, statusCode = 200, token) => {
    res.status(statusCode).json({ success, message, data: Array.isArray(data) ? data : [data], token, statusCode });
};
