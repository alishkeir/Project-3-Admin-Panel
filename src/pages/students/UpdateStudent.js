import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const UpdateStudent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [image, setImage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const onChangefirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangelastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const onChangeWhatsappNumber = (e) => {
    setWhatsappNumber(e.target.value);
  };

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const onSubmit = async (e) => {

    e.preventDefault();
    const url = "http://127.0.0.1:8000/api/admin/students?_method=PUT";
    const body = new FormData();
    body.append("first_name", firstName);
    body.append("last_name", lastName);
    body.append("email", email);
    body.append("password", password);
    body.append("phone_number", phoneNumber);
    body.append("whatsapp_number", whatsappNumber);
    body.append("image", image);
    body.append("school_id", "1");
    body.append("nationality", "lebanese");
    body.append("status", "alumni");
    await axios
      .post(url, body, {
        headers: {
          // "content-type": "multipart/form-data",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("tokens"),
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
      return <Redirect to="/students" />;
    }
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>
          <h4>Create a Student</h4>
        </Card.Header>
        <Card.Body>
          <Link to={"/students"}>
              <Button variant="warning">Back</Button>
            </Link>
        </Card.Body>
      </Card>

      <Form onSubmit={(e) => onSubmit(e)} className="w-50 mx-auto mt-5">
        <div className="form-group">
          <label>First Name:</label>

          <input
            className="form-control"
            type="text"
            onChange={(e) => onChangefirstName(e)}
            maxLength="255"
            required
            pattern="[A-Za-z].{1,}"
            title="Only letters allowed"
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            className="form-control"
            type="text"
            maxLength="255"
            required
            onChange={(e) => onChangelastName(e)}
            pattern="[A-Za-z].{1,}"
            title="Only letters allowed"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-control"
            type="email"
            onChange={(e) => onChangeEmail(e)}
            maxLength="255"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="someone@example.com"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            className="form-control"
            type="password"
            maxLength="255"
            required
            minLength="8"
            onChange={(e) => onChangePassword(e)}
            // pattern="{6,}"
            // title="6 characters or more"
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            className="form-control"
            type="text"
            maxLength="255"
            required
            minLength="8"
            onChange={(e) => onChangePhoneNumber(e)}
            pattern="[0-9]{8,}"
            title="8 digits or more"
          />
        </div>

        <div className="form-group">
          <label>Whatsapp Number:</label>
          <input
            className="form-control"
            type="text"
            maxLength="255"
            required
            minLength="8"
            onChange={(e) => onChangeWhatsappNumber(e)}
            pattern="[0-9]{8,}"
            title="8 digits or more"
          />
        </div>

        <div className="form-group">
          <label>Image :</label>
          <br />
          <input
            className="submit"
            type="file"
            name="image"
            accept="image/*"
            required
            onChange={(e) => onChangeImage(e)}
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

export default UpdateStudent;
