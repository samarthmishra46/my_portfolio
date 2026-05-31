"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function formatDate(value) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return String(value);
  }
}

export default function AdminDashboard({ contacts, serviceRequests, dbError }) {
  const router = useRouter();
  const [tab, setTab] = useState("contacts");

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const tabs = [
    { id: "contacts", label: `Contacts (${contacts.length})` },
    { id: "requests", label: `Service Requests (${serviceRequests.length})` },
  ];

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg border border-[#33353F] hover:border-white text-sm"
          >
            Logout
          </button>
        </div>

        {dbError ? (
          <div className="rounded-lg border border-red-600/40 bg-red-600/10 p-4 mb-6 text-red-300 text-sm">
            Could not reach the database. Check <code>MONGODB_URI</code> in your
            environment. ({dbError})
          </div>
        ) : null}

        <div className="flex gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                tab === t.id
                  ? "bg-primary-500 border-primary-500 text-white"
                  : "border-[#33353F] text-[#ADB7BE] hover:border-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "contacts" ? (
          <Section
            empty="No contact messages yet."
            rows={contacts}
            columns={["Date", "Email", "Subject", "Message"]}
            render={(c) => [
              formatDate(c.createdAt),
              c.email,
              c.subject,
              c.message,
            ]}
          />
        ) : (
          <Section
            empty="No service requests yet."
            rows={serviceRequests}
            columns={["Date", "Name", "Email", "Service", "Price shown", "Message"]}
            render={(r) => [
              formatDate(r.createdAt),
              r.name,
              r.email,
              r.serviceTitle,
              r.priceShown || "—",
              r.message || "—",
            ]}
          />
        )}
      </div>
    </main>
  );
}

function Section({ rows, columns, render, empty }) {
  if (!rows.length) {
    return <p className="text-[#ADB7BE]">{empty}</p>;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-[#33353F]">
      <table className="w-full text-sm">
        <thead className="bg-[#181818] text-left text-[#ADB7BE]">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-4 py-3 font-medium whitespace-nowrap">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-[#33353F] align-top">
              {render(row).map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-gray-200 max-w-xs whitespace-pre-wrap break-words"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
