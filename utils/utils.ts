export const isDecimalNumber= (numeric: string): boolean => {
    
    const withDot = numeric.replace(',', '.')

    console.log(withDot);
    console.log(!isNaN(+withDot));
    

    return !isNaN(+withDot)

}

export const toDouleDimesionArray = <T, D>(arr: Array<T>, callback: (arg: T) => D , subarrayLength: number ) => {

    const result: any = []
    let counter = -1

    for (let i = 0; i < arr.length; i++) {

        const transformedValue = callback(arr[i])

        if(!(i%subarrayLength)){
            result.push([])
            counter++   
        }

        result[counter].push(transformedValue)
        
    }

    return result
}