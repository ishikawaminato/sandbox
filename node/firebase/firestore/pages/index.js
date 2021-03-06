import { Component } from "react";
import firebase from "../firebase";
import "firebase/firestore";

export default class Top extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", messages: [] };
    this.changeMessage = this.changeMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  async componentDidMount() {
    const db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    db.settings(settings);

    const querySnapshot = await db
      .collection("romms")
      .doc("roomA")
      .collection("messages")
      .get();

    const messages = [];
    querySnapshot.forEach(doc => messages.push(doc.data()));
    this.setState({ messages });
  }

  changeMessage(e) {
    this.setState({ text: e.target.value });
  }

  async postMessage() {
    const db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    db.settings(settings);
    await db
      .collection("romms")
      .doc("roomA")
      .collection("messages")
      .add({
        message: this.state.text,
        date: new Date()
      });

    this.setState({ text: "" });
  }

  render() {
    return (
      <div>
        <h1>Firestore Sample</h1>
        <input
          type="text"
          value={this.state.text}
          onChange={this.changeMessage}
        />
        <button onClick={this.postMessage}>追加</button>

        <ul>
          {this.state.messages.map((m, i) => (
            <li key={i}>{m.message}</li>
          ))}
        </ul>
      </div>
    );
  }
}
