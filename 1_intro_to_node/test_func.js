// Array functions
let letters = ['a','b','c','e','d'];
console.log(letters);

// sort the existing array
letters.sort((c1,c2) => {
    return c1 > c2
});
console.log(letters);

// return a new array
filtered_letters = letters.filter((c) => {
    return c != 'b';
});
console.log(filtered_letters);