function comparePairwise(
    array: number[],
    comparisonFunction: (a: number, b: number) => boolean
    ) {
        for (let i = 0; i < array.length; i++) {
            for (let j = i + 1; j < array.length; j++) {
            if (!comparisonFunction(array[i], array[j]) && array[i] > array[j]) {
                return i;
            } else if (!comparisonFunction(array[i], array[j]) && array[i] < array[j]) {
                return j;
            }
            }
        }
    return null;
}

export default comparePairwise

