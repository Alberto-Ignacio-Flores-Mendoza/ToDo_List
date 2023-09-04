import React, { useState, useEffect } from 'react'
import ListX from './List'
import Alert from './Alert'


function App() {

  const getLocalStorage =()=>{
    let list= localStorage.getItem('list');
    if(list){
      return JSON.parse(localStorage.getItem('list'))
    }else{
      return [];
    }
  }

  const [name,setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] =useState(false);
  const [editId, setEditId] =useState(null);
  const [alert, setAlert] = useState({show:false, msg:'', type:''}); // we're passing in an object


  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!name){ //empty sting returns false
      //display alert
     //one way of doing this setAlert({show: true, msg:'please enter value', type:'danger'})//its an object
    
     showAlert(true, 'danger' , 'please enter Value');


    }else if(name && isEditing){ // if name has something and isediting is true

      setList(list.map((item)=>{
        if(item.id === editId){
          return{... item, title:name}
        }
        return item;
      }))

      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value change')

    }else{
      //set new item
      console.log(list);

      showAlert(true,'success', 'item added to the list')
      const newItem= 
        {id: new Date().getTime().toString(),
         title: name };

      setList([...list, newItem]);
      console.log(list);

      setName("");
    }

  }

  const showAlert=(show=false, type="", msg="")=> //es6 property, if we dont pass in these parameters we state there default values
  {
    setAlert({show:show, type, msg})
  }


  const clearList=()=>{
    showAlert(true, 'danger', 'Empty List');
    setList([]);
  }

  const removeItem=(id)=>{
    showAlert(true, 'danger', 'item removed');
    //item is added if the id isnt the one we are lookin for
    setList(list.filter((item) => item.id !== id)); 
  }

  const editItem = (id) => {
    const sepecificItem= list.find((item)=> item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(sepecificItem.title);

  }

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list))
  }, [list]); // 

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>/* pass all the properties in alert*/ }
        <h3> To do list </h3>
        <div className='form-control'>
          <input type='text' className='grocery' placeholder='eg. eggs' value={name} onChange={(e)=>setName(e.target.value) }></input>
          <button type='submit' className='submit-btn'>
          {isEditing? 'edit': 'submit'}

          </button>
        </div>
      </form>
      {list.length>0 && (
      <div className='grocery-container'>
        <ListX items={list} removeItem={removeItem} editItem={editItem}/>
        <button onClick={clearList} className='clear-btn'>
          clear items
        </button>

      </div>
      )}

    </section>
  );
}

export default App;
