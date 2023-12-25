import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import Merchents from "../Merchents/Merchents"

const ListMerchents = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Merchents />
      </div>
    </div>
  )
}

export default ListMerchents