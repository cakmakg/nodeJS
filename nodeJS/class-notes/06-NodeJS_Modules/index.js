"use strict"

//  $npm init -y
// npm install //' package-lock.json oluşturur
// nodemon //' nodemon index.js de çalıştırır ve izler.


console.log("indexjs")

//? başka bir js dosyasını içeri aktarma

require("./module/module.js")
// require("./module/module")

// const testFunc= require("./module/module.js")
// testFunc()  //! tek fonksiyonu import etme

// const {test1:func1, test2} = require("./module/module.js") //! ismi değiştirilmiş fonksiyonları yeni isimleriyle dest. ettik 
//  func1()
//  test2()



 //----------------------------------------------------------//

// const singleFunc = require("./module/module.js")
// singleFunc()
// const {testFunc1,testFunc2}= singleFunc()
// testFunc1()
// testFunc2()

//*------------------------------------------------------------//

// const [testFunc1,testFunc2] = require("./module/module.js") //! array olarak karşılama
// testFunc1()

//'--------------------------------------------------//

// testFunc1() //! direkt export sonrası karşılama
// testFunc2()

//'------------------------------------------------------------//

//*Bizim kullanacağımız import yöntemi

// const {test1:func1,test2,test3,variable:deger} = require("./module/module.js")
// // test1()
// func1()
// test2()
// test3()
// // console.log(variable)
// console.log(deger)