(_=>{
//    const limit = 4294967295
    const limit = 100000000
    let lcm = new Array(limit)
    for(i=1; i<=20; i++) {
        for(p=1; p<=limit; p++) {
            if(p%i===0 && lcm[p]!=0) {
                lcm[p]=1
            } else {
                lcm[p]=0
            }
        }
    }
    console.log(lcm.indexOf(1))
})()

// 1 is even; 0 is odd (wrong)
