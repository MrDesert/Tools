function mathTriangularNumber(N){
    return N * (N+1)/2;
}

function mathTriangularNumberInverse(result) {
    // N² + N - 2*result = 0
    // Дискриминант: D = 1 + 8*result
    // N = (-1 + √D) / 2 (только положительный корень)
    
    const D = 1 + 8 * result;
    const N = (-1 + Math.sqrt(D)) / 2;
    
    return N;
}
