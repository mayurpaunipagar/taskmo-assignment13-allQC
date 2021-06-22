import "./style.css";
export default function QcCheckDone({ blur, setBlur, message }) {
  return (
    <div className="qcCheckDoneContainerParent">
      <div className={`qcCheckDoneContainer ${blur ? `stackTop` : null} popup`}>
        <img
          className="illustrationImg"
          src={window.location.origin + "/images/illustration.svg"}
          alt="work-illustration"
        />
        <div className={`message-container ${
              message === "Rejected" ? "reject-message-container" : ""
            }${message === "Redo" ? "redo-message-container" : ""}`}>
          <div
            className={`message ${message === "Approved" ? "approve" : ""}${
              message === "Rejected" ? "reject" : ""
            }${message === "Redo" ? "redo" : ""}`}
          >
            {message}
          </div>
          <div>QC Check is done</div>
        </div>
        <button
          className="activeBtn okBtn"
          onClick={() => {
            setBlur(false);
          }}
        >
          Okay
        </button>
      </div>
    </div>
  );
}
