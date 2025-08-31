"use client";

import { useState } from "react";

interface ReferenceCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (referenceCode: string) => void;
  userName: string;
  isLoading?: boolean;
}

export default function ReferenceCodeModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
  isLoading = false
}: ReferenceCodeModalProps) {
  const [referenceCode, setReferenceCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (referenceCode.trim()) {
      onConfirm(referenceCode.trim());
      setReferenceCode("");
    }
  };

  const handleClose = () => {
    setReferenceCode("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 transition-opacity"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative rounded-lg shadow-xl max-w-md w-full mx-4 p-6" style={{ backgroundColor: 'var(--card)' }}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
            Enter Reference Code
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Please enter the reference code provided by <span className="font-medium">{userName}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="referenceCode" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
              Reference Code
            </label>
            <input
              type="text"
              id="referenceCode"
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ 
                backgroundColor: 'var(--input)', 
                color: 'var(--input-foreground)', 
                borderColor: 'var(--border)' 
              }}
              placeholder="Enter reference code"
              required
              autoFocus
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              style={{ 
                backgroundColor: 'var(--muted)', 
                color: 'var(--muted-foreground)', 
                borderColor: 'var(--border)' 
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !referenceCode.trim()}
            >
              {isLoading ? "Verifying..." : "Verify & Approve"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
