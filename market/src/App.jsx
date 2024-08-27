import { Body, MenuNav } from "../src/components/layout";
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