import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getDb, COLLECTIONS } from "@/lib/mongodb";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

// Strip Mongo's ObjectId / Date types into plain serializable values so they
// can cross the server → client component boundary.
function serialize(docs) {
  return docs.map((d) => ({
    ...d,
    _id: d._id?.toString(),
    createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : null,
  }));
}

export default async function AdminPage() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  let contacts = [];
  let serviceRequests = [];
  let dbError = "";

  try {
    const db = await getDb();
    contacts = serialize(
      await db
        .collection(COLLECTIONS.contacts)
        .find({})
        .sort({ createdAt: -1 })
        .limit(500)
        .toArray()
    );
    serviceRequests = serialize(
      await db
        .collection(COLLECTIONS.serviceRequests)
        .find({})
        .sort({ createdAt: -1 })
        .limit(500)
        .toArray()
    );
  } catch (err) {
    dbError = err.message;
  }

  return (
    <AdminDashboard
      contacts={contacts}
      serviceRequests={serviceRequests}
      dbError={dbError}
    />
  );
}
