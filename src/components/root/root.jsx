import React from 'react';
import StocksList from "../stocks-list/stocks-list";
import StockInfo from "../stock-info/stock-info"
import tomorrowRequest from "../../api/tomorrow";

import './root.scss';


class Root extends React.Component {
    state = { selectedStockInfo: undefined };

    renderStockInfo = stockInfo => e => {
        this.setState({ selectedStockInfo: stockInfo })
    };

    setTransaction = (symbol, count, price, type) => e => {
        console.log(symbol, count, price, type);
        tomorrowRequest.post('/userstocks/', {
            symbol,
            count,
            price,
            type
        }).then(responce => {
            const data = responce.data.data;
            console.log(data);
        })
    };

    render() {


        return (
            <div className="root">
                <StocksList
                    renderStockInfo={this.renderStockInfo}
                />
                {this.state.selectedStockInfo && <StockInfo
                    stockInfo={this.state.selectedStockInfo}
                    setTransaction={this.setTransaction}
                />}
            </div>

        );
    }
}

export default Root;
