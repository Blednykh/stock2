import React from 'react';
import Chart from "react-google-charts";
import axios from 'axios';

import './stock-info.scss';

class StockInfo extends React.Component {
    state = {
        inputCount: 0,
        loading: false,
        data:  undefined
    };

    componentDidMount() {
        this.setState({ loading: true });
        const data = axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.stockInfo.symbol}?timeseries=30`).then(responce => {
            let data = [['day', responce.data.symbol, responce.data.symbol, responce.data.symbol, responce.data.symbol]],
                historical = responce.data.historical;
            historical.forEach(({ date, open, high, low, close, change }) => {
                data.push(change >= 0 ? [new Date(date), high, open, close, low] : [new Date(date), low, open, close, high]);
            });
            console.log("data__CDM", data);
            this.setState({ data });
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.stockInfo.symbol !== prevProps.stockInfo.symbol) {
            this.setState({ loading: true, data: undefined });
            const data = axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.stockInfo.symbol}?timeseries=30`).then(responce => {
                let data = [['day', responce.data.symbol, responce.data.symbol, responce.data.symbol, responce.data.symbol]],
                    historical = responce.data.historical;
                historical.forEach(({ date, open, high, low, close, change }) => {
                    data.push(change >= 0 ? [new Date(date), high, open, close, low] : [new Date(date), low, open, close, high]);
                });
                console.log("data__CDM", data);
                this.setState({ data });
            });
        }

    }


    handleInput = event => {
        this.setState({inputCount: Number(event.target.value)});
    };

    render() {
        const {image, title, price, symbol, count, profile} = this.props.stockInfo;

        let data = this.state.data;

        return (
            <div className="stock-info">
                <div className="stock-info__title-box">
                    <img className="stock-info__img" src={image} alt={symbol}/>
                    <h1 className="stock-info__title">{title} | {symbol}</h1>
                    <div className="title-box__text">
                        <div className="title-box__bottom">
                            <p className="stock-info__price">{price}$</p>
                            {count && <p className="stock__count">{count} items(s)</p>}
                        </div>
                    </div>
                </div>

                <div className="stock-info__content-box">
                    <p className="stock-info__profile">{profile.description}</p>
                </div>
                <div className="stock-info__button-box">
                    <input type='text' value={this.state.inputCount} onChange={this.handleInput}/>
                    <button className="button button-sell" onClick={this.props.setTransaction(
                        symbol,
                        this.state.inputCount,
                        price,
                        "sell"
                    )}>Sell
                    </button>
                    <button className="button button-buy" onClick={this.props.setTransaction(
                        symbol,
                        this.state.inputCount,
                        price,
                        "buy"
                    )}>Buy
                    </button>
                </div>
                {data && <Chart
                    chartType="CandlestickChart"
                    width="90%"
                    height="300px"
                    data={data}
                    loader={<div>Loading Chart</div>}
                    options={{
                        /*animation: {
                            duration: 500,
                            easing: 'linear',
                            startup: true,
                        },*/
                        backgroundColor: "white",
                        candlestick: {
                            fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                            risingColor: { strokeWidth: 0, fill: '#0f9d58' }, // green
                        },
                    }}
                    rootProps={{ 'data-testid': '3' }}
                    chartPackages={['corechart', 'controls']}
                    controls={[
                        {
                            controlType: 'ChartRangeFilter',
                            options: {
                                filterColumnIndex: 0,
                                ui: {
                                    chartType: 'LineChart',
                                    chartOptions: {
                                    /*    backgroundColor: "none",*/
                                        vAxis: { viewWindow: { min: 150, max: 200 } },
                                        width: 700,
                                        chartArea: { width: '90%', height: '40%' },
                                    },
                                    chartView: {
                                        columns: [0, 1]
                                    },
                                },
                            },
                            controlPosition: 'bottom',
                            controlWrapperParams: {
                                state: {
                                    range: { start: new Date(1997, 1, 9), end: new Date(2020, 2, 20) },
                                },
                            },

                        },
                    ]}

                />}

            </div>
        );
    }

}

export default StockInfo;
