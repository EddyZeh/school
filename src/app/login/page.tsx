"use client"

import Link from "next/link";

export default function Page(){
    return(
        <div className= {"page"}>
            <h1>Login</h1>
            <label htmlFor="uName">Username</label>
            <input type="text" id = "uName" placeholder={"Username"} required />
            <label htmlFor={"pWord"}>Password</label>
            <input type="password" id = "pWord" placeholder={"Password"}  required />
            <button type="submit"> Login</button>
            <p>
                Do not have an account yet?
                <Link href = "/register"> register</Link>
            </p>
        </div>
    )
}