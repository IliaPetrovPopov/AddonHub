import { useState } from "react";
import { auth } from "../../config/firebase-config";
import { Modal } from "flowbite-react";
import { useNavigate } from "react-router";
import { deleteAccount } from "../../services/users.service";

const DeleteAccountButton = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = auth.currentUser;
  user;

  const closeModal = async () => {
    setIsModalOpen(false);
  };
  const handleDelete = async () => {
    setIsModalOpen(false);

    // Get the current user
    const user = auth.currentUser;

    if (!user) {
      console.error("User not found.");
      return;
    }

    try {
      await deleteAccount(user);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {" "}
      <button
        className="btn btn-error btn-sm md:btn-md"
        onClick={() => setIsModalOpen(true)}
      >
        Delete <div className="hidden md:block">Account</div>
      </button>
      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Body className="bg-base-300 w-full rounded-xl shadow-xl border-3 py-6 border-primary">
          <div className="space-y-4">
            <h4 className="flex w-full justify-center">
              Are you sure you want to delete your account?
            </h4>
            <h5 className="flex w-full justify-center">
              This is irreversible and you will lose all your data
            </h5>
          </div>
          <span className="flex justify-between mt-4">
            <button
              className="btn btn-info btn-sm md:btn-md"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              className="btn btn-error btn-sm md:btn-md"
              onClick={handleDelete}
            >
              Confirm
            </button>
          </span>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeleteAccountButton;
