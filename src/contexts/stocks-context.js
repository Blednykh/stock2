import React,{ createContext, Component} from 'react';
import tomorrowRequest from '../api/tomorrow';

export const StocksContext = createContext({
    stocks: [],
    loading: false,
    message: null,
    page: "",
    searchValue: "",
    offset: 0,
    renderStocksList(){},
    renderUserStockList(){},
    renderHistory(){},
    scrollLoading(){},
    changeSearchValue(){}
});

class StocksProvider extends Component {
    state = { stocks: [], loading: false, message: null, page: "stocks", searchValue: "", offset: 0};

   /* componentDidMount() {
        this.setState({ loading: true });
        tomorrowRequest.get('/stocks/?offset=0').then(responce => {
            const stocks = responce.data.data;
            this.setState({ stocks, loading: false });
            console.log("stocks_context",stocks);
        })
            .catch(() => this.setState({ message: 'NETWORK_ERROR', loading: false }));
    }

    renderStocksList = () => {
        tomorrowRequest.get('/stocks/?offset=0').then(responce => {
            const stocks = responce.data.data;
            this.setState({stocks, page: "stocks"});
        })
    };
    renderUserStockList = () => {
        tomorrowRequest.get('/userstocks/?offset=0').then(responce => {
            const stocks = responce.data.data;
            this.setState({stocks, page: "userStocks"});
        })
    };
    renderHistory = () => {
        tomorrowRequest.get('/transactions/?offset=0').then(responce => {
            const stocks = responce.data.data;
            this.setState({stocks, page: "transactions"});
        })
    };
    handleScroll = () => {
        if (
            this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
            this.refs.myscroll.scrollHeight
        ) {
            let { stocks } = this.state;
            tomorrowRequest.get('/stocks/?offset=5').then(responce => {
                stocks = stocks.concat(responce.data.data);
                console.log("новые стоки", stocks, responce.data.data);
                this.setState({ stocks, page: "stocks" });
            })
        }
    };*/

    renderList = (page, searchValue) => {
        console.log("renderList",page, searchValue);
        tomorrowRequest.get(`/${page}/?offset=0&name=${searchValue}`).then(responce => {
            const stocks = responce.data.data;
            console.log("renderList__stocks", stocks);
            this.setState({ stocks, page });
        })
    };

    componentDidMount() {
        this.renderList("stocks", this.state.searchValue);

    }

    renderStocksList = () => {
        this.setState({ page: "stocks", offset: 0 });
        this.renderList("stocks", this.state.searchValue);

    };
    renderUserStockList = () => {
        this.setState({ page: "userstocks", offset: 0  });
        this.renderList("userstocks",this.state.searchValue);
    };
    renderHistory = () => {
        this.setState({ page: "transactions", offset: 0  });
        this.renderList("transactions",this.state.searchValue);
    };

    scrollLoading  = () => {
        let { stocks, page, offset, searchValue } = this.state;
        offset+=10;
        tomorrowRequest.get(`/${page}/?offset=${offset}&name=${searchValue}`).then(responce => {
            stocks = stocks.concat(responce.data.data);
            this.setState({ stocks, offset: offset});
        })
    };
    changeSearchValue = (searchValue, page) => {
        this.setState({ searchValue, offset: 0 });
        this.renderList(page, searchValue);
    };


    render(){
        const { stocks, loading, message, page, searchValue, offset} = this.state;
        return (
            <StocksContext.Provider value={{
                stocks,
                loading,
                message,
                page,
                searchValue,
                offset,
                renderStocksList: this.renderStocksList,
                renderUserStockList: this.renderUserStockList,
                renderHistory: this.renderHistory,
                scrollLoading: this.scrollLoading,
                changeSearchValue: this.changeSearchValue
            }}>
                {this.props.children}
            </StocksContext.Provider>
        )
    }
}

export default StocksProvider;
