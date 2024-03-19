import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid'

uuidv4();
function App() {
  const [todo, setTodo] = useState("") //input text
  const [todos, setTodos] = useState([]) // todos arrray
  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const handleAdd = () => {
    let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    saveToLS(newTodos)
    setTodo("")

  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    saveToLS(newTodos)
    setTodos(newTodos)
  }
  const handleEdit = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodo(todos[index].todo)
    saveToLS(newTodos)
    setTodos(newTodos)
  }
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS(newTodos)
  }
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
    let todo = JSON.parse(localStorage.getItem("todos"))
    setTodos(todo)
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-slate-500 rounded-2xl p-5 m-10 min-h-[80vh] align-middle">
        <div className="addTodo mx-auto">
          <h1 className='text-2xl font-bold'>ADD YOUR TODOS </h1>
          <input type="text" name="" id="" className='w-1/2' value={todo} onChange={(e) => { setTodo(e.target.value) }} />
          <button className='bg-slate-800 p-3 py-1 text-white rounded-md m-6' onClick={handleAdd}>ADD</button>
        </div>
        <h2 className='text-lg font-bold'>YOUR TODOS</h2>
        <div className="todos">
          {todos.length === 0 && <div>No TODOS to display</div>}
          {todos.map((item) => {
            return (
              <div className="todo flex gap-5 justify-between my-3" key={item.id}>
                <input name={item.id} type="checkbox" id="" value={item.isCompleted} checked={item.isCompleted} onChange={handleCheckBox} />
                <div className={item.isCompleted ? "line-through" : ""} style={{
                  width: "220px",
                  overflowWrap: 'break-word'
                }}>{item.todo}</div>
                <div className="buttons">
                  <button className='bg-slate-800 p-2 py-1 text-white rounded-md mx-1' onClick={(e) => { handleDelete(e, item.id) }}>x</button>
                  <button className='bg-slate-800 p-2 py-1 text-white rounded-md mx-1 ' name={item.id} onClick={handleEdit}>✎</button>
                </div>

              </div>
            )
          })}

        </div>
      </div>
    </>
  )
}

export default App
