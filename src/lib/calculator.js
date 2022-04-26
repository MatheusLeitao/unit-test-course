module.exports.sum = (x, y) => {
    
    const firstNumber = parseInt(x);
    const secondNumber = parseInt(y);
    
    if (Number.isNaN(firstNumber) || Number.isNaN(secondNumber)) {
        throw new Error('Invalid input');
    }
    
    return firstNumber + secondNumber;
};