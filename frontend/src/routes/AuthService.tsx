import { useState } from "react";
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"

export default function AuthService() {
    const [isSignUp,setIsSignUp] = useState(true);
    const toggleSignUp = (e:Event) => {
        e.preventDefault();
        setIsSignUp(!isSignUp);
    }

    return (
        <>
        <div className="w-full grid grid-cols-2">
            {
                isSignUp
                ?
                <SignUp toggleSignUp={toggleSignUp}/>
                :
                <SignIn toggleSignUp={toggleSignUp}/>
            }

            <div className="m-3">
                <img className="h-[96vh] rounded-[10px] w-[100%] object-cover" src="sidepage.jpg" alt="sidepage" />
            </div>
        </div>
        </>
    );
}