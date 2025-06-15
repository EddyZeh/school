"use client"

import Link from "next/link";

export default function Page(){
    return (
        <div className= {"page"}>
            <h3>
                Register
            </h3>
            <form>
                <label htmlFor="uName"> Username</label>
                <input type="text" id = "uName" placeholder={"Username"} name="username" required />
                <label htmlFor="pWord"> Password</label>
                <input type = "password" id = "pWord" placeholder={"Password"} required />
                <label htmlFor="cPassWord"> Confirm Password</label>
                <input type = "password" id = "cPassWord" placeholder={"Confirm Password"} required />
                <button type="submit">Register</button>

                <p>
                    Already have an account?
                    <Link href={"/login"}> Login </Link>
                </p>

            </form>
        </div>
    );
}