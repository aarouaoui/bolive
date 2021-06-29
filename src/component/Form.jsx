import React , {Component} from "react";
import axios from 'axios';

class LiveForm extends Component {

    constructor(props) {
        super(props);
     
        this.state = {
          content: ""
        };
      }
     
      handleSubmitForm(event) {
        event.preventDefault()
        const url= "https://4ymem8ew75.execute-api.us-east-2.amazonaws.com/prod/card";
        
        var requestOptions = {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json'
           },
            body: {"name" : "card10" , "content":"ididid", "id" : "idididi", "channel_id":"channel1"},
        };
        axios.post(url, requestOptions)
        .then(res => {
            console.log('succes');
        }).catch(error => {
            console.log(error);
        })


      }
     
      handleChange(event) {
        var value = event.target.value;
     
        this.setState({
          content: value
        });
      }
     
      render() {
        return (
          <form onSubmit={event => this.handleSubmitForm(event)}>
            <label>
              Content:
              <textarea
                type="tex"
                value={this.state.content}
                onChange={event => this.handleChange(event)}
              />
            </label>
            <input type="submit" value="Submit" />        
          </form>
        );
      }
}

export default LiveForm;
