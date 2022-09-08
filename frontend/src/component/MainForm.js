import './mainForm.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import MainApi from '../api/MainApi';
import axios from 'axios';
import { toast } from 'react-toastify';
function MainForm() {
  const navigate = useNavigate()
  const location = useLocation().search
  const query = new URLSearchParams(location)
  const queryID = query.get("id")

  const [prefild, setPrefild] = useState({})

  const [values, setValues] = useState({
    employeName: "",
    departmentName: "",
    salary: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log("ss",name,value)
    setValues((preVal) => {
      return {
        ...preVal,
        [name]: value
      }
    })

  }

  const getEmployData = async (id) => {
    console.log("getEmployData", id)
    try {
      let res = await MainApi.get(`getEmployeById?id=${id}`)
      console.log("qqaaaaaa", res)
      if (res.status == 200) {
        setPrefild(res.data)
      }
    } catch (err) {
      console.log("err", err)
    }
  }

  useEffect(() => {
    getEmployData(queryID)
  }, [])
  useEffect(() => {
    console.log("shy,,", prefild)
    if (queryID && prefild) {
      setValues({

        employeName: prefild.employeName,
        departmentName: prefild.departmentName,
        salary: prefild.salary,
      })
    }
  }, [prefild])

  const UpdateData = async (id) => {
    console.log("qqqUpd", id)
    try {

      let res = await MainApi.put(`updateEmploye?id=${id}`, values)
      console.log("ress222", res)

      if (res.status == 200) {
        // console.log("success")
        navigate('/view')

      }
    } catch (err) {
      console.log("errr", err)
    }
  }

  const submitAdditional = async (e) => {
    e.preventDefault()
    console.log("values", values)
    try {
      // if we have any token than we can send here autorization token in header in api and params in api
      // this values state will be send in body of api
      let res = await MainApi.post("employeAdd", values)
      console.log("ress", res)
      if (res.status == 200) {
        // console.log("success")
        toast.success("Data Saved")
        navigate('/view')
        

      }

    } catch (err) {
      console.log("errr", err)
      toast.error("Api not hit")
    }

  }



  return (
    <>
      <div className="Main_div">
        <div className="form_area">



          <div className="form_Main_div">
            <div className="form_main">
              <div className="left_part">
                <h3>Personal Details</h3>
                <div className="fields">
                  <p className="labels">Employe Name</p>
                  <TextField placeholder="Enter your name" name="employeName" onChange={handleChange} value={values.employeName} variant="outlined" />

                </div>
                <div className="fields">
                  <p className="labels">Departments </p>
                  <TextField placeholder="Enter Departments"
                    name="departmentName"
                    value={values.departmentName}
                    onChange={handleChange}
                    variant="outlined" />
                </div>

                <div className="fields">
                  <p className="labels">Salary</p>
                  <TextField
                    name="salary"
                    value={values.salary}
                    onChange={handleChange}
                    placeholder="Enter Salary" variant="outlined" />


                </div>


                {
                  queryID && queryID ? (
                    <Button className="btnProceed" variant="contained" sx={{ color: "red", width: "100%", marginTop: "6%", backgroundColor: "#640ec3", color: "white" }} onClick={() => UpdateData(queryID)}>Update</Button>
                  ) : (

                    <Button className="btnProceed" variant="contained" sx={{ color: "red", width: "100%", marginTop: "6%", backgroundColor: "#640ec3", color: "white" }} onClick={submitAdditional}>Submit</Button>
                  )
                }


              </div>
              <div className="right_part">

                <Button variant="contained" onClick={() => { navigate('/view') }}>View Employe List</Button>
              </div>
            </div>
          </div>
          )




        </div>
      </div>
    </>
  );
}

export default MainForm;
