(_=>{

const hands = 'AS KD 3D JD 8H 7C 8C 5C QD 6C'
let split = hands.replace(/\s/g,'').match(/.{10}/g)
let wins = 0
let p1 = []
let p2 = []

// add individual hands to p1 and p2
for (let i = 0; i < 2000; i++) {
	if (i%2 == 0) {
		p1.push(split[i])
	} else if (i%2 == 1) {
		p2.push(split[i])
	}
}

function sortFunction(a,b) {return a-b}

function winner(round) {
	let p1hand = p1[round].match(/.{2}/g)
	let p2hand = p2[round].match(/.{2}/g)

    let p1num = []
    let p2num = []

    let p1suits = []
    let p2suits = []

    for (let i = 0; i < 5; i++) {
        
        p1num[i] = p1hand[i][0]
    	switch(p1num[i]) {
            case 'T': {p1num[i] = 10} break;
            case 'J': {p1num[i] = 11} break;
            case 'Q': {p1num[i] = 12} break;
            case 'K': {p1num[i] = 13} break;
            case 'A': {p1num[i] = 14} break;
            default: {p1num[i] = p1num[i] - 0}
    	}

    	p2num[i] = p2hand[i].slice(0,1)
    	switch(p2num[i]) {
            case 'T': {p2num[i] = 10} break;
            case 'J': {p2num[i] = 11} break;
            case 'Q': {p2num[i] = 12} break;
            case 'K': {p2num[i] = 13} break;
            case 'A': {p2num[i] = 14} break;
            default: {p2num[i] = p2num[i] - 0}
    	}

		p1suits[i] = p1hand[i][1]
		p2suits[i] = p2hand[i].slice(1,2)
    }
    p1num.sort(sortFunction)
    p2num.sort(sortFunction)

    let p1pairs = 0
    let p2pairs = 0

    let p1pe = 0
    let p2pe = 0

    // get pairs
    for (let i = 0; i < 4; i++) {
        if (p1num[i] == p1num[i+1]) {
        	p1pairs++
        	if (p1num[i] > p1pe) {
        	    p1pe = p1num[i]
        	}
        }
    }

    for (let i = 0; i < 4; i++) {
        if (p2num[i] == p2num[i+1]) {
        	p2pairs++
        	if (p2num[i] > p2pe) {
            	p2pe = p2num[i]
        	}
        }
    }

    // get 3 of a kind
		let p13 = false
    	let p23 = false

        let p13e = 0
        let p23e = 0

    	for (let i = 0; i < 3; i++) {
            if (p1num[i] == p1num[i+1] && p1num[i+1] == p1num[i+2]) {
            	p13 = true
            	if (p1num[i] > p13e) {
                	p13e = p2num[i]
        	    }
            }
            if (p2num[i] == p2num[i+1] && p2num[i+1] == p2num[i+2]) {
            	p23 = true
				if (p2num[i] > p23e) {
                	p23e = p2num[i]
        	    }
            }
    	}


    //account for accidental pairs
    if (p1pe == p13e && p13e > 0) {
    	p1pairs--
    }
    if (p2pe == p23e && p23e > 0) {
    	p2pairs--
    }

    // get straight
		let p1s = false
    	let p2s = false

		if (p1num[0] == p1num[1]-1 && p1num[1]-1 == p1num[2]-2 && p1num[2]-2 == p1num[3]-3 && p1num[3]-3 == p1num[4]-4) {
			p1s = true
		}
		if (p2num[0] == p2num[1]-1 && p2num[1]-1 == p2num[2]-2 && p2num[2]-2 == p2num[3]-3 && p2num[3]-3 == p2num[4]-4) {
			p2s = true
		}

    // get flush
    	let p1f = false
    	let p2f = false

        if (p1suits[0] == p1suits[1] && p1suits[1] == p1suits[2] && p1suits[2] == p1suits[3] && p1suits[3] == p1suits[4]) {
        	p1f = true
        }
        if (p2suits[0] == p2suits[1] && p2suits[1] == p2suits[2] && p2suits[2] == p2suits[3] && p2suits[3] == p2suits[4]) {
        	p2f = true
        }


// -----------------------------------------------

    // royal flush
    if (p1num[0] == 10 && p1s && p1f && !p2s && !p2f && p2num[0] != 10) {
    	console.log('Won on royal flush')
    	wins++
    	return
    }
    if (p2num[0] == 10 && p2s && p2f && !p1s && !p1f && p1num[0] != 10) {
    	return
    }

    // straight flush
    let p1sf = p1s && p1f
    let p2sf = p2s && p2f

    if (p1sf && !p2sf) {
		console.log('Won on straight flush')
    	wins++
    	return
    } else if (p2s && p2f && !p1s && !p1f) {
    	return
    } else if (p1s && p1f && p2s && p2f) {
		if (p1num[4] > p2num[4]) {
			console.log('Won on straight flush high')
			wins++
			return
		} else {
			return
		}
    }


    // four of a kind
    {
        let p14 = p1num.slice(0,4).every((v,i,a) => v==a[0]) || p1num.slice(1,5).every((v,i,a) => v==a[0])
    	let p24 = false

		for (let i = 0; i < 2; i++) {
            if (p2num[i] == p2num[i+1] && p2num[i+1] == p2num[i+2] && p2num[i+2] == p2num[i+3]) {
            	p24 = true
            }
    	}

		if (p14 && !p24) {
			console.log('Won on four of a kind')
    		wins++
    		return
    	} else if (p24 && !p14) {
    		return
    	} else if (p14 && p24) {
			if (p1num[2] > p2num[2]) {
            	console.log('Won on four of a kind high')
				wins++
				return
			} else {
				return
			}
    	}
    }

    // full house
    if (p13 && p1pairs == 1 && !p23) {
		console.log('Won on full house')
    	wins++
    	return
    } else if (p23 && p2pairs == 1 && !p13) {
    	return
    } else if (p23 && p13 && p2pairs == 0 && p1pairs == 0) {
		if (p1num[2] > p2num[2]) {
			console.log('Won on full house high')
        	wins++
        	return
        } else {
        	return
        }
    }

    // flush
	if (p1f && !p2f) {
        console.log('Won on flush')
		wins++
		return
	} else if (p2f && !p1f) {
		return
	} else if (p1f && p2f) {
		if (p1num[2] > p2num[2]) {
			console.log('Won on flush high')
        	wins++
        	return
        } else {
        	return
        }

	}


    // straight
	if (p1s && !p2s) {
		console.log('Won on straight')
		wins++
		return
	} else if (p2s && !p1s) {
		return
	} else if (p1s && p2s) {
		if (p1num[4] > p2num[4]) {
			console.log('Won on straight high')
			wins++
			return
		} else {
			return
		}
	}

    // three of a kind
	if (p13 && !p23) {
		console.log('Won on three')
		wins++
		return
	} else if (p23 && !p13) {
		return
	} else if (p13 && p23) {
        if (p1num[2] > p2num[2]) {
        	console.log('Won on three high')
        	wins++
        	return
        } else {
        	return
        }
	}


    // two/one pair win
    if (p1pairs > p2pairs) {
    	console.log('Won on pairs')
    	wins++
    	return
    } else if (p2pairs > p1pairs) {
    	return
    } else if (p1pairs == p2pairs && p1pairs != 0) {
        if (p1pe > p2pe) {
        	console.log('Won on pairs high')
        	wins++
        	return
        } else {
        	return
        }
    }


    // high card
    if (p1num[4] > p2num[4]) {
    	console.log('Won on high')
    	wins++
    	return
    } else {
    	return
    }
}

let binstr=''
for (let i = 0; i < 1000; i++) {
	let oldwins = wins
    winner(i)
    let won = (wins > oldwins)
    binstr += (won)?'1':'0'
}

console.log(wins)
console.log(binstr)
for (let i = 0; i < 1000; i += 10) {
// 	console.log(i, binstr.slice(i,i+10))
}
})()
