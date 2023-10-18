import TodoContainer from "./components/TodoContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer />
      <TodoContainer />
    </>
  );
}

export default App;
