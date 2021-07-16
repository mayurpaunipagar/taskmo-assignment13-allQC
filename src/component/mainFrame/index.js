import "./style.css";
import SideBarContent from "../sidebarContent";
import { Route } from "react-router-dom";
import Home from "../home";
import QcDetailsNinjacart from "../qcDetailsNinjacart";
import QcDetailsJiomart from "../qcDetailsJiomart";
import QcDetailsRapido from "../qcDetailsRapido";
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
          <Route path="/1/qc-details"> {/* 1=jiomart */}
            <QcDetailsJiomart
              blur={blur}
              setBlur={setBlur}
              setImagePreview={setImagePreview}
              setQcDoneMessage={setQcDoneMessage}
            />
          </Route>
          <Route path="/2/qc-details"> {/* 2=ninjacart */}
            <QcDetailsNinjacart
              blur={blur}
              setBlur={setBlur}
              setImagePreview={setImagePreview}
              setQcDoneMessage={setQcDoneMessage}
            />
          </Route>
          <Route path="/3/qc-details"> {/* 1=jiomart */}
            <QcDetailsRapido
              blur={blur}
              setBlur={setBlur}
              setImagePreview={setImagePreview}
              setQcDoneMessage={setQcDoneMessage}
            />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </div>
      </div>
    </>
  );
}
