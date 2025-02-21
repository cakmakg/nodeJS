-- MIN, MAX, AVG, SUM, COUNT,   tek bir değer döndürür
-- En düşük fatura tutarı 
SELECT min(total) as en_dusuk_fatura FROM invoices;
SELECT max(total) as en_yuksek_fatura FROM invoices;
SELECT avg(total) as en_ortalama_fatura FROM invoices;
SELECT round(avg(total),2) as en_ortalama_fatura FROM invoices;
SELECT round(5.5) as en_ortalama_fatura FROM invoices;
SELECT sum(total) as toplam_fatura FROM invoices;
SELECT count(total) as kesilen_fatura_sayisi FROM invoices;
SELECT min(total),max(total),avg(total),sum(total),count(total) FROM invoices;
-- cutomer id kimin için ?
SELECT CustomerId, min(total),max(total),avg(total),sum(total),count(total) FROM invoices;
-- eğer aynı miktarad başka fatura var ise en üstteki gelir
SELECT CustomerId, min(total) as en_dusuk_fatura FROM invoices;


--SUB QUERY (nested)
-- ortalama sürenin üzerindeki track lar
-- ortalama süre
SELECT avg(Milliseconds) FROM tracks;

SELECT * FROM tracks WHERE Milliseconds>400000;
SELECT * FROM tracks WHERE Milliseconds>(SELECT avg(Milliseconds) FROM tracks);

-- ortalama faturadan yüksek olan fatura sayısı
SELECT avg(total) FROM invoices;
SELECT * FROM invoices WHERE total>(SELECT avg(total) FROM invoices);
SELECT count(*) FROM invoices WHERE total>(SELECT avg(total) FROM invoices);

SELECT * 
FROM invoices 
WHERE total>(SELECT avg(total) FROM invoices);
--WHERE total>10;
-- 'Go Down' müzik parçası hangi albümde
SELECT * FROM tracks WHERE Name='Go Down';
SELECT AlbumId FROM tracks WHERE Name='Go Down';
SELECT * FROM albums WHERE AlbumId=(SELECT AlbumId FROM tracks WHERE Name='Go Down');

-- "Let There Be Rock" albümünde hangi parçalar var
SELECT * FROM tracks WHERE AlbumId=4;
SELECT AlbumId from albums where Title= 'Let There Be Rock';
SELECT * 
FROM tracks 
WHERE AlbumId=(SELECT AlbumId 
				from albums 
				where Title= 'Let There Be Rock');
-- berlin de fatura kesilen müşterilerin ad soyad ve telefonu
SELECT CustomerId from invoices WHERE BillingCity= 'Berlin'; 
SELECT * FROM customers WHERE  CustomerId=38 or CustomerId=36;
--veya
SELECT * FROM customers WHERE  CustomerId IN(38 ,36);

SELECT FirstName,LastName,Phone 
FROM customers 
WHERE  CustomerId IN (SELECT CustomerId from invoices WHERE BillingCity= 'Berlin');

--Amerikadaki  müşterilerin sayısı
SELECT count(*) FROM customers WHERE Country='USA';
--Amerikadaki  fatura kesilen müşterilerin sayısı
SELECT count(*) FROM invoices WHERE BillingCountry='USA';
--Amerikadaki fatura kesilen müşterilerin bilgileri
SELECT  CustomerId FROM invoices WHERE BillingCountry='USA';
SELECT * FROM customers WHERE CustomerId in(SELECT  CustomerId FROM invoices WHERE BillingCountry='USA');

-- JOIN 
-- INNER JOIN
-- hangi albüm hangi artiste ait

SELECT * 
FROM albums 
JOIN artists ON albums.ArtistId=artists.ArtistId ;  

SELECT * 
FROM artists 
INNER JOIN albums ON artists.ArtistId=albums.ArtistId ;

SELECT * 
FROM artists 
LEFT JOIN albums ON artists.ArtistId=albums.ArtistId ;
-- hangi fatura kime ait
SELECT * 
FROM invoices
JOIN customers
ON invoices.CustomerId=customers.CustomerId;

SELECT invoices.InvoiceId, invoices.Total,customers.FirstName,customers.LastName
FROM invoices
JOIN customers
ON invoices.CustomerId=customers.CustomerId;

SELECT invoices.InvoiceId, invoices.Total,customers.FirstName,customers.LastName
FROM customers
LEFT JOIN invoices
ON customers.CustomerId=invoices.CustomerId ORDER BY InvoiceId;

-- her bir müzik parçasının adı ve türü
SELECT tracks.Name,tracks.GenreId,genres.GenreId,genres.Name 
FROM tracks 
JOIN genres 
ON tracks.GenreId=genres.GenreId;
-- müzik parçasının adı türü hangi albüme ait olduğu. hangi medya türünde olduğunu getirin
SELECT tracks.Name,genres.Name,media_types.Name
FROM tracks 
JOIN genres ON tracks.GenreId=genres.GenreId 
JOIN media_types ON tracks.MediaTypeId=media_types.MediaTypeId;
--Examples
-- müşteilerden mail domain i apple olanlar
SELECT * FROM customers WHERE Email like '%apple%';
-- almanyada kaç müşteri var
SELECT count(*) FROM customers WHERE Country='Germany';
-- kaç farklı ülkeden müşterim var
SELECT count(DISTINCT(Country)) as musyeriOlanUlkeSayisi FROM customers;
-- GROUP BY
-- hangi ülkeden kaç adet müşterim var
SELECT Country, count(*) FROM customers GROUP BY Country;

-- hangi müşteriye kaç adet fatura kesildi
SELECT invoices.CustomerId,customers.FirstName,count(*) 
FROM invoices
JOIN customers
ON invoices.CustomerId=customers.CustomerId GROUP BY invoices.CustomerId  ;
