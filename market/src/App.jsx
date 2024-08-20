import Body from "./components/layout/Body";
import MenuNav from "./components/layout/MenuNav";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  return (
    <>
      <div className='container mx-auto py-6 px-4'>
        <MenuNav />
        <Body />
        <ToastContainer />
      </div>
    </>

  )
}