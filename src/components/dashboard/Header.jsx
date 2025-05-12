"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Loader from '@/components/Loader';

export default function Header() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      router.push('/');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if(loading){
    return <Loader />
  }
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Hi {user?.name}</h1>
      <Button className="cursor-pointer" variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
