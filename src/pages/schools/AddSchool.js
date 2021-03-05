import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const AddSchool = (e) => {
    console.log(e);
    const [school_name, setSchool_name] = useState("");
    const [students_no, setStudentsNumber] = useState("");

    const [redirect, setRedirect] = useState(false);

    const onChangeschoolName = (e) => {
        setSchool_name(e.target.value);
    };

    const onChangestudentNumber = (e) => {
        setStudentsNumber(e.target.value);
    };

console.log(students_no);
console.log(school_name);

    const onSubmit = async (e) => {
        e.preventDefault();
        const url = "http://127.0.0.1:8000/api/admin/schools";
        const body = new FormData();
        body.append("school_name", school_name);
        body.append("students_no", students_no);
        await axios
            .post(url, body, {
                headers: {
                    "content-type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                if (res.data.message) {
                    console.log(res.data.message);
                } else {
                    setRedirect(true);
                }
            });
        if (redirect) {
            return <Redirect to="/schools" />;
        }
    };

    return (
        <>
            <Card className="text-center">
                <Card.Header>
                    <h4>Create a School</h4>
                </Card.Header>
                <Card.Body>
                    <Link to={"/schools"}>
                        <Button variant="warning">Back</Button>
                    </Link>
                </Card.Body>
            </Card>

            <Form onSubmit={(e) => onSubmit(e)} className="w-50 mx-auto mt-5">
                <div className="form-group">
                    <label>School Name:</label>

                    <input
                        className="form-control"
                        type="text"
                        onChange={(e) => onChangeschoolName(e)}
                        maxLength="255"
                        required
                        pattern="[A-Za-z].{1,}"
                        title="Only letters allowed"
                    />
                </div>

                <div className="form-group">
                    <label>Student Number:</label>
                    <input
                        className="form-control"
                        type="text"
                        maxLength="255"
                        required
                        onChange={(e) => onChangestudentNumber(e)}
                    // pattern="[0-9]{0,2}"
                    // title="8 digits or more"
                    />
                </div>


                <div className="form-group">
                    <Button className="btn btn-primary" type="submit">
                        Create
          </Button>
                </div>
            </Form>
        </>
    );
};

export default AddSchool;
