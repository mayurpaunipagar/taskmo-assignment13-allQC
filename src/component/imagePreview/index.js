import "./style.css";
export default function ImagePreview({imagePreview,setImagePreview}) {
  return (
    <div className="qcCheckDoneContainerParent">
      <div className={`qcCheckDoneContainer ${imagePreview.status ? `stackTop` : null}`}>
        <img
          className="previewImage"
          src={imagePreview.url}
          alt="work-illustration"
        />
        
        <button
          className="activeBtn okBtn closeBtn"
          onClick={() => {
            imagePreview.status=false;
            setImagePreview({...imagePreview});
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
