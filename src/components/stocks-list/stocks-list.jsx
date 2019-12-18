import React from 'react';
import Stock from "../stock";


import './stocks-list.scss';
import {StocksContext} from '../../contexts/stocks-context';



class StocksList extends React.Component {
    static contextType = StocksContext;
    state = { searchValue: "", timer: undefined};

 /*   state = {stocks: [], page: "stocks"};*/


    handleScroll = () => {
        if (
            this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
            this.refs.myscroll.scrollHeight
        ) {
            this.context.scrollLoading();
        }

    };

    handleInput = event => {
        let { timer } = this.state;

        this.setState({searchValue: Number(event.target.value)});

        if (timer) {
            clearTimeout(timer);
            timer = setTimeout(this.context.changeSearchValue,500, event.target.value,this.context.page);
            this.setState({timer});
        }
        else{
            timer = setTimeout(this.context.changeSearchValue,500, event.target.value,this.context.page);
            this.setState({timer});
        }
    };

    render() {
        const {
            stocks,
            loading,
            message,
            page,
            renderStocksList,
            renderUserStockList,
            renderHistory
        } = this.context;

        return (
            <div className="stocks-list">
                <div className="stocks-list__button-bar">

                    <button
                        className={`stocks-list__button${
                            (page === "stocks" ? ' stocks-list__button_active' : '')}`
                        }
                        onClick={renderStocksList}>
                        ALL STOCKS
                    </button>
                    <button
                        className={`stocks-list__button${
                            (page === "userstocks" ? ' stocks-list__button_active' : '')}`
                        }
                        onClick={renderUserStockList}>MY STOCKS
                    </button>
                    <button
                        className={`stocks-list__button${
                            (page === "transactions" ? ' stocks-list__button_active' : '')}`
                        }
                        onClick={renderHistory}>TRANSACTION HISTORY
                    </button>
                </div>
                <div className="search-bar">
                    <input type='text'  className="search-input" placeholder='Search stock...' onChange={this.handleInput}/>
                </div>
                <div
                    className="stocks-list__list"
                    onScroll={this.handleScroll}
                    ref="myscroll"
                   /* ref={(element)=>{this.element = element}}*/
                >
                    {stocks.map((stock) => {
                        return <Stock
                            key={stock.symbol+stock.date}
                            stock={stock}
                            renderStockInfo={this.props.renderStockInfo}
                        />
                    })}
                   {/* {stocks.map(({symbol, profile, count, transactionCount, middlePrice, date, type}) => {
                        return <Stock
                            key={symbol+date}
                            symbol={symbol}
                            price={middlePrice ? middlePrice : profile.price}
                            title={profile.companyName}
                            image={profile.image}
                            count={page==="transactions" ? transactionCount : count}
                            date={date}
                            type={type}
                            profile={profile}
                            renderStockInfo={this.props.renderStockInfo}
                        />
                    })}*/}
                </div>
            </div>
        );
    }

}

export default StocksList;
