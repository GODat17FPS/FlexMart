import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { createStore } from 'redux';
import { useHistory } from 'react-router-dom';
import rootReducer from '../../reducers/rootReducer';
import Axios from 'axios';

class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productList: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.buy = this.buy.bind(this);
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        if(this.props.productList.length) {
            document.getElementById('buy').hidden = false;
            document.getElementById('reset').hidden = false;
        } else {
            document.getElementById('buy').hidden = true;
            document.getElementById('reset').hidden = true;
        }
        let tempList = this.props.productList;
        tempList = tempList.map((obj) => {
            obj.tprice = Number(obj.pprice) * Number(obj.pno);
            return obj;
        })
        this.setState({
            productList: tempList
        });
    }

    handleClick(obj) {
        console.log('Remove object', obj._id);
        this.props.removeFromCart(obj);
        const store = createStore(rootReducer);
        console.log('Central State', store.getState());
        if(store.getState().productList.length) {
            document.getElementById('buy').hidden = false;
            document.getElementById('reset').hidden = false;
        } else {
            document.getElementById('buy').hidden = true;
            document.getElementById('reset').hidden = true;
        }
        let tempList = store.getState().productList;
        tempList = tempList.map((obj) => {
            obj.tprice = Number(obj.pprice) * Number(obj.pno);
            return obj;
        })
        this.setState({
            productList: tempList
        });
    }

    buy() {
        const edevice = [], food = [], clothes = [], furniture = [];
        this.state.productList.forEach(obj => {
            if(obj.ptype === 'e-device') {
                edevice.push(obj);
            } else if(obj.ptype === 'clothes') {
                clothes.push(obj);
            } else if(obj.ptype === 'furniture') {
                furniture.push(obj);
            } else if(obj.ptype === 'food') {
                food.push(obj);
            }
        });
        console.log('E-devices', edevice);
        console.log('Food', food);
        console.log('Furniture', furniture);
        console.log('Clothes', clothes);
        Axios.post("http://localhost:5000/delivery/add", {data: this.state.productList})
            .then((res) => {
                console.log(res.data.message);
                Axios.post("http://localhost:5000/customer/productList/edevice/update", edevice)
                    .then(res => {
                        console.log(res.data.message);
                    });
                Axios.post("http://localhost:5000/customer/productList/clothes/update", clothes)
                            .then(res => {
                                console.log(res.data.message);
                            });
                Axios.post("http://localhost:5000/customer/productList/food/update", food)
                            .then(res => {
                                console.log(res.data.message);
                            });
                Axios.post("http://localhost:5000/customer/productList/furniture/update", furniture)
                            .then(res => {
                                console.log(res.data.message);
                            });
                // this.remove();
                // const history = useHistory();
                // history.push("/customer/dashboard");
            },
            (err) => {
                console.log(err);
            });
    }

    remove() {
        console.log('Cart reset!!');
        this.props.clearCart(this.state.productList);
        const store = createStore(rootReducer);
        console.log('Central State', store.getState());
        if(store.getState().productList.length) {
            document.getElementById('buy').hidden = false;
            document.getElementById('reset').hidden = false;
        } else {
            document.getElementById('buy').hidden = true;
            document.getElementById('reset').hidden = true;
        }
        this.setState({
            productList: store.getState().productList
        });
    }

    render() {
        return(
            <Fragment>
                <div>
                {
                    this.state.productList.map((obj) => {
                        return (
                            <div className="jumbotron" key={obj._id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-4"><img src={obj.pimg} alt={obj.pname}/></div>
                                        <div className="col-sm-8">
                                            <p className="lead">Product Name: {obj.pname}</p>
                                            <p className="lead">Product Price: {obj.pprice}</p>
                                            <p className="lead">Number of items bought: {obj.pno}</p>
                                            <p className="lead">Total Price:</p>
                                            <input type="number" id="price" name="price" min="1" max="8" value={obj.tprice} readOnly/><br/><br/>
                                            <button type="button" className="btn btn-danger" onClick={() => {this.handleClick(obj)}}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    
                }
                </div>
                <button type="button" id="buy" className="btn btn-dark m-1" onClick={this.buy} hidden>Buy</button>
                <button type="button" id="reset" className="btn btn-dark m-1" onClick={this.remove} hidden>Clear Cart</button>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productList: state.productList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      removeFromCart: (obj) => dispatch({type: 'REMOVE_FROM_CART', object: obj}),
      clearCart: (data) => dispatch({type: 'CLEAR_CART', data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);