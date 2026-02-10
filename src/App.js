import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AddLabour from "./Component/AddLabour"
import LabourDetails  from "./Component/LabourDetails"
function App(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<LabourDetails/>}/>
            <Route path='/addlabour' element={<AddLabour/>}/>
            <Route path='/addlabour/:id' element={<AddLabour/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default App;