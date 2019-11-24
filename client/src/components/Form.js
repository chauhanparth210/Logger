import React, { Component } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container
} from "reactstrap";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
import Spinner from "../utils/Spinner";
import axios from "axios";

class VisitorForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hostName: "",
    isLoading: false
  };

  handleInput = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    this.setState({
      ...this.state,
      isLoading: true
    });
    const { firstName, lastName, email, phone, hostName } = this.state;
    const user = {
      name: firstName + " " + lastName,
      phone,
      email,
      hostName
    };
    axios
      .post("http://localhost:5000/visit", user)
      .then(res => {
        toast.notify("Thank you for Registertion!", {
          position: "bottom-right"
        });
      })
      .catch(err => {
        toast.notify("Sorry!!Server Error:500", {
          position: "bottom-right"
        });
      });
    this.setState({
      isLoading: false,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      hostName: ""
    });
  };

  render() {
    return (
      <div>
        <Spinner loading={this.state.isLoading} />
        <Container>
          <Form className="form">
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={this.handleInput}
                    value={this.state.firstName}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="LastName">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={this.handleInput}
                    value={this.state.lastName}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleInput}
                value={this.state.email}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone Number</Label>
              <Input
                type="text"
                name="phone"
                placeholder="Phone No."
                onChange={this.handleInput}
                value={this.state.phone}
              />
            </FormGroup>
            <FormGroup>
              <Label for="hostName">Host's Name</Label>
              <Input
                type="text"
                name="hostName"
                placeholder="Host's Name"
                onChange={this.handleInput}
                value={this.state.hostName}
              />
            </FormGroup>
            <Button onClick={this.handleSubmit}>Check In</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default VisitorForm;
