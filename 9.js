(_=>{
    for(a=1; a<1000; a++) {
        for(b=1; b<1000; b++) {
            for(c=1; c<1000; c++) {
                if(a*a + b*b == c*c) {
                    console.log('Triplet:', a, b, c, 'Sum:', a+b+c, 'Product:', a*b*c)
                }
            }
        }
    }
})()