function getMax (array: number[]) {
    max = array[0]
    i = 1
    while (i < array.length) {
        if (max < array[i]) {
            max = array[i]
        }
        i += 1
    }
    return max
}
let i = 0
let max = 0
let data: number[] = []
