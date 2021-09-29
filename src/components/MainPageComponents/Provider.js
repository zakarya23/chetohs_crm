import React, { Component } from "react";

export const MyContext = React.createContext(); 

export default class Provider extends Component {
    state = {"search": false}
    render() {
        return (
            <MyContext.Provider value={
                {
                state: this.state, 
                setMessage: (value) => this.setState({
                    message: value
            })}}>
            {this.props.children}
            </MyContext.Provider>
        )
    }
}