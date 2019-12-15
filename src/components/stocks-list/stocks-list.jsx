import React from 'react';
import Stock from "../stock";
import tomorrowRequest from '../../api/tomorrow';

import './stocks-list.scss';

class StocksList extends React.Component {
    state = {stocks: []};

    componentDidMount() {
        tomorrowRequest.get('/stocks/?offset=0').then(responce => {
            const stocks = responce.data.data;
            this.setState({stocks});
        })
    }

    renderStocksList = () => {
        tomorrowRequest.get('/stocks/?offset=0').then(responce => {
            const stocks = responce.data.data;
            this.setState({stocks});
        })
    };
    renderUserStockList = () => {
        tomorrowRequest.get('/userstocks/?offset=0').then(responce => {
            const stocks = responce.data.data;
            this.setState({stocks});
        })
    };
    renderHistory = () => {
        tomorrowRequest.get('/transactions/?offset=0').then(responce => {
            const stocks = responce.data.data;
            this.setState({stocks});
        })
    };

    render() {
        const {stocks} = this.state;
        console.log("stocks", stocks);
        return (
            <div className="stocks-list">
                <button className="stocks-list__button stocks-list__button-stock" onClick={this.renderStocksList}>ALL
                    STOCKS
                </button>
                <button className="stocks-list__button stocks-list__button-usaerstock"
                        onClick={this.renderUserStockList}>MY STOCKS
                </button>
                <button className="stocks-list__button stocks-list__button-history"
                        onClick={this.renderHistory}>TRANSACTION HISTORY
                </button>
                {stocks.map(({symbol, price, profile, count, middlePrice, date, type}) => {
                    return <Stock
                        key={symbol}
                        symbol={symbol}
                        price={price ? price : middlePrice}
                        title={profile.companyName}
                        image={profile.image}
                        count={count}
                        date={date}
                        type={type}
                        profile={profile}
                        renderStockInfo={this.props.renderStockInfo}
                    />
                })}
            </div>
        );
    }

}

export default StocksList;
