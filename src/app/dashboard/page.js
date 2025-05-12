'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/dashboard/Header';
import TaskInput from '@/components/dashboard/TaskInput';
import TaskList from '@/components/dashboard/TaskList';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import useTasks from '@/hooks/useTasks';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const taskProps = useTasks(authLoading ? null : user);
  
  //Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return <p>Loading user...</p>;
  }
  if (!user) {
    return null;
  }
  return (
    <div className="min-h-screen p-4 mx-auto">
      <div className="max-w-[900px] mx-auto mb-6">
        <Header />
      </div>
      <div className="max-w-[510px] mx-auto">
        <TaskInput {...taskProps} />
        <TaskList {...taskProps} />
      </div>
    </div>
  );
}
