/**
 * state machine sequencer
 */

class StateMachine {

    constructor(initialData, actions){
        this[initialData.name] = initialData.value
        this.currentPosition = 0
        this.stop = actions.length
        for (let i = 0; i < actions.length; i++) {
            this[i + 1] = actions[i]
        }
    }

    next(arg){
        this.state++
        
        if(this[this.state]){

            const arg = 

        }
    }

    

}

const initialData = {
    name: "amount",
    value: 56
}

const actions = [
    {
        action: (value) => {
            value = value - 6
        },
        value: 6
    },
    {
        action: (value) => {
            value = value * 2
        },
        value: 6
    },
    {
        action: (value) => {
            value = value * 2
        },
        value: 6
    }
]


const stateMachine = new StateMachine(initialData, actions)

for (const key in stateMachine) {
    if (Object.hasOwnProperty.call(stateMachine, key)) {
        const element = stateMachine[key];
        console.log(key, element);
    }
}