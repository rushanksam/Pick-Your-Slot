import ReactPaginate from "react-paginate";
import React from "react";
import './components.css'
function Paginate() {
  return (
    <ReactPaginate
      previousLabel={"<<"}
      nextLabel={">>"}
      breakLabel={"..."}
      pageCount={25}
      marginPagesDisplayed={2}
      pageRangeDisplayed={4}
      color={"primary"}
      // onPageChange={(value) => setPage(value)}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
}
export default Paginate;
