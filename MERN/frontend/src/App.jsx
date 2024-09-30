import { useEffect, useState } from "react";
import axios from "axios";

const App = ({id,name1}) => {
  const [value, setValue] = useState([]);
  const [data, setData] = useState({
    Name:"",
    Email:"",
    Phone:""
  })

  const[name2,setName2] = useState(name1)
  const [message, setMessage] = useState('')

  const getMethod = async() => {
    try {
      const res = await axios.get("http://localhost:3000/");
    setValue(res.data)       
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getMethod();
  }, []);

  const handleOnChange = (e) =>{
    const {name,value} = e.target
    setData((pre)=>({
      ...pre,[name]:value
    }))
  }
  const handleOnClick = async()=>{
    try {
      const user = await axios.post("http://localhost:3000/create",data)
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      const update = await axios.put(`/update/${id}`, {name2})
      if(update.status == 200){
        setMessage("update successfully")
      }
    } catch (error) {
      setMessage("error updating data")
      console.log('data', error)
    }
  }

  return (
    <div>
      <form>
        <input type="text" name="Name" onChange={handleOnChange} value={data.Name} />
        <input type="text" name="Email" onChange={handleOnChange} value={data.Email} />
        <input type="number" name="Phone" onChange={handleOnChange} value={data.Phone} />
        <button onClick={handleOnClick}>submit</button>
        <div onSubmit={handleSubmit}>
        <input type="text" onChange={(e)=>setName2(e.target.value)} value={name2}/>
        <button type="submit">update user</button>
        </div>

       
      </form>

      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
        <tbody>
          {
            value.map((item,index)=>(
              <tr key={index}>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>{item.Phone}</td>

              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default App;
