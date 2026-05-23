import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/feature/Admin/adminSlice";
import { useLoginMutation } from "@/feature/Auth/authApi";
import { selectAdmin } from "@/feature/Admin/adminSelector";

function Login() {
    const admin = useSelector(selectAdmin)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        if (admin) navigate("/")
    }, [admin, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Vui lòng nhập đầy đủ thông tin")
            return
        }

        try {
            const result = await login({ email, password }).unwrap()
            dispatch(setUser(result))
        } catch (err) {
            setError(err?.data?.error || "Đăng nhập thất bại")
        }
    }

    return (
        <div className="min-h-screen flex items-center">
            <Card className="w-full max-w-sm m-auto">
                <CardHeader>
                    <CardTitle className="m-auto">Đăng nhập Admin</CardTitle>
                </CardHeader>
                <form className="px-6 pb-4" onSubmit={handleSubmit}>
                    <fieldset disabled={isLoading} className={`flex flex-col gap-5 ${isLoading ? "opacity-70" : ""}`}>
                        <div className="flex flex-col items-center gap-2 ">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <span className="text-red-500 text-sm">{error}</span>}
                        <Button className="w-[40%] m-auto" disabled={isLoading} type="submit">
                            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </Button>
                    </fieldset>
                </form>
            </Card>
        </div>
    )
}

export default Login
