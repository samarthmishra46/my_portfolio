// ─────────────────────────────────────────────────────────────
// Cached MongoDB client — reused across hot reloads and serverless
// invocations so we don't open a new connection on every request.
//
// Requires MONGODB_URI in .env.local. Optional MONGODB_DB to override the
// database name (otherwise the one in the connection string is used).
// ─────────────────────────────────────────────────────────────
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let clientPromise;

function getClientPromise() {
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local");
  }
  if (process.env.NODE_ENV === "development") {
    // Reuse the client across HMR reloads via a global.
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    return global._mongoClientPromise;
  }
  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}

export async function getDb() {
  const client = await getClientPromise();
  // If MONGODB_DB is unset, db() uses the database from the URI (or "test").
  return client.db(process.env.MONGODB_DB || undefined);
}

// Collection name constants so routes + admin stay in sync.
export const COLLECTIONS = {
  contacts: "contacts",
  serviceRequests: "serviceRequests",
};
