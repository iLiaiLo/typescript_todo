import { useState ,useEffect} from 'react';
import './App.css';

interface Todo{
  id:number,
  text:string,
  completed:boolean
}

function App():JSX.Element{

  const [todoText,setTodoText]=useState<string>("")
  const [todoItems,setTodoItems]=useState<Todo[]>([])

  useEffect(()=>{
    const data:string|null=localStorage.getItem("TodoData");
    if(data){
      setTodoItems(JSON.parse(data))
    }
  },[])

  function AddTodo():void{

    const item={
      id:Math.random(),
      text:todoText,
      completed:false
    }
    setTodoItems(prew=>[...prew,item])
    setTodoText("")
    localStorage.setItem("TodoData",JSON.stringify([...todoItems,item]))
  }

  function chooseTodo(id:number):void{
    const mapped=todoItems.map(item=>{
      if(item.id===id){
        return {...item,completed:!item.completed}
      }
      return item
    })
    setTodoItems(mapped)
    localStorage.setItem("TodoData",JSON.stringify(mapped))
  }

  function removeTodo(id:number):void{
    const filtered=todoItems.filter(item=>item.id!==id)
    setTodoItems(filtered)
    localStorage.setItem("TodoData",JSON.stringify(filtered))
  }

  function clearTodos():void{
    setTodoItems([])
    localStorage.removeItem("TodoData")
  }


  return (
    <div className="todoContainer">
      <section className='todoSection'>
        <input type="text" className='todoInput' placeholder='Set a task...' onChange={(e)=>setTodoText(e.target.value)} />
        <button onClick={AddTodo}>Add task</button>
        <button className='clearButton' onClick={clearTodos}>Clear</button>
      </section>
      <section className='todoTasks'>
        {todoItems.map((item)=>{
          return(<div key={item.id} className='divContainer' style={{backgroundColor:item.completed?"lightgreen":""}}>
            <input type="checkbox" checked={item.completed} onChange={()=>chooseTodo(item.id)}/>
            <div className='todoTextDiv'>{item.text}</div>
            <button onClick={()=>removeTodo(item.id)}>Remove task</button>
          </div>)
        })}
      </section>
      
    </div>)
}

export default App;
