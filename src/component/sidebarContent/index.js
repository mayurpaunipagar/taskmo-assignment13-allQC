import { useHistory } from "react-router";
import "./style.css";
export default function SideBarContent() {
  const history = useHistory();
  return (
    <>
      <div className={`sidebarHome`}>
        <img
          src={window.location.origin + "/taskmoLogo.svg"}
          alt={"logo"}
          className="logoImg"
        />
        <div className="QCText">Quality Check</div>
        <div className="dbText">Dashboard</div>
        <div
          className="homeText homeHover"
          onClick={() => {
            history.push("/home");
          }}
        >
          Home
        </div>
      </div>
    </>
  );
}
