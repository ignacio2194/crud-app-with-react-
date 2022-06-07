import "./App.css";
import React, { useState } from "react";
import nextId from "react-id-generator";

function App() {
  // aca se asigna la tarea
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [edicion, setEdicion] = useState(false);
  const [id, setId] = useState('');
  const [error,setError] = useState(null)

  const deleteItem = (id) => {
    const res = tareas.filter((item) => item.id !== id);
    setTareas(res);
  };
  const editarTarea =(e)=>{
    e.preventDefault();
    if (!tarea.trim("")) {
      setError('Escriba algo por favor... ')
      return;
    }
  const resArr = tareas.map(item=>item.id=== id ? {id:id, Nombretarea:tarea}:item)
  setTareas(resArr)
  setEdicion(false)
  setTarea('')
  setId('')
  setError(null)
  }
  const editar=(item)=>{
setEdicion(true)
setTarea(item.Nombretarea)
setId(item.id)

  }
  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim("")) {
      setError('Escriba algo por favor... ')
      return;
    }
    setTarea("");
    setError(null)
    
    setTareas([...tareas, { id: nextId(), Nombretarea: tarea }]);
  };
  return (
    <div className="container">
      <h1 className="text-center mt-5">task-crud</h1>
      <hr></hr>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">lista de tarea</h4>
          <ul>
            {
            tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) :
            (
              tareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.Nombretarea}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => deleteItem(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )
           }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">{
            edicion? 'Editar tarea' :'Agregar tarea '
          }
          </h4>
          <form onSubmit={edicion? editarTarea:agregarTarea}>
            {
              error? <span className=" text-danger">{error}</span>: null
            }
            <input
              type="text"
              className="form-control mb-2"
              placeholder="ingrese una tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {
              edicion?(
                <button className="btn btn-warning btn-block" type="submit">
               editar tarea 
              </button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">
              agregar tarea
            </button>
              )
            }
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
