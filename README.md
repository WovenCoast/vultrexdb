# VultrexDB

> A simple SQLite/MongoDB database wrapper designed for novices – developed with ♥ by Stasium#0001, Host#0001 and chroventer#5269. Documentation by Host#0001 and chroventer#5269.

## Installation
```bash
npm i vultrex/vultrexdb
```

### Providers

VultrexDB supports "providers" to support persistent databases. Supports providers are MonogDB and SQLite.

Install one of the following providers of your choice: 

```bash
# SQLite
npm i sqlite

# MongoDB
npm i mongodb
```
 
## Example usage

```javascript
const { VultrexDB } = require("vultrex.db");

// One of the following:
const db = new VultrexDB({
  provider: 'sqlite',
  table: 'mytable',
  fileName: 'database'
});
const db = new VultrexDB({
  url: 'myMongoURI',
  provider: 'mongodb',
  collection: 'mycollection'
});

await db.connect(); // this is mandatory

// Set Values on Keys in Database
await db.set("foo", "bar");

// Return an Array of Objects containing the Keys and Values from the Database
console.log(await db.getAll());

// Return an Array of Objects containing the Keys and Values from the Database which includes the characters "fo" in the key
console.log(await db.getAll("fo")); 

// Return the Value of a Key from the Database - if this fails, you can return a optional Default Value
console.log(await db.get("foo", "defaultValue"));

// Delete a Key from the Database
await db.delete("foo");

// Delete all Keys from the Database
await db.clear();

// Return a Number of Keys in the Database
console.log(await db.size());
```
