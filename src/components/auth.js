import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState} from "react";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try{
        await createUserWithEmailAndPassword(auth, email, password);
        }catch(err){
        console.error('error')
        }
    
        console.log(auth?.currentUser?.email);
    };

    const signinwithGoogle = async () => {
        try{
            await signInWithPopup(auth,googleProvider);
            }catch(err){
            console.error('error')
            }

    };

    const logout = async () => {
        try{
            await signOut(auth);
            }catch(err){
            console.error('error')
            }

    };

    return(
        <div>
            <input type = "text" placeholder = "Email..." 
            onChange={(e) => setEmail(e.target.value)}/>
            <input type = "Password"placeholder = "Password..."
            onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={signIn}> Sign In</button>

            <button onClick={signinwithGoogle}> Sign In with Google</button>
            <button onClick={logout}>Sigh Out</button>
        </div>

    )
}