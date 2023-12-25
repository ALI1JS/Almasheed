import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import MerchentElement from "../merchentElement/MerchentElement"

const MerchentElementList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {/* <Datatable/> */}
        <MerchentElement />
      </div>
    </div>
  )
}

export default MerchentElementList