import React from "react";
import { useState } from "react";
import storage from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateInfoUser } from "../../../service/PersonalInformationService/information-service";
import Swal from "sweetalert2";
const UploadImage = ({ setImage, setPreview, user }) => {
  // State to store uploaded file
  const [file, setFile] = useState("");
  const [previousFile, setPreviousFile] = useState("");
  const [fileName, setFileName] = useState(""); // State to store the file name
  const [sizeImage, setSizeImage] = useState();
  // progress
  const [showButtons, setShowButtons] = useState(false);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name); // Set the file name
    setSizeImage(event.target.files[0].size);
    setPreview(event.target.files[0]);
    setShowButtons(true);
  }

  const handleUpload = () => {
    if (!file) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Vui lòng chọn ảnh ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (sizeImage > 5 * 1024 * 1024) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Chỉ cho phép tải ảnh dưới 5MB",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (!fileName.endsWith(".jpg") && !fileName.endsWith(".png")) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Vui lòng chọn file .jpg hoặc .png",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
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
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((imageUrl) => {
            setImage(imageUrl);
            const obj = { id: user.id, imageUrl: imageUrl };
            updateInfoUser(obj).then((u) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Cập nhật ảnh đại diện thành công!",
                showConfirmButton: false,
                timer: 1500,
              });
              setShowButtons(false);
            });
          });
        }
      );
    }
  };

  const handleCancel = () => {
    setFile("");
    setFileName("");
    setPreview(previousFile);
    setShowButtons(false);
  };

  return (
    <div
      class="field is-grouped"
      style={{ "justify-content": "center", "column-gap": "20px" }}
    >
      <p class="control">
        <input
          type="file"
          onChange={handleChange}
          accept="jpg, .png"
          style={{ display: "none" }}
          id="upload-input"
        />
        <label
          htmlFor="upload-input"
          className="button is-info is-light"
          style={{ "justify-content": "center", left: "10px" }}
        >
          Chọn tệp
        </label>
      </p>
      {showButtons && (
        <div className="field is-grouped" style={{ justifyContent: "center" }}>
          <p className="control">
            <button
              type="submit"
              className="button is-info is-light"
              onClick={handleUpload}
            >
              Thay đổi
            </button>
          </p>
          <p className="control">
            <button className="button is-info is-light" onClick={handleCancel}>
              Hủy
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
