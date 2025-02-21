"use strict"

console.log("modul dosyası çalıştı")


//! tek fonksiyonu dışarı aktarma
// const testFunc= function(){
//     console.log("this is a function")
// }

// module.exports = testFunc

//'-----------------------------------------------//

//! birden fazla değer ve fonskiyon gönderme

// const yil = 2025 

// const testFunc1 = function(){
//     console.log("testFunc1 running")
// }
// const testFunc2= function(){
//     console.log("testFunct2 running")
// }
// module.exports = { //! obje içinde isim değiştirme
//      test1 : testFunc1 ,
//      test2 : testFunc2
// }

 //'----------------------------------------------//

//! tek fonksiyon içinden çağırma

// const singleFunc = function(){
   
//     const yil = 2025 
//   console.log(yil)

//     const testFunc1 = function(){
//         console.log("testFunc1 running")
//     }
//     const testFunc2= function(){
//         console.log("testFunct2 running")
//     }
//  return {testFunc1,testFunc2}

// }
// module.exports = singleFunc

//'---------------------------------------------//
//  //! array olarak dışarı aktarma 
// const testFunc1 = function(){
//     console.log("testFunc1 running")
// }
// const testFunc2= function(){
//     console.log("testFunct2 running")
// }
// module.exports = [testFunc1,testFunc2]

 //'------------------------------------------//

//!direkt export
// module.exports.testFunc1= function(){
//     console.log("testFunc1 running")
// }
// module.exports.testFunc2=function(){
//     console.log("testFunc2 runnig")
// }

 //'------------------------------------------//


 //* Bizim kullanacağımız yöntem (piyasa standartı)
 
module.exports = {
    test1 : function(){
        console.log("test1 running")
    },
    test2 : function(){
        console.log("test2 runnig")
    },
    test3 : function(){
        console.log("test3 running")
    },
    variable : "new value"
}

