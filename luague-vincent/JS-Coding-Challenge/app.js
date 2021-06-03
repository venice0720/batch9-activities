// Variables
let bookCount = 0

function increment(){
    bookCount +=1
}
increment()


let books = ['Moby Dick', 'Alice in Wonderland', 'Hungry Caterpillar']

function replaceBooks(){
    books = ['Life of Pi', 'Grokkings Algorithms', 'New Earth']
}
replaceBooks()


let firstName = 'Molly' 
function textCustomer() {
    {
        console.log('Hi ' + firstName + ', your book is now in')
    }
    
}
textCustomer()


// Objects
const car = {
    brand: 'Honda',
    model: 'mazda',
    color: 'blue',
    racing: false,
    yearModel: 2019,
};

console.log(car.brand)
console.log(car['model'])






// Array
let gardenPlants = [ 
    {
        name: 'roses', 
        origin: 'China'
    },
    {
        name: 'tulips', 
        origin: 'Asia'
    },
]
gardenPlants.unshift('roses');
console.log(gardenPlants)



// Conditional
let username="vincent"
let password="123"
if (username==="bensent" && password==="456"){
    console.log("incorrect")
}
else{
    console.log("correct")
}

// Odd or Even

for( let ctr=0;ctr<=58;ctr++)
if (ctr%2=== 0)
{
    console.log("blue")
}
else{
    console.log("red")
}



