import React from 'react'
import {useState} from "react";
import storage from "../PersonalInsormation/firebase/firebaseConfig";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import "./CustomerAdd.css"

const UploadImage = ({setImage}) => {
    // State to store uploaded file
    const [file, setFile] = useState("");

    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        if (!file) {
            alert("Vui lòng tải ảnh lên trước!");
        }

        const storageRef = ref(storage, `/files/${file.name}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {

                    setImage(url);
                });
            }
        );
    };

    return (
        <div>
            <input type="file" className="form-control cus-input" onChange={handleChange} accept="image/*" />
            <button onClick={handleUpload}>Tải lên Firebase</button>
            {percent === 100 && <p>{percent} % done</p>}
        </div>
    );

}

export default UploadImage
