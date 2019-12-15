import React from 'react';

import './stock-info.scss';

class StockInfo extends React.Component {
    state = {inputCount: 0}
    handleInput = event => {
        this.setState({inputCount: Number(event.target.value)});
    };

    render() {
        const {image, title, price, symbol, count, profile} = this.props.stockInfo;
        return (
            <div className="stock-info">
                <img className="stock-info__img" src={image} alt={symbol}/>
                <div className="stock-info__content-box">
                    <p className="stock__title">{title}</p>
                    <p className="stock__price">{price}$</p>
                    {count && <p className="stock__count">{count}шт</p>}
                    <p className="stock__profile">{profile.description}</p>
                </div>
                <button className="button button-sell" onClick={this.props.setTransaction(
                    symbol,
                    this.state.inputCount,
                    price,
                    "sell"
                )}>Sell
                </button>
                <input type='text' value={this.state.inputCount} onChange={this.handleInput}/>
                <button className="button button-buy" onClick={this.props.setTransaction(
                    symbol,
                    this.state.inputCount,
                    price,
                    "buy"
                )}>Buy
                </button>
            </div>
        );
    }

}

export default StockInfo;
