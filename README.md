# Passport              <br>
<br>
<br>
데이터베이스 목록 출력<br>
show dbs<br>
<br>
데이터베이스 생성<br>
use newDB<br>
db.createCollection("newCollection")<br>
<br>
데이터베이스 삭제<br>
use newDB<br>
db.dropDatabase()<br>
<br>
<hr>
<br>
<b>컬렉션 생성 </b>             <br>
db.createCollection("newCollectionNmae", {capped:false})              <br>
              <br>
<b>컬렉션 삭제</b>              <br>
db.getCollection("newCollectionNmae").drop()              <br>
              <br>
<b>컬렉션에 문서를 추가</b>              <br>
col1 = db.getCollection("newCollection")              <br>
col1.find()              <br>
col1.insert({ vehicle: "plane", speed: "480mph" })              <br>
col1.insert({ vehicle: "car", speed: "120mph" })              <br>
col1.insert({ vehicle: "train", speed: "120mph" })              <br>
              <br>
<b>컬렉션으로부터 문서를 삭제 </b>             <br>
col1 = db.getCollection("newCollection")              <br>
col1.find()              <br>
col1.remove({vehicle: "plane"})              <br>
col1.find()              <br>
col1.remove()              <br>
col1.find()              <br>
              <br>             
<b>컬렉션의 문서를 갱신</b>              <br>
use testDB              <br>
col1 = db.getCollection("newCollection")              <br>
col1.find()              <br>
col1.update(<br>
    {speed: "120mph"},<br>
    {$set: {speed: "150mph", updated: true}},<br>
    {upsert: false, multi: true}<br>
)<br>
col1.save({"_id": ObjectId("52a0caf3312.....ddb"),<br>
           "vehicle": "plane", "speed": "500mph"})<br>
col1.find()<br>
<br>
