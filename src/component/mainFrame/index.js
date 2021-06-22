import "./style.css";
import SideBarContent from "../sidebarContent";
import QcDetails from "./../qcDetails";
import { Route} from "react-router-dom";
import Home from "../home";
export default function MainFrame({
  blur,
  setBlur,
  setImagePreview,
  setQcDoneMessage,
}) {
  return (
    <>
      <div className="main-wrapper">
        <div className="sidebar my-sidebar" id="sidebar">
          <SideBarContent />
        </div>
        <div className={`page-wrapper my-wrapper ${blur ? "myBlur" : ""}`}>
          <Route path="/qc-details">
            <QcDetails
              blur={blur}
              setBlur={setBlur}
              setImagePreview={setImagePreview}
              setQcDoneMessage={setQcDoneMessage}
            />
          </Route>
          <Route path="/home"><Home/></Route>
        </div>
      </div>
    </>
  );
}
