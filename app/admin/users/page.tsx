"use client";

import { useEffect, useState } from "react";
import ReferenceCodeModal from "@/components/ReferenceCodeModal";

type PendingUser = {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  referenceCode?: string;
};

export default function PendingUsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<PendingUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users/pending", { cache: "no-store" });
      const data = await res.json();
      setUsers(data.pending ?? []);
    } catch (_error: unknown) {
      setError("Failed to load pending users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openApprovalModal(user: PendingUser) {
    setSelectedUser(user);
    setVerificationError(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedUser(null);
    setVerificationError(null);
  }

  async function verifyReferenceCode(referenceCode: string) {
    if (!selectedUser) return;
    
    setVerifying(true);
    setVerificationError(null);
    
    try {
      const res = await fetch("/api/admin/users/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id: selectedUser.id,
          referenceCode: referenceCode 
        }),
      });
      
      if (res.ok) {
        // Remove user from list on successful approval
        setUsers((u) => u.filter((x) => x.id !== selectedUser.id));
        closeModal();
      } else {
        const errorData = await res.json();
        setVerificationError(errorData.error || "Reference code verification failed");
      }
    } catch (_error: unknown) {
      setVerificationError("Failed to verify reference code. Please try again.");
    } finally {
      setVerifying(false);
    }
  }

  async function rejectUser(id: string) {
    const prev = users;
    try {
      // optimistic: remove from list
      setUsers((u) => u.filter((x) => x.id !== id));
      const res = await fetch(`/api/admin/users/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
    } catch (_error: unknown) {
      // revert
      setUsers(prev);
      alert("Action failed");
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Pending Users</h1>
        <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>Review and manage new user registrations</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          {users.length} pending user{users.length !== 1 ? 's' : ''}
        </div>
        <button onClick={load} className="btn btn-outline">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="text-lg loading-state">Loading pending users...</div>
        </div>
      )}
      
      {error && (
        <div className="text-center py-8">
          <div className="text-lg error-message p-4 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {!loading && users.length === 0 && (
        <div className="text-center py-12">
          <div className="text-lg empty-state">No pending users at this time.</div>
          <p className="mt-2" style={{ color: 'var(--muted-foreground)' }}>All user registrations have been processed.</p>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="space-y-4">
          {/* Demo Reference Codes - Remove this in production */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              🧪 Demo Reference Codes (for testing)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              {users.map((user) => (
                <div key={user.id} className="bg-white dark:bg-blue-800/50 p-2 rounded border border-blue-200 dark:border-blue-700">
                  <div className="font-medium text-blue-900 dark:text-blue-100">{user.name}</div>
                  <div className="text-blue-700 dark:text-blue-300 font-mono">{user.referenceCode}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-300 mt-2">
              Use these codes to test the approval functionality. In production, users would provide their own codes.
            </p>
          </div>

          <div className="overflow-hidden table-card">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="font-medium" style={{ color: 'var(--foreground)' }}>{u.name}</td>
                    <td style={{ color: 'var(--muted-foreground)' }}>{u.email}</td>
                    <td style={{ color: 'var(--muted-foreground)' }}>{new Date(u.joinedAt).toLocaleDateString()}</td>
                    <td className="text-center">
                      <div className="inline-flex gap-3">
                        <button
                          onClick={() => openApprovalModal(u)}
                          className="btn btn-success text-sm px-4 py-2"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </button>
                        <button
                          onClick={() => rejectUser(u.id)}
                          className="btn btn-danger text-sm px-4 py-2"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reference Code Modal */}
      <ReferenceCodeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={verifyReferenceCode}
        userName={selectedUser?.name || ""}
        isLoading={verifying}
      />

      {/* Verification Error Toast */}
      {verificationError && (
        <div className="fixed top-4 right-4 z-50 border rounded shadow-lg px-4 py-3" style={{ backgroundColor: 'var(--destructive)', color: 'var(--destructive-foreground)', borderColor: 'var(--destructive)' }}>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{verificationError}</span>
            <button
              onClick={() => setVerificationError(null)}
              className="ml-4 hover:opacity-80"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
