import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import ProductElement from "../productElement/ProductElement"
import { useParams } from "react-router-dom"

const ProducElementList = () => {
  
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ProductElement />
      </div>
    </div>
  )
}

export default ProducElementList