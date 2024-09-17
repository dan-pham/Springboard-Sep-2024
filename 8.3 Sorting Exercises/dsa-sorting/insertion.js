function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let insertedElement = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > insertedElement) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = insertedElement;
    }

    return arr;
}

module.exports = insertionSort;