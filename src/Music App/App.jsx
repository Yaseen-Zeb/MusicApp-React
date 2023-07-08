import React, { useRef, useState } from 'react'
import Data from './Api';
import './app.css';

function App() {
  let [i, seti] = useState(0);
  let PP_ref = useRef();
  let [progressVal, SetprogressVal] = useState(0);
  let [progressMaxValue, SetprogressMaxValue] = useState(100);


  let Next = () => {
    SetprogressMaxValue(Math.round(document.querySelector("audio").duration));
    seti(i + 1)
    if (i === Data.length - 1) {
      seti(0)
    }
    PP_ref.current.className = "pl_pu fa fa-play-circle mx-2"
    document.querySelector("img").classList.remove("anim")
  }

  let Prev = () => {
    SetprogressMaxValue(Math.round(document.querySelector("audio").duration));
    i <= 0 ? seti(i = Data.length - 1) : seti(i - 1)
    PP_ref.current.className = "pl_pu fa fa-play-circle mx-2";
    document.querySelector("img").classList.remove("anim");
  }

  let Play = () => {
    SetprogressMaxValue(Math.round(document.querySelector("audio").duration))
    if (PP_ref.current.className === "pl_pu fa fa-play-circle mx-2") {
      PP_ref.current.className = "pl_pu fa fa-pause-circle mx-2"
      document.querySelector("audio").play()
      document.querySelector("img").classList.add("anim")
      document.querySelector("audio").ontimeupdate = () => {
        SetprogressVal(Math.round(document.querySelector("audio").currentTime))
        if (document.querySelector("audio").ended) {
          document.querySelector("img").classList.remove("anim")
        }
      }
    } else {
      PP_ref.current.className = "pl_pu fa fa-play-circle mx-2"
      document.querySelector("audio").pause()
      document.querySelector("img").classList.remove("anim")
    }
  }

  let handleProgressChange = (e) => {
    SetprogressVal(Math.round(e.target.value))
    document.querySelector("audio").currentTime = Math.round(e.target.value)
  }

  return (
    <>
      <div className="container-fluid" style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "linear-gradient(rgb(240, 203, 53), rgb(192, 36, 37))" }}>
        <div className="col-4" style={{ textAlign: "center", width: "400px", color: "white" }}>
          <div className="card" style={{ padding: "2px 60px", background: "linear-gradient(45deg, #95006e, #d300f926)", boxShadow: "rgb(30, 27, 27) 1px 0px 12px -1px", borderRadius: "8px" }}>
            <h2 style={{ fontFamily: "system-ui", fontWeight: "700", margin: " 10px 0 0 0" }} >Music Player</h2>
            <h5 style={{ fontFamily: "system-ui", fontWeight: "500", margin: " 0px 0 10px 0px" }} >In Reactjs</h5>
            <img style={{
              width: "100%",
              margin: "auto",
              height: "287px",
              borderRadius: "150px"
            }} src={Data[i][3]} alt="..." />
            <div className="card-body">
              <h3 style={{ margin: " 7px 0 0 0" }}>Song: {Data[i][0]}</h3>
              <h5 style={{ margin: "5px 0 15px 0" }}>Singer: {Data[i][1]}</h5>
              <input style={{ width: "200px", height: "4px",cursor:"pointer",outline:"none" }} type="range" max={progressMaxValue} value={progressVal} onChange={handleProgressChange} />
              <div className="btns " style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: " 10px 0 25px 0" }}>
                <i onClick={Prev} className="fas fa-arrow-alt-circle-left" style={{ cursor: "pointer", fontSize: "30px" }} aria-hidden="true"></i>
                <i onClick={Play} ref={PP_ref} className={`pl_pu fa fa-play-circle mx-2`} style={{ cursor: "pointer", fontSize: "40px", marginLeft: "0px 3px" }} aria-hidden="true"></i>
                <i onClick={Next} style={{ cursor: "pointer", fontSize: "30px" }} className="fas fa-arrow-alt-circle-right"></i>
              </div>
              <div>
                <audio style={{ display: "none" }} className='w-100 s' src={Data[i][2]} controls></audio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App