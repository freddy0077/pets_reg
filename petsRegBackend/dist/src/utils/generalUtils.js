"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unslugify = exports.humanReadableDate = exports.parseJwt = exports.generateVerificationCode = exports.randomChars = void 0;
const randomChars = count => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return Array.from({ length: count }, () => possible[Math.floor(Math.random() * possible.length)]).join('');
};
exports.randomChars = randomChars;
const generateVerificationCode = () => {
    const numbers = Math.floor(1000 + Math.random() * 9000);
    const fourLetterString = (0, exports.randomChars)(4);
    return `${fourLetterString}-${numbers}`;
};
exports.generateVerificationCode = generateVerificationCode;
const parseJwt = (token) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};
exports.parseJwt = parseJwt;
const humanReadableDate = (dateString) => {
    // let dateStr = '2023-05-30T00:00:00.000Z';
    let date = new Date(dateString);
    //@ts-ignore
    let options = { day: '2-digit', month: 'short', year: 'numeric' };
    //@ts-ignore
    let humanReadableDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    console.log(humanReadableDate); // Outputs: "30 May 2023"
};
exports.humanReadableDate = humanReadableDate;
const unslugify = (slug) => {
    return slug === null || slug === void 0 ? void 0 : slug.split(/[-_]/).map(word => // map over each word
     word.charAt(0).toUpperCase() + word.slice(1) // capitalize the first letter of each word
    ).join(' '); // join the words back together with spaces
};
exports.unslugify = unslugify;
//# sourceMappingURL=generalUtils.js.map