const Realm = require('realm')
const _ = require('lodash')

class Car { }
CarSchema = {
    name: 'Car',
    properties: {
        make: 'string',
        model: 'string',
        miles: 'int',
    }
};

let realm = new Realm({ schema: [CarSchema] });

let carToCreate = new Car()
carToCreate.make = 'honda'
carToCreate.model = 'civic'
carToCreate.miles = 1000


function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

// Create Realm objects and write to local storage
let createdCar = null
realm.write(() => {
    createdCar = realm.create('Car', carToCreate);
    createdCar.miles += 20; // Update a property value
});

const cloneOfCar = _.cloneDeep(createdCar)
console.log(cloneOfCar)

for(var key in createdCar){
    console.log(key)
}