import React , {Component} from "react";
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from "websocket";

class LiveForm extends Component {

    constructor(props) {
        super(props);
     
        this.state = {
          content: "",
          title: ""  
        };
        this.client = new W3CWebSocket('wss://m1l7vq7ida.execute-api.us-east-2.amazonaws.com/production');
      }
     
      handleSubmitForm(event) {
        event.preventDefault()
        const url= "https://4ymem8ew75.execute-api.us-east-2.amazonaws.com/prod/card";
       /* axios.defaults.headers.post['Access-Control-Allow-Headers'] ='*';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] ='*'
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';*/
        var requestOptions = {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json'
           },
            body: {"name" : "card10" , "content":"ididid", "id" : "idididi", "channel_id":"channel1"},
        };
          
        const card =  {
          title: this.state.title,
          content: this.state.content,
          id: Math.random().toString(36).substr(2, 9),
          channel_id: "channel1"
        };
        axios.post(url, card)
        .then(res => {
            console.log('succes');
            console.log(card.id);
            var data = {
              "action": "message",
              "message": card
              };
            this.client.send(data)
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
    
      handleTitleChange(event) {
        var value = event.target.value;
        this.setState({
          title: value
        });
      }
    
      render() {
        return (
          <form onSubmit={event => this.handleSubmitForm(event)}>
             <label>
              Titre:
              <input
                value={this.state.title}
                onChange={event => this.handleTitleChange(event)}
              />
            </label>
            <label>
              Contenu:
              <textarea
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
