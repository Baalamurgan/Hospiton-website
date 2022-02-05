import React, { useRef, useState } from 'react';
import { Navigate } from "react-router-dom";
import Webcam from 'react-webcam';
import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from '../dist/firebase';


const User = () => {
    const [clicked, setClicked] = useState(false);
    const webRef = useRef(null);
    const user = useAuthUser(["user"], auth);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };
    const [imageSrc, setImageSrc] = useState("");

    const capture = React.useCallback(
        () => {
            setImageSrc(webRef.current.getScreenshot());
            setClicked(true);
            console.log(imageSrc);
            console.log(webRef);
            console.log(webRef.current);
        },
        [webRef]
    );

    const userId = localStorage.getItem("userId");

    const performRedirect = () => {
        if (!userId) {
            return <Navigate to="/login" replace="true" />;
        }
    }

    const [photoNumber, setPhotoNumber] = useState(1);
    const saveToDb = () => {
        let photo = "photo" + photoNumber;
        localStorage.setItem(photo, imageSrc);
        setPhotoNumber(photoNumber + 1);
        setClicked(false);
    }

    return (
        <div className='flex justify-center flex-col'>
            <h1 className="text-2xl font-bold" >
                Welcome {user.data.displayName}
            </h1>
            {clicked && (
                <>
                    <img src={imageSrc} alt="Clicked" />
                    <button onClick={() => setClicked(false)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700'>Retake</button>
                    <button onClick={() => saveToDb()} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700'>Save</button>
                </>
            )}
            {!clicked && (
                <>
                    <Webcam
                        audio={false}
                        height={720}
                        ref={webRef}
                        screenshotFormat="image/jpeg"
                        width={1280}
                        videoConstraints={videoConstraints}
                    />
                    <button onClick={capture} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700'>Capture photo</button>
                </>
            )}
            {/* <Link to="/login"><button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Login</button></Link> */}
            {/* <button onClick={Login}>Login</button> */}
            {performRedirect()}
        </div >
    )
}

const Home = () => {
    const user = useAuthUser(["user"], auth);
    if (user.isLoading) {
        return (
            <div className="spin-container">
                <div className="spin" id="loader"></div>
                <div className="spin" id="loader2"></div>
                <div className="spin" id="loader3"></div>
                <div className="spin" id="loader4"></div>
                <span id="text">LOADING...</span>
            </div>
        );
    }

    if (user.data) {
        return (
            <User />
        )
    }
}

export default Home;