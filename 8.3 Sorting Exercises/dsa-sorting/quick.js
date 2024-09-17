/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, startIndex = 0, endIndex = arr.length - 1) {
    let pivot = arr[startIndex];
    let swapIndex = startIndex;

    for (let i = startIndex + 1; i <= endIndex; i++) {
        if (arr[i] < pivot) {
            swapIndex++;
            [arr[swapIndex], arr[i]] = [arr[i], arr[swapIndex]];
        }
    }

    [arr[startIndex], arr[swapIndex]] = [arr[swapIndex], arr[startIndex]];
    return swapIndex;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr, leftIndex = 0, rightIndex = arr.length - 1) {
    if (leftIndex < rightIndex) {
        let pivotIndex = pivot(arr, leftIndex, rightIndex);

        quickSort(arr, leftIndex, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, rightIndex);
    }

    return arr;
}

module.exports = { pivot, quickSort };