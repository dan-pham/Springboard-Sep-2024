function bubbleSort(arr) {
    const swap = (arr, a, b) => {
        [arr[a], arr[b]] = [arr[b], arr[a]];
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr, j, j+1);
            }
        }
    }

    return arr;
}

module.exports = bubbleSort;