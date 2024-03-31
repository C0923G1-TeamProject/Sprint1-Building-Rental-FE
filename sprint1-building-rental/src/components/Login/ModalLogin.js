import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

export const ModalLogin = ({show}) => {
    const handleSubmit = async () => {

    }

    return (
        <>
            <Modal show={show}>
                <Modal.Header>
                    Đăng nhập thành công
                </Modal.Header>
                <Modal.Body>
                    <Link to={"/LoginPage"} className="btn btn-primary k-btn-modal-login mx-3">Đăng nhập vào hệ thống</Link>
                    <Link to={"/information"} className="btn btn-primary k-btn-modal-login mx-3">Thông tin cá nhân</Link>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

        </>
    )
}