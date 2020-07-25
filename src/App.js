import React, { Component } from "react";
import "./App.css";
import ButtonAppBar from "./components/AppBar.jsx";
import Router from "./Router";
import getThanos from "./util/thanos";
import { contractAddress } from "./constants/contract";

class App extends Component {
  state = {
    address: "",
    balance: "",
    instance: null,
  };

  componentDidMount = async () => {
    try {
      const tezos = await getThanos();
      const accountPkh = await tezos.wallet.pkh();
      const accountBalance = await tezos.tz.getBalance(accountPkh);
      const instance = await tezos.wallet.at(contractAddress);
      this.setState({
        address: accountPkh,
        balance: parseInt(accountBalance) / 1000000,
        instance: instance,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="App">
        <ButtonAppBar
          accountAddress={this.state.address}
          accountBalance={this.state.balance}
        />
        <br />
        <br />
        <br />
        <Router />
      </div>
    );
  }
}

export default App;
