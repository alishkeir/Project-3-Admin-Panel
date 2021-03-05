import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, Redirect } from "react-router-dom";
import { Table, Card, Button } from "react-bootstrap";
import { Confirm } from "react-st-modal";
import "./view.css";

const ViewStudent = (props) => {
  let params = useParams(props);
  // console.log(params.id);
  const url = `http://127.0.0.1:8000/api/admin/students/${params.id}`;
  const [student, setStudent] = useState("");
  const [redirect, setRedirect] = useState(false);

  const deleteStudent = async (id) => {
    const deleteUrl = `http://localhost:8000/api/admin/students/${params.id}`;
    await axios.delete(deleteUrl).then(() => setRedirect({ redirect: true }));
  };

  useEffect(() => {
    axios.get(url).then((res) => {
      setStudent(res.data);
    });
  }, [url]);
  console.log(student);

  if (redirect) {
    return <Redirect to="/students" />;
  }

  return (
    <>
      <Card className="text-center">
        <Card.Header>
          <h4>Students Manager</h4>
        </Card.Header>
        <Card.Body>
          <Link to={"/students"}>
            <Button variant="warning">Back</Button>
          </Link>

          <Link to={`/students/edit/${student.id}`}>
            <Button variant="primary" className=" mr-2 m-2" size="md">
              Edit
            </Button>
          </Link>

          <Button
            variant="danger"
            size="md"
            onClick={async () => {
              const isConfirm = await Confirm(
                "Are you sure you want to delete this Student ?"
              );
              if (isConfirm) {
                deleteStudent(student.id);
              }
            }}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>

      <div className="image">
        <img
          src={`http://localhost:8000/storage/Student/${student.image}`}
          alt="profile "
          className="profile"
        />
      </div>

      <Table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <td>{student.id}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>First Name</th>
            <td>{student.first_name}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{student.last_name}</td>
          </tr>
          <tr>
            <th>Email Address</th>
            <td>{student.email}</td>
          </tr>
          <tr>
            <th>Phon Number</th>
            <td>{student.phone_number}</td>
          </tr>
          <tr>
            <th>Whatsapp Number</th>
            <td>{student.whatsapp_number}</td>
          </tr>
          <tr>
            <th>Section</th>
            <td>{student.sectionID}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ViewStudent;
