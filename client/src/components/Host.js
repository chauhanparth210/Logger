import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

export default class Host extends Component {
  render() {
    return (
      <Container>
        <Form className="form">
          <FormGroup>
            <Label for="email">Host's Email</Label>
            <Input type="email" name="email" placeholder="Host's Email" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" placeholder="Password" />
          </FormGroup>
          <Button>Login</Button>
        </Form>
      </Container>
    );
  }
}
