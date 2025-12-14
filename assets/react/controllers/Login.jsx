import { Button, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'

export default function Login() {
    const [form, setForm] = useState({
        email: "amine@gmail.com",
        password: "I@mTheT€ster",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://localhost:8000/api/login_check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // ⭐ IMPORTANT
                body: JSON.stringify({
                    username: form.email,
                    password: form.password,
                }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <div className="w-full max-w-md px-4">
            <Field>
                <Label className="text-sm/6 font-medium text-white">email</Label>
                <Input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type='email'

                    className={clsx('mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white', 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')}
                />
            </Field>
            <Field>
                <Label className="text-sm/6 font-medium text-white">password</Label>
                <Input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type="password"

                    className={clsx('mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white', 'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')}
                />
            </Field>
            <Field>
                <Button
                    onClick={handleSubmit}
                    className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500 mt-5">
                    Save changes
                </Button>
            </Field>

        </div>
    )
}
