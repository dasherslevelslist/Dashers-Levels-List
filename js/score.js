/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    if (rank > 150) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // Old formula
    /*
    let score = (100 / Math.sqrt((rank - 1) / 50 + 0.444444) - 50) *
        ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    */
    // New formula
    let score = (rank >= 1 && rank <= 150
    ? [
        350,331.71,313.42,291.70,271.78,253.53,236.80,221.47,207.42,194.54,
        182.73,171.91,161.99,152.89,144.56,136.92,129.92,123.50,117.62,112.23,
        110.81,109.39,107.99,106.61,105.24,103.88,102.54,101.21,99.89,98.58,
        97.29,96.01,94.75,93.49,92.25,89.95,87.73,85.58,83.51,81.51,
        79.58,77.72,75.92,74.19,72.52,70.90,69.34,67.83,66.38,64.98,
        63.62,62.31,61.05,59.83,58.66,57.60,56.47,55.37,54.30,53.26,
        52.25,51.26,50.30,49.37,48.46,47.57,46.71,45.87,45.06,44.26,
        43.49,42.74,42.01,41.30,40.60,39.93,39.27,38.63,38.01,37.41,
        36.82,36.24,35.69,35.14,34.61,34.10,33.60,33.11,32.64,32.18,
        31.73,31.29,30.87,30.45,30.05,29.66,29.28,28.91,28.55,28.19,
        27.85,27.52,27.19,26.88,26.57,26.27,25.98,25.70,25.42,25.16,
        24.90,24.64,24.39,24.15,23.92,23.69,23.47,23.26,23.05,22.84,
        22.64,22.45,22.26,22.08,21.90,21.73,21.56,21.39,21.23,21.08,
        20.92,20.78,20.63,20.49,20.36,20.23,20.10,19.97,19.85,19.73,
        19.62,19.50,19.39,19.29,19.18,19.08,18.99,18.89,18.80,18.71
    ][rank - 1]
    : 0) * (
        (minPercent === 100 || percent === 100)
            ? 1
            : 0.1 * (20 / 3) ** ((percent - minPercent) / (100 - minPercent))
    );
        
    score = Math.max(0, score);


    return Math.max(round(score), 0);
}


export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
