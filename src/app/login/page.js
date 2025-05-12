"use client";

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

export default function LoginPage() {
    const router = useRouter();
    const { user, login, loading: authLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [localLoading, setLocalLoading] = useState(false);

    useEffect(() => {
        if (!authLoading && user) {
            router.push("/dashboard");
        }
    }, [authLoading, user, router]);

    if (!authLoading && user) {
        return <Loader />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLocalLoading(true);
        try {
            await login({ email, password });
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid email or password");
        } finally {
            setLocalLoading(false);
        }
    };

    const handleSignUpClick = () => {
        router.push('/signup')
    }
    if (authLoading || localLoading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <Button type="submit" className="w-full hover:cursor-pointer">
                            Sign In
                        </Button>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Don't have an account?</p>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full mt-2 hover:cursor-pointer "
                                onClick={handleSignUpClick}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
