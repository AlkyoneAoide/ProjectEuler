(_=>{
    const N = 600851475143
    const svN = 1000000
    const sqsvN = Math.round(Math.sqrt(N))
    let sieve = new Array(svN)
    sieve.fill(1)

    for(i=2; i<sqsvN; i++) {
        for(b=i+i; b<svN; b+=i) {
            sieve[b]=0
        }
    }

    let lpf
    for(i=2; i<svN; i++) {
        if(N%i===0 && sieve[i]==1) {
            lpf=i
        }
    }
    console.log(lpf)
})()
