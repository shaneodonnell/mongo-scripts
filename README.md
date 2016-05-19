# mongo-scripts
Initial Description: Some handy server-side MongoDB functions, including getCollectionByRegex()

In my experience with MongoDB, I've found myself often in environments where there were a LOT of collections 
(e.g., 100s, 1000s, etc.) and often they were named with a specific account number included as part of the 
collection name (common in 'hoteled' environments).

Over time, I've collected a ton of server-side scripts, most of which are deployment-specific.  I've pulled out
a few here which should be broadly useful, regardless of deployment.  Some of the function names are rather long, 
but it's not so bad with tab-completion.  ;-)
