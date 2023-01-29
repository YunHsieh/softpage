export const lcs = (a: string | any[], b: string | any[]) => {
    const matrix = Array(a.length + 1).fill().map(() => Array(b.length + 1).fill(0));
    const prev = Array(a.length + 1).fill().map(() => Array(b.length + 1).fill(0));
    for(let i = 1; i < a.length + 1; i++) {
        for(let j = 1; j < b.length + 1; j++) {
            if(a[i-1] === b[j-1]) {
                matrix[i][j] = 1 + matrix[i-1][j-1];
                prev[i][j] = 0;
            } else {
                if(matrix[i-1][j] < matrix[i][j-1]) {
                    matrix[i][j] = matrix[i][j-1]
                    prev[i][j] = 1;
                } else {
                    matrix[i][j] = matrix[i-1][j]
                    prev[i][j] = 2;
                }
            }
        }
    }
    return [matrix, prev];
}

export const showDifferenct = (a: string | any[], b: string | any[], matrix: any[][], prev: any[][]) => {
    let i = a.length
    let j = b.length
    const l = matrix[i-1][j-1]
    let allLen = i + j - (l+1)
    const result = Array(allLen).fill('');
    while ( allLen >= 0 ) {
        if (i==0 && j==0) {
            break
        }else if (i <= 0) {
                result[allLen] = `<deleted>${b[j-1]}`;
            j--;allLen--;
            continue
        } else if (j <= 0) {
                result[allLen] = `<fixed>${a[i-1]}`;
            i--;allLen--;
            continue
        }
        const curPos = prev[i][j]
        if (curPos === 0) {
            result[allLen] = a[i-1];
            i--,j--;
        } else if (curPos === 1) {
                result[allLen] = `<deleted>${b[j-1]}`;
            j--;
        } else if (curPos === 2) {
                result[allLen] = `<fixed>${a[i-1]}`;
            i--;
        }
        allLen--;
    }
    return result
}


// example
// const editor = 'This is a book'.split(" ");
// const userInput = 'This is an apple'.split(" ");

// const [matrix, prev] = lcs(editor, userInput)
// console.log(showDifferenct(editor, userInput, matrix, prev))
