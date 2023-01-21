import { useState } from 'react'
import { Link } from 'react-router-dom'



export const FormActivities = () => {

  const [form, setForm] = useState({
    name:"",
    level:"",
    season:"",
    duration:"",
  })

  const changeHandler = (event) => {
    const property = event.target.name //saber cual esta cambiando
    const value = event.target.value
    setForm({
      ...form, 
      [property ]: value})
    console.log(form)
  }

  return (
    <div>
      <h1>Create an Activity</h1>
        
        <form>
          <div>
          <label>Name:</label>
          <input type="text" value={form.name} onChange={changeHandler} name="name"/>
          </div>

          <div>
          <label>Level</label>
          <select value={form.level} onChange={changeHandler} name="level">
            <option value="" disabled >Select</option>
            <option value={1} >1</option>
            <option value={2} >2</option>
            <option value={3} >3</option>
            <option value={4} >4</option>
            <option value={5} >5</option>
          </select>

          
          </div>

          <div>
          <label>Season</label>
          <select value={form.season} onChange={changeHandler} name="season">
            <option value="" disabled >Select</option>
            <option value={"summer"} >Summer</option>
            <option value={"spring"}>Spring</option>
            <option value={"fall"}>Fall</option>
            <option value={"winter"}>Winter</option>
          </select>
          </div>

          <div>
          <label>Duration</label>
          <input type="text" value={form.duration} onChange={changeHandler} name="duration"/>
          </div>

          
        </form>
      
      <Link to="/home">
        <button>Return to Home</button>
      </Link>
    </div>
  )
}