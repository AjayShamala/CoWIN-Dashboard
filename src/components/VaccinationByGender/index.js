import {PieChart, Pie, Cell, Legend} from 'recharts'
import './index.css'
const VaccinationByGender = props => {
  const {vaccinationByGender} = props
  return (
    <div className="bg-containers">
      <h1 className="main-heading">Vaccination by gender</h1>
      <PieChart width={1000} height={400}>
        <Pie
          data={vaccinationByGender}
          cx="50%"
          cy="60%"
          outerRadius="60%"
          innerRadius="30%"
          startAngle={180}
          endAngle={0}
          dataKey="count"
        >
          <Cell name="Male" fill=" #f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#a3df9f" />
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
export default VaccinationByGender
