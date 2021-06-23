import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./index.css";
import { apexOptions } from "./apexOptions";
import {
  IMAGES_BASE_URL,
  NINJACART_LEAD_FIELDS_URL,
  NINJACART_REJECT_URL,
  NINJACART_REDO_URL,
  NINJACART_APPROVE_URL,
  NINJACART_QC_REMARKS_URL,
} from "../../utils";
import { useHistory } from "react-router-dom";

export default function QcDetailsRapido({
  blur,
  setBlur,
  setImagePreview,
  setQcDoneMessage,
}) {
  const history = useHistory();
  const [remarkApi, setRemarkApi] = useState([]);
  const [comment, setComment] = useState("");
  const [leadId, setLeadId] = useState(185);
  const [api, setApi] = useState({});
  const [fakeOnBoarding, setFakeOnBoarding] = useState(false);
  const [qcScore, setQcScore] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [yesBtnObj, setYesBtnObj] = useState({
    name: "none",
    contact: "none",
    aadhar: "none",
    vehicleNumber:"none"
  }); //yes no none

  const updateScore = (e) => {
    const label = e.target.dataset.label;
    const value = e.target.innerText;
    if (value === "YES") {
      yesBtnObj[label] = "yes";
      setYesBtnObj({ ...yesBtnObj });
      // console.log("I am in Yes");
      // console.log(yesBtnObj);
      let count = 0;
      for (const key in yesBtnObj) {
        if (yesBtnObj[key] === "yes") {
          count = count + 1;
        }
      }

      const score = (count / totalCount) * 100;
      console.log(score);
      setQcScore(Math.trunc(score));
      apexOptions.series = [Math.trunc(score)];
    } else if (value === "NO") {
      yesBtnObj[label] = "no";
      setYesBtnObj({ ...yesBtnObj });
      let count = 0;
      for (const key in yesBtnObj) {
        if (yesBtnObj[key] === "yes") {
          count = count + 1;
        }
      }

      const score = (count / totalCount) * 100;
      console.log(score);
      setQcScore(Math.trunc(score));
      // console.log("I am in No");
      // console.log(yesBtnObj);
      apexOptions.series = [Math.trunc(score)];
    }
  };

  const approveFunc = () => {
    fetch(NINJACART_APPROVE_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        lead_id: leadId,
        qc_admin_id: "1",
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log("#Approve", r);
        setBlur(true);
        setQcDoneMessage("Approved");
      })
      .catch((e) => {
        console.log("Error: While Approve ", e);
        setBlur(true);
        setQcDoneMessage("Network Error");
      });
    setBlur(true);
    setQcDoneMessage("Approved");
  };
  const rejectFunc = () => {
    fetch(NINJACART_REJECT_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        lead_id: leadId,
        qc_admin_id: "1",
        qc_remark: comment,
        is_fake: `${fakeOnBoarding ? "1" : "0"}`,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log("#Reject", r);
        setQcDoneMessage("Rejected");
        setBlur(true);
      })
      .catch((e) => {
        console.log("Error: While Reject ", e);
        setQcDoneMessage("Network Error");
      });
  };
  const redoFunc = () => {
    fetch(NINJACART_REDO_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        lead_id: leadId,
        qc_admin_id: "1",
        qc_remark: comment,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log("#Redo", r);
        setQcDoneMessage("Redo");
        setBlur(true);
      })
      .catch((e) => {
        console.log("Error: While Redo ", e);
      });
  };
  const getLeadDetails = () => {
    fetch(NINJACART_LEAD_FIELDS_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        lead_id: leadId,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log("resonponse from ninjacart leads", r);
        setApi(r.lead_details);
        // const d = new Date(r.lead_details.created_on);
        // const day = d.getDate();
        // const month = d.getMonth();
        // const year = d.getFullYear();
        // const dateString = `${day < 10 ? "0" + day : day}/${
        //   month < 10 ? "0" + (month + 1) : month + 1
        // }/${year}`;
        // setMyDate(dateString);
        getQcRemarks(r.lead_details.merchant_number);
      })
      .catch((e) => console.log("error", e));
  };

  const getQcRemarks = (merchant_number) => {
    fetch(NINJACART_QC_REMARKS_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        merchant_number,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setRemarkApi(r);
      });
  };

  useEffect(() => {
    setTotalCount(Object.keys(yesBtnObj).length);
    getLeadDetails();
  }, []);

  return (
    <div className="jio">
      <div className="jio_page">
        <div className="jio_row1">
          <div className="j_row1">Rapido </div>
          <div
            className="j_row2 j-row-back-btn"
            onClick={() => {
              history.push("/home");
            }}
          >
            <img
              src={window.location.origin + "/images/back.svg"}
              alt="back button"
              className={"point"}
            />
            <div className="j-back-text">Back</div>
            {/* <p className="jio_p1">Back</p> */}
          </div>
        </div>
        <div className="jio_row1">
          <div className="jio_row2">
            <div className="jio_box">
              <p className="j_p1">Lead ID:</p>
              <p className="j_p2">{leadId}</p>
            </div>
          </div>
          <div className="jio_row3">
            <div className="j_row3">
              <div className="j_box1">
                <p className="j_p3">FSE contact number</p>
                <p className="j_p4">
                  {Object.keys(api).length > 0
                    ? `XXXXXXX${api.fse_contact_number.substring(7, 10)}`
                    : "XXXXXXXX01"}
                </p>
              </div>
              <div className="call-container">
                <img
                  src={window.location.origin + "/images/call.svg"}
                  alt="call"
                  className="call_home"
                />
              </div>
            </div>
          </div>
          <div className="jio_row4">
            <div className="jio_col1">
              <div className="j_row4">
                <div className="j_row3">
                  <div className="j_box3">
                    <p className="j_p9">
                      Auto Driver Registered Contact Number
                    </p>
                    <p className="j_p15">
                      {Object.keys(api).length > 0
                        ? api.shop_name
                        : "9158228119"}
                    </p>
                  </div>
                  <div className="j_boxes">
                    <p
                      style={{
                        pointerEvents: `${
                          yesBtnObj.contact === "yes" ? "none" : "auto"
                        }`,
                      }}
                      className={`j_yes ${
                        yesBtnObj.contact === "yes" ? "activeBtn" : ""
                      }`}
                      data-label="contact"
                      onClick={updateScore}
                      value={`YES`}
                    >
                      YES
                    </p>
                    <p
                      style={{
                        pointerEvents: `${
                          yesBtnObj.contact === "no" ? "none" : "auto"
                        }`,
                      }}
                      className={`j_yes ${
                        yesBtnObj.contact === "no" ? "activeBtn" : ""
                      }`}
                      onClick={updateScore}
                      data-label="contact"
                    >
                      NO
                    </p>
                  </div>
                </div>
                <div className="row_note1">
                  <p className="note_name">note:</p>
                  <p className="note_stats">
                    Check the auto driver registered contact number through
                    Rapido partner app
                  </p>
                </div>
              </div>
              <div className="j_row4">
                <div className="j_row5">
                  <div className="j_box3">
                    <p className="j_p9">Name</p>
                    <p className="j_p15">
                      {Object.keys(api).length > 0 ? api.category : "Sample Name"}
                    </p>
                  </div>
                  <div className="j_boxes">
                    <p
                      style={{
                        pointerEvents: `${
                          yesBtnObj.name === "yes" ? "none" : "auto"
                        }`,
                      }}
                      className={`j_yes ${
                        yesBtnObj.name === "yes" ? "activeBtn" : ""
                      }`}
                      data-label="name"
                      onClick={updateScore}
                      value={`YES`}
                    >
                      YES
                    </p>
                    <p
                      className="j_yes"
                      style={{
                        pointerEvents: `${
                          yesBtnObj.name === "no" ? "none" : "auto"
                        }`,
                      }}
                      className={`j_yes ${
                        yesBtnObj.name === "no" ? "activeBtn" : ""
                      }`}
                      onClick={updateScore}
                      data-label="name"
                    >
                      NO
                    </p>
                  </div>
                </div>
                <div className="row_note1">
                  <p className="note_name">note:</p>
                  <p className="note_stats">
                    Check the auto driver name with aadhar card image
                  </p>
                </div>
              </div>

              <div className="j_row4">
                <div className="j_row5">
                  <div className="j_box3">
                    <p className="j_p9">Auto driver aadhar number</p>
                    <p className="j_p10">
                      <b>
                        {" "}
                        {Object.keys(api).length > 0
                          ? api.aadhar_number
                          : "xxxx xxxx xxxx"}
                      </b>
                    </p>
                  </div>
                  <div className="j_boxes">
                    <p
                      className="j_yes"
                      style={{
                        pointerEvents: `${
                          yesBtnObj.aadhar === "yes" ? "none" : "auto"
                        }`,
                      }}
                      className={`j_yes ${
                        yesBtnObj.aadhar === "yes" ? "activeBtn" : ""
                      }`}
                      data-label="aadhar"
                      onClick={updateScore}
                      value={`YES`}
                    >
                      YES
                    </p>
                    <p
                      className="j_yes"
                      className="j_yes"
                      style={{
                        pointerEvents: `${
                          yesBtnObj.aadhar === "no" ? "none" : "auto"
                        }`,
                      }}
                      className={`j_yes ${
                        yesBtnObj.aadhar === "no" ? "activeBtn" : ""
                      }`}
                      onClick={updateScore}
                      data-label="aadhar"
                    >
                      NO
                    </p>
                  </div>
                </div>
                <div className="row_note1">
                  <p className="note_name">note:</p>
                  <p className="note_stats">
                    Verify aadhar number with the images
                  </p>
                </div>
              </div>
              <div className="j_row4">
                <div className="j_proof">
                  {/* <p className="j_p9">Merchant aadhar number</p>
                  <p className="j_p10">1224 5678 9900</p> */}
                  <div className="j_row6">
                    <div className="j_col1">
                      <p className="j_p11">Aadhar front image</p>
                      <div className="j_col2 aadhar-container">
                        <img
                          src={`${
                            Object.keys(api).length > 0
                              ? `${IMAGES_BASE_URL}/${api.aadhar_front_image}`
                              : window.location.origin +
                                "/images/aadhar-front.svg"
                          }`}
                          alt="aadhar front"
                          className="proof_image aadhar-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              window.location.origin +
                              "/images/aadhar-front.svg";
                          }}
                          onClick={(e) => {
                            // setBlur(true);
                            setImagePreview({
                              status: true,
                              url: e.target.src,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="j_col1">
                      <p className="j_p11">Aadhar back image</p>
                      <div className="j_col2 aadhar-container">
                        <img
                          src={`${
                            Object.keys(api).length > 0
                              ? `${IMAGES_BASE_URL}/${api.aadhar_back_image}`
                              : window.location.origin +
                                "/images/aadhar-back.svg"
                          }`}
                          alt="aadhar back"
                          className="proof_image aadhar-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              window.location.origin +
                              "/images/aadhar-back.svg";
                          }}
                          onClick={(e) => {
                            // setBlur(true);
                            setImagePreview({
                              status: true,
                              url: e.target.src,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* vehicle number start */}
              <div className="j_row4">
                <div className="j_row5">
                  <div className="j_box3">
                    <p className="j_p9">Vehicle number</p>
                    <p className="j_p10">
                      <b>
                        {" "}
                        {Object.keys(api).length > 0
                          ? api.aadhar_number
                          : "KA28 20011234567"}
                      </b>
                    </p>
                  </div>
                  <div className="j_boxes">
                    <p
                      className="j_yes"
                      style={{
                        pointerEvents: `${
                          yesBtnObj.vehicleNumber === "yes" ? "none" : "auto"
                        }`,
                      }}
                      className={`j_yes ${
                        yesBtnObj.vehicleNumber === "yes" ? "activeBtn" : ""
                      }`}
                      data-label="vehicleNumber"
                      onClick={updateScore}
                      value={`YES`}
                    >
                      YES
                    </p>
                    <p
                      className="j_yes"
                      className="j_yes"
                      style={{
                        pointerEvents: `${
                          yesBtnObj.vehicleNumber === "no" ? "none" : "auto"
                        }`,
                      }}
                      className={`j_yes ${
                        yesBtnObj.vehicleNumber === "no" ? "activeBtn" : ""
                      }`}
                      onClick={updateScore}
                      data-label="vehicleNumber"
                    >
                      NO
                    </p>
                  </div>
                </div>
                <div className="row_note1">
                  <p className="note_name">note:</p>
                  <p className="note_stats">
                    Verify driving licence number with DL images
                  </p>
                </div>
              </div>

              {/* vehicle number end */}

              <div className="j_row4">
                <div className="j_proof">
                  {/* <p className="j_p9">Merchant aadhar number</p>
                  <p className="j_p10">1224 5678 9900</p> */}
                  <div className="j_row6">
                    <div className="j_col1">
                      <p className="j_p11">DL front image</p>
                      <div className="j_col2 aadhar-container">
                        <img
                          src={`${
                            Object.keys(api).length > 0
                              ? `${IMAGES_BASE_URL}/${api.aadhar_front_image}`
                              : window.location.origin +
                                "/images/DL-front.svg"
                          }`}
                          alt="aadhar front"
                          className="proof_image aadhar-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              window.location.origin +
                              "/images/DL-front.svg";
                          }}
                          onClick={(e) => {
                            // setBlur(true);
                            setImagePreview({
                              status: true,
                              url: e.target.src,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="j_col1">
                      <p className="j_p11">DL back image</p>
                      <div className="j_col2 aadhar-container">
                        <img
                          src={`${
                            Object.keys(api).length > 0
                              ? `${IMAGES_BASE_URL}/${api.aadhar_back_image}`
                              : window.location.origin +
                                "/images/DL-back.svg"
                          }`}
                          alt="aadhar back"
                          className="proof_image aadhar-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              window.location.origin +
                              "/images//DL-back.svg";
                          }}
                          onClick={(e) => {
                            // setBlur(true);
                            setImagePreview({
                              status: true,
                              url: e.target.src,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              
            </div>
            <div className="jio_col2 my-col2">
              <div className="jio_note">
                <p className="j_p6">remarks</p>
                <div className="j_p8">
                  {remarkApi.length > 0 ? (
                    <>
                      {remarkApi.map(({ qc_remark }, idx) => {
                        return (
                          <>
                            <div className="j_p8">
                              <p className="j_p7">QC {idx + 1}</p>
                              <p>{qc_remark}</p>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {/* <div className="j_p8">
                        <p className="j_p7">QC 1(lead ID)</p>

                        <p></p>
                      </div> */}
                      No Prior QC
                    </>
                  )}
                </div>
              </div>
              <div className="jio_score">
                {/* <p className="j_p6">score: </p> */}
                <ReactApexChart
                  options={apexOptions}
                  series={apexOptions.series}
                  type="radialBar"
                  height={250}
                />

                {qcScore === 100 ? (
                  <></>
                ) : (
                  <>
                    <div className="j_p8 comment-container">
                      <p className="j_p7">Comment</p>

                      <textarea
                        className={`comment1`}
                        placeholder="Enter comment here"
                        onChange={(e) => {
                          setComment(e.target.value.trim());
                        }}
                      />
                    </div>
                    <div className="jio_check">
                      <label className="form-check-label" htmlFor="check2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="check2"
                          name="option2"
                          value="something"
                          onChange={(e) => {
                            console.log(e.target.checked);
                            setFakeOnBoarding(e.target.checked);
                          }}
                        />
                        <p className="j_p16">Fake onboarding</p>
                      </label>
                    </div>
                  </>
                )}
                <div className="j_buttons">
                  <input
                    type="button"
                    value="Approve"
                    className={`qcScoreBtn j_button ${
                      qcScore === 100 && !fakeOnBoarding
                        ? "activateQcScoreBtn"
                        : ""
                    }`}
                    disabled={qcScore !== 100 || fakeOnBoarding}
                    onClick={approveFunc}
                  />
                  <input
                    type="button"
                    className={`qcScoreBtn j_button ${
                      qcScore < 100 && comment.trim().length > 0
                        ? "activateQcScoreBtn"
                        : ""
                    }`}
                    value="Reject"
                    onClick={rejectFunc}
                    disabled={qcScore === 100 || comment.trim().length === 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
