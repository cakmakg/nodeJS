-- Tek satırlık yorum
/*
 Mmulti line comment
*/
-- SQL BNF form
-- artist tablosunda neler var

--SELECT fieldname FROM tablename;  
SELECT * FROM artists; -- tüm sutunlar
SELECT Name FROM artists;

-- Müşterilerin tüm bilgisi
SELECT * FROM customers;
-- Müşterilerin sadece adı soyadı bilgisi
SELECT FirstName,LastName FROM customers;
-- as ifadesi
SELECT FirstName as adi, LastName as soyadi FROM customers as musteriler;
SELECT FirstName as adi, LastName as soyadi FROM customers as musteriler;

-- WHERE  şart ifadesi
-- SELECT fields FROM table WHERE şartifadesi
-- sadece berlin deki müşteri bilgileri
--şart ifadesi içinde case sensitive
SELECT * FROM customers WHERE city='berlin'; --  sonuç getirmez

select * from customers where city='Berlin'; -- sonuç getirir
--BNF form
SELECT * 
FROM customers
WHERE city='Berlin';

-- =, !=, <>, >=,<= , BETWEEN 
-- amerika dışındaki müşteirler
SELECT * FROM customers WHERE Country!='USA' ;
-- AND, OR, IN, NOT IN
-- müşterinin ülkesi almanya veya amerika olanlar
SELECT * FROM customers WHERE Country='USA' OR Country='Germany';
-- veya IN ile yazabiliriz
SELECT * FROM customers WHERE Country IN ('USA','Germany');
SELECT * FROM customers WHERE Country NOT IN ('USA','Germany'); -- bu iki ülke dışındakiler
SELECT * FROM customers WHERE Country!='USA' AND Country!='Germany'; 
--Fatura tutarı  5 ile 10 arasında olanlar 
SELECT * FROM invoices WHERE total>=5.94 AND total<=10;
SELECT * FROM invoices WHERE  total BETWEEN 5.94 and 10;

-- like   %, _
-- ismi a ile başlayan müşeriler
SELECT * FROM customers WHERE FirstName LIKE 'b%';
-- ismi s ile biten müşeriler
SELECT * FROM customers WHERE FirstName LIKE '%s';
SELECT * FROM customers WHERE FirstName LIKE 'l%s'; -- L ile başlasın s ile bitsin
SELECT * FROM customers WHERE FirstName LIKE 'l_c%';
SELECT * FROM customers WHERE FirstName LIKE 'l_c_';
-- ORDER BY SIRALAMA (ASC, DESC)
SELECT * FROM customers ORDER BY FirstName ASC;
SELECT * FROM customers ORDER BY FirstName DESC;
SELECT * FROM customers ORDER BY FirstName; -- default ASC 
SELECT * FROM customers ORDER BY FirstName,LastName DESC; 
-- DISTINCT
--her ülkeyi tek bir defa getir
SELECT DISTINCT(Country) FROM customers;
--count 
-- kaç farklı ülkeden müşterim var
SELECT Count( DISTINCT(Country)) FROM customers;
