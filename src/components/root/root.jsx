import React from 'react';
import Header from "../header";
import StocksList from "../stocks-list/stocks-list";
import StockInfo from "../stock-info/stock-info"
import tomorrowRequest from "../../api/tomorrow";

import './root.scss';


class Root extends React.Component {
    state = {
        selectedStockInfo: undefined,
        stocks: [],
        page: "stocks",
        loading: false,
        message: null,
        searchValue: "",
        offset: 5
    };









    renderStockInfo = stockInfo => e => {
        this.setState({ selectedStockInfo: stockInfo })
    };

    setTransaction = (symbol, count, price, type) => e => {
        console.log(symbol, count, price, type);
        tomorrowRequest.post('/userstocks/', {
            symbol,
            count,
            price,
            type,
        }).then(responce => {
            const data = responce.data.data;
            if (data.count !== 0) {
                let { stocks, page, searchValue } = this.state;
                if(this.state.page === "transactions"){
                    this.renderList(page, searchValue);
                }
                else{
                    const findIndex = stocks.findIndex(item =>item.symbol===data.symbol);
                    stocks[findIndex].count = data.count;
                    this.setState({ stocks });
                }

            }
        })
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
                    />}
                </main>
            </div>

        );
    }
}

export default Root;
