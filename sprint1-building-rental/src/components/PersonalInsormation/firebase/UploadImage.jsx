import React from "react";
import { useState } from "react";
import storage from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UploadImage = ({ setImage }) => {
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
      alert("Vui lòng chọn ảnh trước khi xác nhận");
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
      {" "}
      <input
        type="file"
        onChange={handleChange}
        accept="/image/*"
        style={{ fontSize: "15px", "border-bottom": "none" }}
      />
      <br />
      <div className="field is-grouped" style={{ "justify-content": "center" }}>
        <p className="control">
          <button className="button is-info is-light" onClick={handleUpload}>
            Thay đổi
          </button>{" "}
        </p>
        <p className="control">
          <button className="button is-info is-light">Hủy</button>
        </p>
      </div>
      <p>Đang tải lên [{percent}%]</p>
    </div>
  );
};

export default UploadImage;
