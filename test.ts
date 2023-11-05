type TPet = {
    name: string
    class: string
    age: number
}

const turtle1: Partial<TPet> = {
    name: "Pepa",
    age: 25
}

const turtle2: TPet = {
    name: "Repa",
    age: 14,
    class: "turtle"
}

function isTurtle(pet: TPet): pet is TPet {
    
    const keys = []
}

function printData(pet: TPet) {
    
    for (const key in pet) {
       console.log(pet[key]);
       
    }

}

printData(turtle1)
printData(turtle2)