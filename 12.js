(_=>{
    let divisors = n=>{
        let d = 0
        let r = Math.ceil(Math.sqrt(n))
        for (let i = 1; i <= r; i++) {
            if (n%i == 0) {
                d = d + 2
            }
        }
        return d
    }

    let dmax = 0
    let t = 0

    for (let n = 1; n < 50000; n++) {
        t = t + n

        let d = divisors(t)
        if (d > dmax) {
            dmax = d
            console.log("t:", t, "n:", n, "dmax:", dmax)
        }

        if (d > 500) {
            console.log(t, "done")
            return false
        }
    }
    console.log("done")
}
)()
