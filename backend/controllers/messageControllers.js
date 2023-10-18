const asyncHandler = require("express-async-handler");

// @desc      Create new message
// @route     POST api/message/
// @access    Protected
const sendMessage = asyncHandler(async (req, res) => {});

module.exports = { sendMessage };
