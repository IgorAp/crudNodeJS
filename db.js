const MongoClient = require('mongodb').MongoClient;

//Esse objeto serve para converter o id no formato que o mongo entende
const ObjectId = require('mongodb').ObjectId;
//string de conexão
MongoClient.connect('mongodb://localhost:27017/workshop').
then(conn=>global.conn=conn.db("workshop")).catch(err=>console.log(err));

function findAll(callback){
    global.conn.collection("customers").find({}).toArray(callback);
}

function insert(cliente,callback){
    global.conn.collection("customers").insert(cliente,callback);
}
function findOne(id,callback){
    global.conn.collection("customers").findOne(new ObjectId(id),callback);
}
function update(id,cliente,callback){
    global.conn.collection("customers").update({_id:new ObjectId(id)},cliente,callback);
}
function deleteOne(id,callback){
    global.conn.collection("customers").deleteOne({_id:new ObjectId(id)},callback);
}
module.exports = {findAll,insert,findOne,update,deleteOne};