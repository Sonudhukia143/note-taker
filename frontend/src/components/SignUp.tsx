import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SignUp({ toggleSignUp }: ToggleSignUp) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        dob: "",
    });
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const { loading, setLoading, setUser } = useContext(AuthContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            if (isOtpSent) {
                setLoading(true);
                e.preventDefault();

                const res = await fetch("http://localhost:3000/api/auth/verify", {
                    method: "POST",
                    body: JSON.stringify({ ...formData, otp: otp.join("") }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                } else {
                    console.log(data);
                }
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            if (res.ok) {
                setIsOtpSent(true);
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex min-h-[100vh] flex-col items-evenly justify-evenly px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-black">Sign Up to your account</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={(e) => signUp(e)} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-800">Your Name</label>
                            <div className="mt-2">
                                <input onChange={(e) => { setFormData({ ...formData, username: e.target.value }) }} id="username" type="username" name="username" required autoComplete="username" {...isOtpSent && { readOnly: true }} className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 outline-offset-1 outline-indigo/100 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="dob"
                                className="block text-sm/6 font-medium text-gray-800"
                            >
                                Date of Birth
                            </label>
                            <div className="mt-2">
                                <input
                                    {...isOtpSent && { readOnly: true }}
                                    onChange={(e) => { setFormData({ ...formData, dob: e.target.value }) }}
                                    id="dob"
                                    type="date"
                                    name="dob"
                                    required
                                    autoComplete="bday"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 outline-offset-1 outline-indigo/100 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-800">Email address</label>
                            <div className="mt-2">
                                <input id="email"  {...isOtpSent && { readOnly: true }} onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }} type="email" name="email" required autoComplete="email" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 outline-offset-1 outline-indigo/100 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button disabled={loading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">{loading ? "Signing Up":"Sign Up"}</button>
                        </div>

                    </form>

                    {
                        isOtpSent
                        &&
                        <>
                            <div className="flex space-x-2 justify-center mt-10 flex-cols mb-4">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-12 h-12 text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl"
                                    />
                                ))}
                            </div>
                            <button onClick={(e) => handleSubmit(e)} className="m-2 flex mx-auto justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">{loading ? "Verifing": "Verify"}</button>
                        </>
                    }
                    <p className="mt-2 text-center text-sm/6 text-gray-400">
                        Already a member?
                        <button onClick={(e) => toggleSignUp(e)} className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer m-2"> Sign In</button>
                    </p>
                </div>
            </div>

        </>
    )
}