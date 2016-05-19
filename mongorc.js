function ts2ObjId(epochInMillis) {
  // Converts a epoch timestamp (in millis) to a JS ObjID  
	var pad = "0000000000000000";
  return ObjID = ObjectId(Math.floor(epochInMillis/1000).toString(16) + pad);
}

function getTopOfHourForOID(oid) {
  // Given an ObjectID, returns the timestamp for the top of the hour
  // represented by the ObjectID's embedded timestamp
    var ts = oid.getTimestamp() / 1000;
    return ts - (ts % 3600);
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

function getLatestDocumentId(collectionName) {
  //  Returns the ObjectID of the newest document in the given collection
    var col = db.getCollection(collectionName);
    var output = col.find({},{_id:1}).sort({_id:-1}).limit(1);

    output = output.toArray();

    return output[0]["_id"];
}

function getEarliestDocumentId(collectionName) {
  //  Returns the ObjectID of the oldest document in the given collection
    var col = db.getCollection(collectionName);
    var output = col.find({},{_id:1}).sort({_id:1}).limit(1);

    output = output.toArray();

    return output[0]["_id"];

}

function getCollectionNamesByRegex(regex) {
  //  Given a valid JS regex, returns a list of collections that match
    var returnArray = [];
    db.getCollectionNames().forEach(
				function(collectionName){
					if (colName.match(regex)){
						returnArray.push(colName);
					}
				}
		);
    return returnArray;
}

function dropAllTempCollections() {
  //  Finds all collections that match TEMP_REGEX and drops them
		var TEMP_REGEX = /.*\.temp$/;
    getCollectionNamesByRegex(TEMP_REGEX).forEach(
				function(collectionName){
					print("Dropping "+colName);
					db.getCollection(collectionName).drop();
				}
		);
}

function getTestTemplateList() {
    test=db.getSiblingDB("test");
    test.getCollection("testTemplates").find({},{type:1,_id:0}).forEach(function(doc){
        var methodArray = getMethods(doc);
        printjson(doc);
    });
}

