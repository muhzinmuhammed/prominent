import {useState} from 'react'
import CategoryTable from '../../Components/Admin/CategoryInAdmin';
import SideBar from '../../Components/Admin/Header/SideBar';

const CategoryPage = () => {
    const [toggle, setToggle] = useState<boolean>(true);

  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <SideBar  />
          </div>
        )}



{toggle&&<div className="col-4 col-md-2"></div>}
        <div className="col">
          <CategoryTable Toggle={Toggle}/>
        </div>  
      </div>
    </div>
      
    </div>
  )
}

export default CategoryPage
