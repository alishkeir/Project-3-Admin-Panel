import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Table } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Pagination from "react-js-pagination";

const Allschools = () => {
  const [pagination, setPagination] = useState([]);
//   const [showPaginaton, setShowPagination] = useState(true);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [school, setSchool] = useState("all");
//   const filterURL = `http://127.0.0.1:8000/api/admin/schools?school=${school}&page=${pageNumber}`;
  const [schools, setSchools] = useState([]);

  // const onChangeSchool = (e) => {
  //   setSchool(e.target.value);
  //   setPageNumber(1);
  // };
  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/schools').then((response) => {
        setSchools(response.data);
    })
}, [])
const deleteItem = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/api/admin/schools/${id} `, {
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }
        ).then((data) => {
            if (data.status === 200) {
                console.log(data)
                // alert("Deleted!");
                const newData = schools.filter((school) => school.id !== id);
                setSchools(newData);
            }
        })
    } catch (err) { console.log(err) }
}

  const showSchools = schools.map((school) => {
    return (
      <tr key={school.id}>
        <td>{school.id}</td>
        <td>{school.school_name}</td>
        <td>{school.students_no}</td>
        <Button  variant="danger"onClick={() => { deleteItem(school.id) }} className="btn btn-success" size="sm">
              Delete
            </Button>
      </tr>
    );
  });

  return (
    <>
      <Card className="text-center">
        <Card.Header>
          <h4>schools Manager</h4>
        </Card.Header>
        <Card.Body>
          <Link to={"/schools/add"}>
            <Button variant="primary">Add a school </Button>
          </Link>
        </Card.Body>
        
       
      </Card>

      <Table stripped="true" hover className="table-responsive-sm">
        <thead>
          <tr>
            <th>id</th>
            <th>School Name</th>
            <th>Students Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showSchools}</tbody>
      </Table>


    </>
  );
};

export default withRouter(Allschools);
