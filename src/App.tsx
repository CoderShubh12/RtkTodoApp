import TodoForm from "./CrudSetup/TodoForm";
// import ContactForm from "./CrudSetup/Contactform";
const App = () => {
  return (
    <div className="todoContainer">
      <div className="Title">
        <h1>This is Todo App with RTK Query</h1>
      </div>

      <div>
        <TodoForm />
      </div>
    </div>
  );
};

export default App;
