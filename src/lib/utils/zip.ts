export default function zip(...arrays: Array<Array<any>>): Array<Array<any>> {
    return Array.apply(null, Array(arrays[0].length)).map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
}
