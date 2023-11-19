// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

const makeId = () => {
    var result = '';
    var characters = 'QWERTYUIOPLKJHGFDSAZXCVBNMmnbvcxzasdfghjklpoiuytrewq1234567890';
    var characterLength = characters.length;
    for (var i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
};


// const newTimer = () => {
//     id: makeId(),
//     timer
// }

// setTimerArray([
//     ...timerArray,
//     newTimer
// ])
