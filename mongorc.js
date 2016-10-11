function copyCollectionToDatabase(db1,col,db2) {
  // Copies a collection and all of its docs to a different database
  // Requires 3 parameters:
  //  - Origin database name, as string
  //  - Collection name, as string
  //  - Destination database name, as string
     var db1 = db.getSiblingDB(db1);
     var db2 = db.getSiblingDB(db2);
     db1[col].find().forEach(function(doc){
          db2[col].insert(doc);
     });
}

function dropAllTempCollections() {
  //  Finds all collections that match TEMP_REGEX and drops them
	//  REQUIRES getCollectionNamesByRegex()
	var TEMP_REGEX = /.*\.temp$/;
	getCollectionNamesByRegex(TEMP_REGEX).forEach(
		function(collectionName){
	  	print("Dropping "+colName);
			db.getCollection(collectionName).drop();
		}
	);
}

function getCollectionNamesByRegex(regex) {
  //  Given a valid JS regex, returns a list of collections that match
    var returnArray = [];
    db.getCollectionNames().forEach(
	function(collectionName){
	   if (collectionName.match(regex)) {
		returnArray.push(collectionName);
	   }
	}
    );
    return returnArray;
}

function getEarliestDocumentId(collectionName) {
  //  Returns the ObjectID of the oldest document in the given collection
    var col = db.getCollection(collectionName);
    var output = col.find({},{_id:1}).sort({_id:1}).limit(1);

    output = output.toArray();

    return output[0]["_id"];

}

function getLatestDocumentId(collectionName) {
  //  Returns the ObjectID of the newest document in the given collection
    var col = db.getCollection(collectionName);
    var output = col.find({},{_id:1}).sort({_id:-1}).limit(1);

    output = output.toArray();

    return output[0]["_id"];
}

function getTestTemplateList() {
    test=db.getSiblingDB("test");
    test.getCollection("testTemplates").find({},{type:1,_id:0}).forEach(function(doc){
        var methodArray = getMethods(doc);
        printjson(doc);
    });
}

function getTopOfHourEpochForEpoch(epoch) {
  // Given an epoch timestamp (in millis or seconds), returns the epoch
  // timestamp for the top of the the original timestamp's hour
  // Returned value is in same units as the argument passed
    var millis = false;
    var l = epoch.toString().length;
    if (l > 10) {
        millis = true;
        epoch = epoch / 1000;
    }

    var toh = epoch - (epoch % 3600);

    if (millis) {
        return toh * 1000;
    } else {
        return toh;
    }
}

function getTopOfHourForOID(oid) {
  // Given an ObjectID, returns the timestamp for the top of the hour
  // represented by the ObjectID's embedded timestamp
    var ts = oid.getTimestamp() / 1000;
    return ts - (ts % 3600);
}

function moveCollectionToDatabase(db1,col,db2) {
	// Copies a collection, document by document, to the same collection in a new database
	var db1 = db.getSiblingDB(db1);
	var db2 = db.getSiblingDB(db2);
	db1[col].find().forEach(function(doc){
		db2[col].insert(doc);
	});
}

function ts2ObjId(epochInMillis) {
  // Converts a epoch timestamp (in millis) to a JS ObjID  
	var pad = "0000000000000000";
  return ObjID = ObjectId(Math.floor(epochInMillis/1000).toString(16) + pad);
}
