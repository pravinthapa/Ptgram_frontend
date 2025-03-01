import React from "react";
import Modal from "react-modal";
import Button from "../tools/Button";

export default function ConfirmModal({
  openModel,
  confirm,
  title,
  setOpenModel,
  button,
}) {
  const handleDelete = () => {
    setOpenModel(false);
  };
  const customStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      // padding: "0px
      background:"rgba(0,0,0,0.9)",
    },
  };

  return (
    <div>
      <Modal
        style={customStyle}
        isOpen={openModel}
        onRequestClose={handleDelete}
        overlayClassName="modal-overlay"
      >
        <div className={`text-white flex flex-col gap-5  `}>
          <h1 className="text-[25px] text-red-600 font-bold">{title}</h1>
          <p>{confirm}</p>
          <div className="flex  justify-between ">
            <Button
              className={
                "px-3 py-1 border-black bg-slate-400  border-2 font-semibold rounded-full  "
              }
              onClick={handleDelete}
              btnName={"Cancel"}
            />
            <Button
              className={
                "px-3 py-1 bg-red-600 text-white font-semibold rounded-full  "
              }
              onClick={handleDelete}
              btnName={button}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
