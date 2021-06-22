import { useHistory } from "react-router-dom";
import "./style.css";
import {qcList} from "./../../dataset/qcHome";
import ReactApexChart from "react-apexcharts";
import { optionsDonut } from "./optionsDonut";
export default function Home() {
  const history = useHistory();
  const tableThArr=[
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
          <div className="jio_row1">
            <div className="j_row1">Rapido </div>
            <div className="j_row2 j-row-back-btn " onClick={()=>{
              history.push("/home");
            }}>
              <img
                src={window.location.origin + "/images/back.svg"}
                alt="back button"
                className={"point"}
              />
              <div className="j-back-text">Back</div>
              {/* <p className="jio_p1">Back</p> */}
            </div>
          </div>

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
                      value="this month"
                    />
                    <input
                      type="button"
                      className="dash_button"
                      value="overall"
                    />
                  </div>
                </div>
                <div className="dash_row2">
                  <div className="dash_card2" style={{ backgroundImage: `url(${window.location.origin + "/images/total-lead.svg"})` }}>
                    <div className="dash_p3">
                      <p className="dash_per">+158</p>
                    </div>
                    <div className="dash_p2">236</div>
                    <div className="dash_p1">Total leads</div>
                  </div>
                  <div className="dash_card2" style={{ backgroundImage: `url(${window.location.origin + "/images/discrepancy-percentage.svg"})` }}>
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
            <div className="row my-table-style " onClick={()=>{
              history.push("/qc-details");
            }}>
              
              <div className="col-lg-12  ">
              <div className="table-heading"> List of QC</div>
                <div className="">
                  <table className="my-table-style2 ">
                    <thead>
                      <tr>
                        {tableThArr.map((value,idx)=>{
                          return <th className="thStyle">{value}</th>
                        })} 
                        
                        
                      </tr>
                    </thead>
                    <tbody>
                      {
                        qcList.map(({lead_id,program,program_id,lead_date,lead_time,qc_date,qc_time,location,redoCount,qc_status,d_status},idx)=>{
                            return <>
                                <tr key={idx} className="my-tr-style">
                        <td className="lead-id-value my-td-style">{lead_id}</td>
                        <td className="my-td-style" ><div className="project-details-container">
                          <div className="project-details-value1">{program}</div>
                          <div className="project-details-value2">{program_id}</div>
                          </div></td>
                        <td className="my-td-style"><div className="my-col-center">
                          <div className="date-style">{lead_date}</div><div className="time-style">{lead_time}</div></div></td>
                        <td className="my-td-style"><div className="my-col-center"><div className="qc-detail-date-value">{qc_date}</div><div className="qc-detail-time-value">{qc_time}</div></div></td>
                        <td className="location my-td-style">{location}</td>
                        <td className="redo-count my-td-style">{redoCount}</td>
                        <td className="my-td-style"><div className="my-col-center"><div className={`${qc_status==="Approved"?"approved":"redo"}`}>{qc_status}</div></div></td>
                        <td className={`d-status ${d_status?"d-true":"d-false"} my-td-style`}>{d_status?"True":"False"}</td>
                        <td className="my-td-style"><div className="my-col-center"><img className="warn-icon" src={window.location.origin+"/images/noun_Warning.svg"} alt="warn icon"/></div></td>
                        
                      </tr>
                            </>
                        })
                      }                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* code from super hr template end */}
            {/* <div className="dash_table">
            <div className="nin_header">List of QC</div>
            <div className="nin_table">
              <div className="n_t_row1">
                <p className="nin_th">Leads ID</p>
                <p className="nin_th1">Project details</p>
                <p className="nin_th">lead details</p>
                <p className="nin_th">QC details</p>
                <p className="nin_th">location</p>
                <p className="nin_th">counter</p>
                <p className="nin_th">QC status</p>
                <p className="nin_th">Discrepancy Status</p>
                <th className="nin_th"> </th>
              </div>
              <div className="n_t_row2">
                <p className="nin_td1">1042</p>
                <p className="nin_td4">
                  <p className="td3_p1">Kirana Partner Program</p>
                  <p className="td3_p2">11247</p>
                </p>
                <p className="nin_td3">
                  <p className="td2_p1">06/June/2021</p>
                  <p className="td3_p2">09:30am</p>
                </p>
                <p className="nin_td3">
                  <p className="td4_p1">10/June/2021</p>
                  <p className="td3_p2">11:30am</p>
                </p>
                <p className="nin_td2">Bangalore</p>
                <p className="nin_td1">013</p>
                <p className="nin_td2">
                  <p className="t_p4">Approved </p>
                </p>
                <p className="nin_td21">True</p>
                <p className="nin_td2">
                  <img
                    src={window.location.origin + "/warningIcon.svg"}
                    alt="profile"
                    className="i_dash"
                  />
                </p>
              </div>
              <div className="n_t_row2">
                <p className="nin_td1">1042</p>
                <p className="nin_td4">
                  <p className="td3_p1">Kirana Partner Program</p>
                  <p className="td3_p2">11247</p>
                </p>
                <p className="nin_td3">
                  <p className="td2_p1">06/June/2021</p>
                  <p className="td3_p2">09:30am</p>
                </p>
                <p className="nin_td3">
                  <p className="td4_p1">10/June/2021</p>
                  <p className="td3_p2">11:30am</p>
                </p>
                <p className="nin_td2">Bangalore</p>
                <p className="nin_td1">013</p>
                <p className="nin_td2">
                  <p className="t_p7">redo </p>
                </p>
                <p className="nin_td22">False</p>
                <p className="nin_td2">
                  <img
                    src={window.location.origin + "/warningIcon.svg"}
                    alt="profile"
                    className="i_dash"
                  />
                </p>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
