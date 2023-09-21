function * generator(initial) {

    const expense = initial

    const first = yield { expense }
    
    const second = yield { expense, first }

    return { expense, first, second}
}

const gn  = generator("initial")

console.log(gn.next('first').value);
console.log(gn.next('second').value);

console.log(gn.next());