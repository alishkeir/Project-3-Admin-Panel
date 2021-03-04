import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

const AllStudents = () => {
  const [pagination, setPagination] = useState([]);
  const [showPaginaton, setShowPagination] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [school, setSchool] = useState("all"); 
  const filterURL = `http://127.0.0.1:8000/api/admin/students?school=${school}&page=${pageNumber}`;
  const [students, setStudents] = useState([]);

  // const onChangeSchool = (e) => {
  //   setSchool(e.target.value);
  //   setPageNumber(1);
  // };

  useEffect(() => {
    axios.get(filterURL).then((res) => {
      setStudents(res.data.data);
      setPagination(res.data);
      if (res.data.total === 0) {
        setShowPagination(false);
      }
    });
  }, [filterURL, school]);

  const showStudents = students.map((student) => {
    return (
      <tr key={student.id}>
        <td>{student.id}</td>
        <td>{student.first_name}</td>
        <td>{student.last_name}</td>

        <td>
          <Link to={`/students/view/${student.id}`}>
            <Button className="btn btn-success" size="sm">
              View
            </Button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Card className="text-center">
        <Card.Header>
          <h4>Students Manager</h4>
        </Card.Header>
        <Card.Body>
          <Link to={"/students/add"}>
            <Button variant="primary">Add a Student </Button>
          </Link>
        </Card.Body>
        {/* <div
          className="form-group"
          value="0"
          onChange={(e) => onChangeSection(e)}
        >
          <FilterSections />
        </div> */}
      </Card>

      <Table stripped="true" hover className="table-responsive-sm">
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showStudents}</tbody>
      </Table>

      {showPaginaton ? (
        <Pagination
          // innerClass="mt-2 pagination"
          innerClass="pagination justify-content-center"
          activePage={pagination.current_page}
          totalItemsCount={pagination.total}
          itemsCountPerPage={pagination.per_page}
          itemClass="page-item"
          linkClass="page-link"
          nextPageText="next"
          prevPageText="prev"
          onChange={(pageNumber) => {
            setPageNumber(pageNumber);
          }}
        />
      ) : null}
    </>
  );
};

export default AllStudents;
