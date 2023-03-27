(_=>{
    const N = 10001
    const svN = 1000000
    const sqsvN = Math.round(Math.sqrt(N))
    let sieve = new Array(svN)
    sieve.fill(1)

    for(i=2; i<sqsvN; i++) {
        for(b=i+i; b<svN; b+=i) {
            sieve[b]=0
        }
    }

    let pr = 0
    for(i=0; i<=svN; i++) {
        if(sieve[i]==1) {
            pr=pr+1
            if(pr==10001) {
                console.log(i)
                return
            }
        }
    }
})()
