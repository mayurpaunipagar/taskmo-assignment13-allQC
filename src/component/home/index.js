import { useHistory } from "react-router-dom";
import "./style.css";
import { qcList } from "./../../dataset/qcHome";
import ReactApexChart from "react-apexcharts";
import { optionsDonut } from "./optionsDonut";
export default function Home() {
  const history = useHistory();
  const tableThArr = [
    "Lead Id",
    "Project Details",
    "Lead Details",
    "QC Details",
    "Location",
    "Counter",
    "QC status",
    "Discrepancy status",
  ];

  return (
    <>
      <div className="jio">
        <div className="jio_page home-jio_page">
          <div className="home-jio_row1">
            <div className="dash_card">
              <div className="dash_col1">
                {/* <div id="basicDoughnut" style={{ height: "100px" }}></div> */}
                <ReactApexChart
                  options={optionsDonut}
                  series={optionsDonut.series}
                  type="donut"
                  width="300px"
                  // height="500px"
                />
              </div>
              <div className="dash_col2">
                <div className="dash_row2">
                  <div className="dash_but">
                    <input
                      type="button"
                      className="dash_button"
                      value="This month"
                    />
                    <input
                      type="button"
                      className="dash_button"
                      value="Overall"
                    />
                  </div>
                </div>
                <div className="dash_row2">
                  <div
                    className="dash_card2"
                    style={{
                      backgroundImage: `url(${
                        window.location.origin + "/images/total-lead.svg"
                      })`,
                    }}
                  >
                    <div className="dash_p3">
                      <p className="dash_per">+158</p>
                    </div>
                    <div className="dash_p2">236</div>
                    <div className="dash_p1">Total leads</div>
                  </div>
                  <div
                    className="dash_card2"
                    style={{
                      backgroundImage: `url(${
                        window.location.origin +
                        "/images/discrepancy-percentage.svg"
                      })`,
                    }}
                  >
                    <div className="dash_p3">
                      <p className="dash_per">+07%</p>
                    </div>
                    <div className="dash_p2">60%</div>

                    <div className="dash_p1">Discrepancy Percentage</div>
                  </div>
                </div>
              </div>
            </div>
            {/* code from super hr template start */}
            <div
              className="row my-table-style "
            >
              <div className="col-lg-12">
                <div className="table-heading">
                  {" "}
                  List of QC
                  <div className="dash_but">
                    <div className="dash_button">Assigned QC</div>
                    <div className="dash_button">Completed QC</div>
                  </div>
                </div>
                <div className="">
                  <table className="my-table-style2 ">
                    <thead>
                      <tr>
                        {tableThArr.map((value, idx) => {
                          return <th className="thStyle">{value}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {qcList.map(
                        (
                          {
                            lead_id,
                            program,
                            program_id,
                            lead_date,
                            lead_time,
                            qc_date,
                            qc_time,
                            location,
                            redoCount,
                            qc_status,
                            d_status,
                            project_id
                          },
                          idx
                        ) => {
                          return (
                            <>
                              <tr key={idx} className="my-tr-style" onClick={() => {
                history.push(`/${project_id}/qc-details`);
              }}>
                                <td className="lead-id-value my-td-style">
                                  {lead_id}
                                </td>
                                <td className="my-td-style">
                                  <div className="project-details-container">
                                    <div className="project-details-value1">
                                      {program}
                                    </div>
                                    <div className="project-details-value2">
                                      {program_id}
                                    </div>
                                  </div>
                                </td>
                                <td className="my-td-style">
                                  <div className="my-col-center">
                                    <div className="date-style">
                                      {lead_date}
                                    </div>
                                    <div className="time-style">
                                      {lead_time}
                                    </div>
                                  </div>
                                </td>
                                <td className="my-td-style">
                                  <div className="my-col-center">
                                    <div className="qc-detail-date-value">
                                      {qc_date}
                                    </div>
                                    <div className="qc-detail-time-value">
                                      {qc_time}
                                    </div>
                                  </div>
                                </td>
                                <td className="location my-td-style">
                                  {location}
                                </td>
                                <td className="redo-count my-td-style">
                                  {redoCount}
                                </td>
                                <td className="my-td-style">
                                  <div className="my-col-center">
                                    <div
                                      className={`${
                                        qc_status === "Approved"
                                          ? "approved"
                                          : "redo"
                                      }`}
                                    >
                                      {qc_status}
                                    </div>
                                  </div>
                                </td>
                                <td
                                  className={`d-status ${
                                    d_status ? "d-true" : "d-false"
                                  } my-td-style`}
                                >
                                  {d_status ? "True" : "False"}
                                </td>
                                <td className="my-td-style">
                                  <div className="my-col-center">
                                    <img
                                      className="warn-icon"
                                      src={
                                        window.location.origin +
                                        "/images/noun_Warning.svg"
                                      }
                                      alt="warn icon"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* code from super hr template end */}
          </div>
        </div>
      </div>
    </>
  );
}
