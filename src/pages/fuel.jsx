import React, { Component } from 'react';

class FuelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gallonsRequested: '',
            deliveryDate: '',
            //No suggested price for now
            suggestedPrice: '',
        };
        this.gallonsRequestedChange = this.gallonsRequestedChange.bind(this);
        this.deliveryDateChange = this.deliveryDateChange.bind(this);
    }

    gallonsRequestedChange(e) {
        this.setState({
            gallonsRequested: e.target.value
        });
    }

    deliveryDateChange(e) {
        this.setState({
            deliveryDate: e.target.value
        });
    }

    // Dummy function to calculate total amount due
    calculateTotalAmountDue = () => {
        const { gallonsRequested, suggestedPrice } = this.state;
        const total = gallonsRequested * suggestedPrice;
        return total;
    };

    render() {
        const { gallonsRequested, deliveryDate } = this.state;
        const deliveryAddress = 'placeholder';
        
        return (
            <div className="fuelPage">
                <h> Fuel Quote Page </h>
                <form>
                    <div>
                        <label>Gallons Requested:</label>
                        <input 
                            type="number" 
                            value={gallonsRequested} 
                            onChange={this.gallonsRequestedChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Delivery Address:</label>
                        <input 
                            type="text" 
                            value={deliveryAddress} 
                            readOnly 
                        />
                    </div>
                    <div>
                        <label>Delivery Date:</label>
                        <input 
                            type="date" 
                            value={deliveryDate} 
                            onChange={this.deliveryDateChange} 
                        />
                    </div>
                    <div>
                        <label>Suggested Price / gallon:</label>
                        <input 
                            type="number" 
                            value={this.state.suggestedPrice} 
                            readOnly 
                        />
                    </div>
                    <div>
                        <label>Total Amount Due:</label>
                        <input 
                            type="number" 
                            value={this.calculateTotalAmountDue()} 
                            readOnly 
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default FuelPage;
