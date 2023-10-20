import React, { useState, useEffect, useCallback } from 'react';
import Nav from './Header/Nav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import adminInstance from '../../AxiosEndPoint/adminInstance';

type Category = {
  _id: string;
  title: string;
  description: string;
};

const CategoryTable: React.FC<{ Toggle: () => void }> = ({ Toggle }) => {
  const [category, setCategory] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Change this number based on your desired items per page

  useEffect(() => {
    // Fetch data from your API using Axios
    adminInstance
      .get('/admin/getallcategory')
      .then((response) => {
        console.log(response.data);
        setCategory(response.data.categoryDetails);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  // Filter categories based on the search query
  const filteredCategories = category.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Get the data to display on the current page
  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <ToastContainer />
      <h1>Category Table</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search for a category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
      </div>
      <table className="table rounded mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((category, index) => (
            <tr key={category._id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{category.title}</td>
              <td>{category.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={handlePrevPage} className="pagination-button">
            Prev
          </button>
        )}

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`pagination-button ${
              currentPage === index + 1 ? 'active' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}

        {currentPage < totalPages && (
          <button onClick={handleNextPage} className="pagination-button">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryTable;
