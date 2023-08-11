const regexImage = /^(https?:\/\/)?[^\s]*\.(?:jpe?g|png|gif|test|bmp|pdf|svg)$/;
const regexVideo = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = { regexImage, regexVideo };
