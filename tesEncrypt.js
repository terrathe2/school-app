const crypto = require('crypto');

let alphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
// let secret = "";

// for (let i = 0; i < 8; i++) {
//   secret+= alphanumeric[Math.floor(Math.random()*63)];
// }

const secret = "V4XPSGlU"
const hash = crypto.createHmac('md5', secret).update('terrathe2').digest('hex');
console.log(hash);

// 982d953f572cfa9c88a575ac1bbb6863
// 26fbc37a856bbe26b319031b62c7311f
// b545843ec06b9534afc88bd2f86732c4
