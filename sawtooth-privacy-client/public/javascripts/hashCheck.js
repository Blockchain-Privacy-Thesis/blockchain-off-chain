const crypto = require('crypto');

// Calculate a SHA-512 of the input and returns the hex string of that hash.
function hash(input) {
    return crypto.createHash('sha512').update(input).digest('hex');
}

// Takes in the hash value stored on the blockchain, and calculate the hash of the 
// value in the database. Returns true if they are equal, return false if not. 
function checkHash(blockchainValue, databaseValue) {
    return (blockchainValue.normalize() === hash(databaseValue).normalize());
    /*if (blockchainValue.normalize() === hash(databaseValue).normalize()) {
        return true;
    } else {
        return false;
    }*/
}

// Tests
// console.log("Denne skal printe false: " + checkHash("test", "test"));
// console.log("Denne skal printe true: " + checkHash("ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff", "test"));
