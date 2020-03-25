(_ => {
    for(let i = 999*999; i >= 100*100; i--) {
        let s = i.toString()
        let sr = [...s].reverse().join('')
	if (s == sr) {
            for(let d=999; d>=100; d--) {
                if(i%d===0 && d.toString().length===3 && (i/d).toString().length===3) {
                    console.log(i, d, i/d)
		    return
                }
            }
        }
    }
})()
