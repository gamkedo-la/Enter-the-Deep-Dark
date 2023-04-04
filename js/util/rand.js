function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(array) {
    return array[randInt(0, array.length - 1)];
}
