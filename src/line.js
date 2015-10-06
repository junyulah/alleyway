/**
 * after joining get a promise function
 */
var commaJoin = (left, right) => (...y) => {
    let leftPros = left.apply(undefined, y);
    let rightPros = right.apply(undefined, y);
    let counter = 0;
    let results = [];
    results.__special__jointed = true;

    return new Promise((resolve, reject) => {
        leftPros.then(res => {
            counter++;
            results = res.concat(results);
            if (counter === 2) {
                resolve(results);
            }
        }).catch(err => reject(err));
        rightPros.then(res => {
            counter++;
            results = results.concat(res);
            if (counter === 2) {
                resolve(results);
            }
        }).catch(err => reject(err));
    });
}

export default {
    commaJoin
}