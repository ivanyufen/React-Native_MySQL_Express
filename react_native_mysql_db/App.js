import React from 'react';
import { Container, Text, Button, List, ListItem, Header, Tab, Tabs, Input, Form, Item, Content, Label, Left, Body } from 'native-base';
import axios from 'axios';

// GET AND POST MYSQL EXPRESS
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      data: "",
      name: "",
      age: "",
      email: ""
    }
  }

  ambilData = () => {
    var url = "http://172.16.4.249:1234/data";
    axios.get(url).then((x) => {
      console.log(x.data);
      this.setState({
        data: x.data
      })
    }).catch((x) => {
      console.log(x);
      alert("Error get");
    })
  }

  kasihData = () => {
    var url = "http://172.16.4.249:1234/data";
    axios.post(url, { name: this.state.name, age: this.state.age, email: this.state.email }).then((x) => {
      alert("Submit sukses!");
      this.setState({
        name: "",
        age: "",
        email: ""
      });
      this.ambilData();
    }).catch((x) => {
      console.log(x);
      alert("Submit gagal!");
    })


  }


  displayData() {
    var no = 0;
    return this.state.data.map((val, i) => {
      no = no + 1;
      return (
        <ListItem key={i}>
          <Body>
            <Text>{no}. {val.name} / {val.age} th</Text>
            <Text note>{val.email}</Text>
          </Body>
        </ListItem>
      )

    })
  }


  render() {
    return (
      <Container>
        <Header hasTabs />
        <Tabs>
          <Tab heading="GET">
            <Button full onPress={this.ambilData}>
              <Text>Show list users</Text>
            </Button>
            <Content>
              <List>
                {this.state.data ? this.displayData() : <Text></Text>}
              </List>
            </Content>

          </Tab>

          <Tab heading="POST">
            <Form>

              <Item floatingLabel>
                <Label><Text>Name</Text></Label>
                <Input value={this.state.name} onChangeText={(e) => {
                  this.setState({ name: e });
                }}></Input>
              </Item>

              <Item floatingLabel>
                <Label><Text>Age</Text></Label>
                <Input value={this.state.age} onChangeText={(e) => {
                  this.setState({ age: e });
                }}></Input>
              </Item>

              <Item floatingLabel>
                <Label><Text>Email</Text></Label>
                <Input value={this.state.email} onChangeText={(e) => {
                  this.setState({ email: e });
                }}></Input>
              </Item>

            </Form>

            <Button full onPress={this.kasihData}>
              <Text>Submit</Text>
            </Button>
          </Tab>
        </Tabs>

      </Container >
    )
  }
}

export default App;