import {Pie, PieChart, Legend, Cell} from 'recharts'
import './index.css'
const VaccinationByAge = props => {
  const {vaccinationAgeDetails} = props
  return (
    <div className="containers">
      <h1 className="main-heading">Vaccination by Age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          data={vaccinationAgeDetails}
          cx="50%"
          cy="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 14, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}
export default VaccinationByAge
