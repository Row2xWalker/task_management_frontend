"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = formData;
        if (!name || !email || !password) {
            setError('All fields are required.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email.');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
                name,
                email,
                password
            });

            setSuccessMessage('Sign-up successful! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 2000);

        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Something went wrong. Please try again.');
            } else {
                setError('Network error. Please check your connection.');
            }
        } finally {
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@doe.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <Input
                                    type={passwordVisible ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                />
                                <span
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                >
                                    {passwordVisible ? (
                                        <AiFillEyeInvisible size={20} />
                                    ) : (
                                        <AiFillEye size={20} />
                                    )}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <Input
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                />
                                <span
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                >
                                    {confirmPasswordVisible ? (
                                        <AiFillEyeInvisible size={20} />
                                    ) : (
                                        <AiFillEye size={20} />
                                    )}
                                </span>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                        <Button
                            type="submit"
                            className="w-full hover:cursor-pointer"
                        >
                            Sign Up
                        </Button>
                        <Button
                            className="w-full hover:cursor-pointer"
                            variant="outline"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
