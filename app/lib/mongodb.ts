// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const dbName =
//   process.env.MONGODB_DB || "maven";

// if (!uri) {
//   throw new Error(
//     "MONGODB_URI is not configured."
//   );
// }

// declare global {
//   // eslint-disable-next-line no-var
//   var _mavenMongoClientPromise:
//     | Promise<MongoClient>
//     | undefined;
// }

// const client = new MongoClient(uri, {
//   family: 4,
// });

// const clientPromise =
//   global._mavenMongoClientPromise ||
//   client.connect();

// if (process.env.NODE_ENV !== "production") {
//   global._mavenMongoClientPromise =
//     clientPromise;
// }

// export async function getMavenDb() {
//   const connectedClient =
//     await clientPromise;

//   return connectedClient.db(dbName);
// }

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName =
  process.env.MONGODB_DB || "maven";

if (!uri) {
  throw new Error(
    "MONGODB_URI is not configured."
  );
}

declare global {
  // eslint-disable-next-line no-var
  var _mavenMongoClientPromise:
    | Promise<MongoClient>
    | undefined;
}

const client = new MongoClient(uri, {
  family: 4,
});

const clientPromise =
  global._mavenMongoClientPromise ||
  client.connect();

if (process.env.NODE_ENV !== "production") {
  global._mavenMongoClientPromise =
    clientPromise;
}

export async function getMavenDb() {
  const connectedClient =
    await clientPromise;

  return connectedClient.db(dbName);
}