import React, { Component } from 'react';

const API_HOST = process.env.REACT_APP_API_HOST;
const MenuEndpoint = API_HOST + 'api/menues';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            menu: []
        }
    }
    componentDidMount() {
        fetch(MenuEndpoint)
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    isLoaded: true,
                    menu: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }
    render() {
        const { error, isLoaded, menu } = this.state;
        if(error) {
            return <div> Error: {error.message}</div>
        } else if(!isLoaded) {
            return <div> Loading... </div>;
        } else {
            return (
                <ul>
                    {menu.map(item => (
                        <li key={item.id}>
                            {item.name} {item.price}

                        </li>

                    ))}

                </ul>
            )
        }
    }
}

export default Menu;

