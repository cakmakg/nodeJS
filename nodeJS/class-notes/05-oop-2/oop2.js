'use strict';

/* ---------------------------------------- *
                OOP & CLASSES
/* ---------------------------------------- *
//? OOP: Object Oriented Programming
//? DRY: Don't Repeat Yourself
//? BLUEPRINT: Taslak (Mimarların kullandığı mavi şablon kağıdı)
//? CLASS: Obje türetmek için kullanılacak şablon.

//* Class Expression
// const PascalCaseClassName = class { ...}

//* Class Declaration

class PascalCaseClassName {

    propertyName = 'value' // attribute, field
    undefinedProperty

    constructor(parametre1, parametre2 = 'default-value') {
        this.parametre1 = parametre1
        this.parametre2 = parametre2
    }

    methodName() {
        return this
    }
}

//? INSTANCE = Bir Classtan turetilen objedir.

const instanceExp = new PascalCaseClassName(0, 1)
const instanceExp2 = new PascalCaseClassName(0)
// console.log(instanceExp);
console.log(instanceExp2);

/* ---------------------------------------- *

class Car {
    
    isRunning = false

    constructor(brand, model, year) {
        this.brand = brand
        this.model = model
        this.year = year
    }


    runEngine() {
        this.isRunning = true
        console.log('Engine Started');
        return this.isRunning
    }
}

const Bmw = new Car('BMW', '760li', 2025)
console.log(Bmw);
Bmw.runEngine()
console.log(Bmw);
const Mercedes = new Car('Mercedes', 'AMG', 2025)
console.log(Mercedes);


/* ---------------------------------------- *
//? INHERITANCE: MirasAlma. Başka bir class'ın tüm özelliklerini/metodlarını devralma. (parent-child ilişkisi kurulur.)
//? SUPER: Parent Class - THIS: Child Class

class Vehicle {

    vechicleIsActive = true

    constructor(vehicleType) {
        this.vehicleType = vehicleType
    }
}

class Car extends Vehicle {

    isRunning = false

    constructor(brand, model, year, vechileType) {
        super(vechileType) // Parent classa parametre gondermek icin 'super' keywordunu kullaniriz.
        this.brand = brand
        this.model = model
        this.year = year
    }
}

const Bmw = new Car('BMW', '760li', 2025, 'Car')

// const Motorbike = new Car('Harley-Davidson', 'Street 750', 2021, 'Motorbike')
// console.log(Motorbike)

class Accessory extends Car {

    constructor(brand, model, year, vehicleType, accessoryName) {
        super(brand, model, year, vehicleType)
        this.accessoryName = accessoryName
    }
}

// const Bmw = new Accessory('BMW', '760li', 2025, 'Car', 'Bosh Climate');
const BmwAccessory = new Accessory(Bmw.brand, Bmw.model, Bmw.year, Bmw.vehicleType, 'Bosh Climate');


console.log(BmwAccessory);

/* ---------------------------------------- *
//? Polymorphism: Miras aldığımız sınıfın özellik/methodlarını yeniden yazabilme.
//? - Override: Üst metodla aynı isim ve yapıda yeni bir metod yazma. (ezme / iptal etme / önceliğini alma)
//? - Overload: Üst metodla aynı isimde ama farklı yapıda (farklı adet/tip) yeni method oluşturma. (aynı anda ikisi de aktif) (JS desteklemez)

class Vehicle {

    vechicleIsActive = true

    constructor(vehicleType) {
        this.vehicleType = vehicleType
    }

    getDetailOfType() {
        console.log('This is from Vehicle Class');
        return this.vehicleType
    }
}

class Car extends Vehicle {

    isRunning = false

    constructor(brand, model, year, vechileType) {
        super(vechileType) // Parent classa parametre gondermek icin 'super' keywordunu kullaniriz.
        this.brand = brand
        this.model = model
        this.year = year
    }


    //? - Override: Üst metodla aynı isim ve yapıda yeni bir metod yazma.
    getDetailOfType() {
        console.log('This is from Car Class');
        return super.getDetailOfType();
    }

}

const Bmw = new Car('BMW', '760li', 2025, 'Car')

console.log(Bmw.getDetailOfType());


/* ------------------------------------------------------- *
//? Access Modifiers:
//? - PUBLIC: Genel erişime açık. (Parent: Yes, Child: Yes, Instance: Yes)
//? - PROTECTED: Sadece tanımlı olduğu class ve Inherit edilen child-class erişebilir. (Parent: Yes, Child: Yes, Instance: No) (JS Desteklemez.)
//? - PRIVATE: Sadece tanımlı olduğu class içinde erişim var. (Parent: Yes, Child: No, Instance: No)

class Vehicle {

    vechicleIsActive = true

    #privateAttribute = 'Private Attribute'
    #privateMethod() { console.log('This is a private method') }


    _protetetedProperty = 'Protected Property'
    _protetetedMethod() { return this }


    constructor(vehicleType) {
        this.vehicleType = vehicleType
    }

    getDetailOfType() {
        console.log('This is from Vehicle Class');
        return this.vehicleType
    }
}

class Car extends Vehicle {

    isRunning = false

    constructor(brand, model, year, vechileType) {
        super(vechileType) // Parent classa parametre gondermek icin 'super' keywordunu kullaniriz.
        this.brand = brand
        this.model = model
        this.year = year
    }


    //? - Override: Üst metodla aynı isim ve yapıda yeni bir metod yazma.
    getDetailOfType() {
        console.log('This is from Car Class');
        return super.getDetailOfType();
    }

}

const Bmw = new Car('BMW', '760li', 2025, 'Car')
// console.log(Bmw.privateAttribute);
// console.log(Bmw.privateMethod());
console.log(Bmw.protetetedProperty);

/* ------------------------------------------------------- */
//? GETTER & SETTER METHODS: Görevi veri getirme (getter) ve veri güncelleme (setter) olan metodlardır.
//? "STATIC" KEYWORD: Class'dan direkt erişim. (Instance erişemez.)

class Car {

    isRunning = false
    #price = 100

    constructor(brand, model, year) {
        this.brand = brand
        this.model = model
        this.year = year
    }

    get getPrice() {
        return this.#price
    }

    set setPrice(newPrice) {
        this.#price = newPrice
    }


    //? Direkt class ile erişmek istediklerimizi static ile işaretleriz.
    //? Statik property veya methodlara intance ile erişilmez.
    static staticProp = 'Static prop'

    static CustomObject() {
        console.log('This is custom object');
    }

}

const Bmw = new Car('BMW', '760li', 2025)

// console.log(Bmw.price); // Private methodalara direk ulasamayiz bunun icin getter methodlarini kullaniriz.
// console.log(Bmw.getPrice()); // Getter methodlarinda parantez kullanilmaz.
console.log(Bmw.getPrice);
Bmw.setPrice = 50
console.log(Bmw.getPrice);

// JSON.parse()
// Object.values()

Car.CustomObject()
console.log(Car.staticProp);

/* ------------------------------------------------------- */

//* Happy Coding :)


