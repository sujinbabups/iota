import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom'
import WareHouseHomepage from './Pages/Warehouse/WareHouseHomepage'
import WareHouseLayout from './Layout/WareHouseLayout'


const App = () => {

  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/warehouse' element={<WareHouseLayout/>}>


      </Route>
      
      </>
    )
  )
  return (
    <>
    <RouterProvider router={router}/>
{/* <WareHouseHomepage/> */}
</>
  )
}

export default App
