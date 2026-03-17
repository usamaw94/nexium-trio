"use client";

import Header from "@/components/Header";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header transparent />
      <main className="flex items-center justify-center min-h-screen px-4 py-20">
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
