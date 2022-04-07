import { useState, useEffect } from 'react';
import { uid } from 'uid';
import './index.css';
import List from './List';
import axios from 'axios';

function App() {

const [Contacts,setContacts] = useState([])

const [IsUpdate,setIsUpdate] = useState({ id:null, status: false})

const [formData, setFormData] = useState({
  name : "",
  telp : "",
})

useEffect(() => {
  axios.get('http://localhost:3004/contacts').then(res => {
    console.log(res.data)
    setContacts(res?.data ?? [])
  })
},[])

function handleChange(e){
  let data = {...formData}
  data[e.target.name] = e.target.value
  setFormData(data)
}

function handleSubmit(e){
  e.preventDefault()
  alert("Ok")
  let data = [...Contacts]

  if(formData.name === ""){
    return false
  }

  if(formData.telp === "") {
    return false
  }

  if(IsUpdate.status){
    data.forEach((contact) => {
      if(contact.id === IsUpdate.id){
        contact.name = formData.name
        contact.telp = formData.telp
      }
    })

    axios.put(`http://localhost:3004/contacts/${IsUpdate.id}`, {
      name : formData.name,
      telp : formData.telp
    }).then(res =>{
      alert("sukses edit data")
    })

  }else{
    let newData = { id: uid(), name: formData.name, telp: formData.telp }
    data.push(newData)
    axios.post('http://localhost:3004/contacts', newData).then(res => {
      alert("Sukses")
    })
  }

  // tambah data
  setIsUpdate({id : null, status: false})
  setContacts(data)
  setFormData({name:"", telp: ""})
}

function handleEdit (id) {
  let data = [...Contacts]
  let foundData = data.find((contact) => contact.id === id)
  setFormData({ name : foundData.name, telp:foundData.telp})
  setIsUpdate({ id:id, status : true})
}

function handleDelete (id) {
  let data = [...Contacts]
  let filterdData = data.filter((contact) => contact.id !== id)

  axios.delete(`http://localhost:3004/contacts/${id}`).then(res =>{
      alert("sukses hapus data")
    })
  
  setContacts(filterdData)
}

  return (
    <div>
      <div className='form-contact'>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <label>Nama : </label>
        <input type="text" name='name' value={formData.name} onChange={handleChange}></input>
        <label>Telp : </label>
        <input type="number" name='telp' value={formData.telp} onChange={handleChange}></input>
        <button>Simpan</button>
      </form>
      <List data={Contacts} handleEdit={handleEdit} handleDelete={handleDelete}/>
    </div>
    </div>
  );
}

export default App;
