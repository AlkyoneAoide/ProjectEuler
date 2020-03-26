(_=>{
    console.log('online')
    let sum = 0
    let square = 0
    for(let i=1; i<=100; i++) {
        sum=sum+i*i
        square=square+i
    }
    console.log((square*square)-sum)
})()
