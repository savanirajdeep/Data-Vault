const SHA256 = require("crypto-js/sha256")


class Block {
    constructor(timestamp, data, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

function createGenesisBlock() {
    return new Block(Date.parse('2021-12-10'), {}, '0');
}

function getLatestBlock(chain) {
    return chain[chain.length - 1];
}
function addBlock(chain, newBlock) {
    newBlock.previousHash = getLatestBlock(chain).hash;
    newBlock.hash = newBlock.calculateHash();
    chain.push(newBlock)
}
function isChainValid(chain) {

    const realGenesis = JSON.stringify(createGenesisBlock());

    if (realGenesis !== JSON.stringify(chain[0])) {
        return false;
    }


    for (let i = 1; i < chain.length; i++) {
        const currentBlock = chain[i];
        const previousBlock = chain[i - 1];

        if (previousBlock.hash !== currentBlock.previousHash) {
            return false;
        }

        if (!currentBlock.hasValidpassword()) {
            return false;
        }

        if (currentBlock.hash !== currentBlock.calculateHash()) {
            return false;
        }
    }
    return true;
}

module.exports.Block = Block;
module.exports.createGenesisBlock =createGenesisBlock;
module.exports.isChainValid = isChainValid;
module.exports.addBlock = addBlock;
module.exports.getLatestBlock =getLatestBlock;