
import "./App.css";
import Login from "./component/login";
import MainFrame from "./component/mainFrame";
import ImagePreview from "./component/imagePreview";
import { useState } from "react";
import { BrowserRouter as Router,Redirect, Switch, Route, Link } from "react-router-dom";
import QcCheckDone from "./component/qcCheckDone";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [blur, setBlur] = useState(false);
  const [qcDoneMessage,setQcDoneMessage]=useState("");
  const [imagePreview, setImagePreview] = useState({
    status: false,
    url: "",
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" >
          <Redirect to="/home" />
            {loggedIn ? (
              <>
                {blur ? <QcCheckDone blur={blur} setBlur={setBlur} message={qcDoneMessage} /> : null}
                {imagePreview.status ? (
                  <ImagePreview
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
                ) : null}
                <div
                  className={blur || imagePreview.status ? "disableClick" : ""}
                > 
                
                  <MainFrame
                    blur={blur}
                    setBlur={setBlur}
                    setImagePreview={setImagePreview}
                    setQcDoneMessage={setQcDoneMessage}
                  />
                </div>
              </>
            ) : (
              <>
              
              <Login setLoggedIn={setLoggedIn} />
              </>
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
