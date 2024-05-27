import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'
const appUrlstatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}
class CowinDashboard extends Component {
  state = {
    vaccinationData: {},
    apiStatus: appUrlstatus.initial,
  }
  componentDidMount() {
    this.setBarGraph()
  }
  setBarGraph = async () => {
    this.setState({apiStatus: appUrlstatus.inprogress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(each => ({
          vaccineData: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(each => ({
          age: each.age,
          count: each.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(each => ({
          count: each.count,
          gender: each.gender,
        })),
      }
      this.setState({
        vaccinationData: updatedData,
        apiStatus: appUrlstatus.success,
      })
    } else {
      this.setState({apiStatus: appUrlstatus.failure})
    }
  }
  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )
  renderFailureView = () => (
    <div className="cons">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="image-1"
      />
      <h1 className="header">Something Went Wrong</h1>
    </div>
  )
  renderAllVaccinationsView = () => {
    const {vaccinationData} = this.state
    return (
      <div className="consss">
        <VaccinationCoverage
          vaccinationCoverageData={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGender={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationAgeDetails={vaccinationData.vaccinationByAge}
        />
      </div>
    )
  }
  allRenderVaccines = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case appUrlstatus.success:
        return this.renderAllVaccinationsView()
      case appUrlstatus.failure:
        return this.renderFailureView()
      case appUrlstatus.inprogress:
        return this.renderLoader()
      default:
        return null
    }
  }
  render() {
    return (
      <div className="bg-container">
        <div className="row-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="image-2"
          />
          <p className="paras">co-WIN</p>
        </div>
        <h1 className="heads">CoWIN Vaccination in India</h1>
        {this.allRenderVaccines()}
      </div>
    )
  }
}
export default CowinDashboard
