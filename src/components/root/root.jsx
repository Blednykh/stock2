import React from 'react';
import Header from "../header";
import StocksList from "../stocks-list/stocks-list";
import StockInfo from "../stock-info/stock-info"

import './root.scss';
import backRequest from "../../api/back-request";


class Root extends React.Component {
    state = {
        selectedStockInfo: undefined,
        stock: {},
        page: "stocks",
        loading: false,
        message: null,
        searchValue: "",
        offset: 5
    };









    renderStockInfo = stockInfo => e => {
        backRequest.get(`/userstocks/${stockInfo.symbol}`).then(responce => {
            const stock = responce.data.data;
            this.setState({ stock, selectedStockInfo: stockInfo});
        })
      /*  this.setState({ selectedStockInfo: stockInfo })*/
    };


    render() {
        const {stocks, page, message, loading} = this.state;
        return (
            <div className="root">
                <Header/>
                <main>
                    <StocksList
                        renderStockInfo={this.renderStockInfo}
                       /* stocks={stocks}
                        page={page}
                        message={message}
                        loading={loading}
                        renderStockInfo={this.renderStockInfo}
                        renderStocksList={this.renderStocksList}
                        renderUserStockList={this.renderUserStockList}
                        renderHistory={this.renderHistory}
                        scrollLoading={this.scrollLoading}
                        changeSearchValue={this.changeSearchValue}*/
                    />
                    {this.state.selectedStockInfo && <StockInfo
                        stockInfo={this.state.selectedStockInfo}
                        setTransaction={this.setTransaction}
                        stock={this.state.stock}
                    />}
                </main>
            </div>

        );
    }
}

export default Root;
