import { useState } from 'react'
import { auth } from '../dist/firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [emailValidationError, setEmailValidationError] = useState()
    const [passwordValidationError, setPasswordValidationError] = useState()

    const validateEmail = (event) => {
        if (event.target.validity.valid && event.target.value) {
            setEmail(event.target.value);
            setEmailValidationError(false);
        }
        else {
            setEmailValidationError(true)
        }
    }

    const validatePassword = (event) => {
        if (event.target.validity.valid && event.target.value) {
            setPassword(event.target.value);
            setPasswordValidationError(false);
        }
        else {
            setPasswordValidationError(true)
        }
    }

    const register = () => {
        if (emailValidationError === false && passwordValidationError === false) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    localStorage.setItem("userId", user.user.uid);
                    navigate("/home");
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        if (emailValidationError === undefined) {
            setEmailValidationError(true);
        }
        if (passwordValidationError === undefined) {
            setPasswordValidationError(true);
        }
    }

    const login = () => {
        if (emailValidationError === false && passwordValidationError === false) {
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    localStorage.setItem("userId", user.user.uid);
                    navigate("/home");
                    window.location.reload();
                })
                .catch((err) => {
                    setError('Account not found');
                    console.log(err);
                })
        }
        if (emailValidationError === undefined) {
            setEmailValidationError(true);
        }
        if (passwordValidationError === undefined) {
            setPasswordValidationError(true);
        }
    }

    const googleLogin = () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then((user) => {
                localStorage.setItem("userId", user.user.uid);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div style={{ minHeight: '95vh' }} className="flex items-center justify-center bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                <form action="">
                    <div className="mt-4">
                        <div>
                            <label className="block">Email</label>
                            <input type="email" placeholder="Email" onChange={(event) => { validateEmail(event) }}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            <span className="text-xs tracking-wide text-red-600">{emailValidationError === true ? 'Enter a proper Email' : ''} </span>
                        </div>
                        <div className="mt-4">
                            <label className="block">Password</label>
                            <input type="password" placeholder="Password" onChange={(event) => { validatePassword(event) }}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            <span className="text-xs tracking-wide text-red-600">{passwordValidationError === true ? 'Enter a password(minimum 6 digits)' : ''} </span>
                        </div>
                        <h3 className="my-3 text-3xl font-bold text-center text-red-900">{error}</h3>
                        <div className="flex items-baseline justify-evenly">
                            <h2 className="cursor-pointer px-6 mx-3 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-900" onClick={() => login()}>Login</h2>
                            <h2 className="cursor-pointer px-6 mx-3 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-900" onClick={() => googleLogin()}>Google</h2>
                            <h2 className="cursor-pointer px-6 mx-3 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={() => register()}>Signup</h2>
                        </div>
                        {/* <div className="flex items-center justify-evenly mt-5">
                            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                        </div> */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;