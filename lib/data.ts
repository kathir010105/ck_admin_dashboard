export type PendingUser = {
  id: string;
  name: string;
  email: string;
  joinedAt: string; // ISO date
  referenceCode?: string; // Reference code for approval
};

export type BlogDraft = {
  id: string;
  title: string;
  author: string;
  updatedAt: string; // ISO date
  content: string;
};

// Simple in-memory stores (resets on server restart)
const pendingUsers: PendingUser[] = [
  { 
    id: "u_1", 
    name: "Alice Kumar", 
    email: "alice@example.com", 
    joinedAt: new Date().toISOString(),
    referenceCode: "ALICE2024"
  },
  { 
    id: "u_2", 
    name: "Ben Singh", 
    email: "ben@example.com", 
    joinedAt: new Date().toISOString(),
    referenceCode: "BEN2024"
  },
  { 
    id: "u_3", 
    name: "Carol Johnson", 
    email: "carol@techstartup.com", 
    joinedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    referenceCode: "CAROL123"
  },
  { 
    id: "u_4", 
    name: "David Chen", 
    email: "david@innovatecorp.com", 
    joinedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    referenceCode: "DAVID456"
  },
  { 
    id: "u_5", 
    name: "Emma Wilson", 
    email: "emma@creativeagency.com", 
    joinedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    referenceCode: "EMMA789"
  },
  { 
    id: "u_6", 
    name: "Frank Rodriguez", 
    email: "frank@startupinc.com", 
    joinedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    referenceCode: "FRANK101"
  },
  { 
    id: "u_7", 
    name: "Grace Lee", 
    email: "grace@digitalstudio.com", 
    joinedAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    referenceCode: "GRACE202"
  },
  { 
    id: "u_8", 
    name: "Henry Thompson", 
    email: "henry@webdesign.com", 
    joinedAt: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
    referenceCode: "HENRY303"
  }
];

const approvedUsers: PendingUser[] = [];

const blogDrafts: BlogDraft[] = [
  { id: "b_1", title: "Launch Plan", author: "Alice Kumar", updatedAt: new Date().toISOString(), content: "# Launch Plan\n\nThis is a sample launch plan draft..." },
  { id: "b_2", title: "2025 Roadmap", author: "Ben Singh", updatedAt: new Date().toISOString(), content: "# 2025 Roadmap\n\nKey initiatives and milestones..." },
  { id: "b_3", title: "Marketing Strategy", author: "Carol Johnson", updatedAt: new Date().toISOString(), content: "# Marketing Strategy\n\nComprehensive marketing approach for Q1..." },
  { id: "b_4", title: "Product Development", author: "David Chen", updatedAt: new Date().toISOString(), content: "# Product Development\n\nNew features and improvements planned..." },
  { id: "b_5", title: "Brand Guidelines", author: "Emma Wilson", updatedAt: new Date().toISOString(), content: "# Brand Guidelines\n\nConsistent brand identity and usage..." }
];

export const data = {
  // Users
  getPendingUsers(): PendingUser[] {
    return pendingUsers;
  },
  getApprovedUsers(): PendingUser[] {
    return approvedUsers;
  },
  approveUser(id: string) {
    const idx = pendingUsers.findIndex((u) => u.id === id);
    if (idx === -1) return { ok: false, message: "User not found" } as const;
    const [user] = pendingUsers.splice(idx, 1);
    approvedUsers.push(user);
    return { ok: true } as const;
  },
  rejectUser(id: string) {
    const idx = pendingUsers.findIndex((u) => u.id === id);
    if (idx === -1) return { ok: false, message: "User not found" } as const;
    pendingUsers.splice(idx, 1);
    return { ok: true } as const;
  },
  // New method to verify reference code
  verifyReferenceCode(userId: string, referenceCode: string): boolean {
    const user = pendingUsers.find((u) => u.id === userId);
    if (!user || !user.referenceCode) return false;
    return user.referenceCode === referenceCode;
  },

  // Blog Drafts
  getBlogDrafts(): BlogDraft[] {
    return blogDrafts;
  },
  getBlogDraft(id: string): BlogDraft | undefined {
    return blogDrafts.find((b) => b.id === id);
  },
  publishDraft(id: string) {
    const idx = blogDrafts.findIndex((b) => b.id === id);
    if (idx === -1) return { ok: false, message: "Draft not found" } as const;
    blogDrafts.splice(idx, 1);
    return { ok: true } as const;
  },
  deleteDraft(id: string) {
    const idx = blogDrafts.findIndex((b) => b.id === id);
    if (idx === -1) return { ok: false, message: "Draft not found" } as const;
    blogDrafts.splice(idx, 1);
    return { ok: true } as const;
  },
};
