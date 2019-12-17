import React from "react";

import "./stock.scss";


class Stock extends React.Component {


    render() {
        console.log("props", this.props);
        let dateOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        const {image, title, price, count, date, symbol} = this.props;
        const trueDate = date ? new Date(date) : undefined;
        return (
            <div
                onClick={this.props.renderStockInfo(this.props)}
                className={`stock${
                    this.props.type ?
                        (this.props.type === "sell" ? ' stock_color_red' : ' stock_color_green')
                        :
                        ""
                }`}>
                <div className="stock__img-container">
                    <img className="stock__img" src={image} alt={symbol}/>
                </div>
                <div className="stock__content-box">
                    <div className="stock__row stock__top">
                        <span className="stock__title">{title}</span>
                        <span className="stock__price">{price}$</span>
                    </div>
                    <div className="stock__row stock__bottom">
                        {trueDate && <span className="stock__date">{trueDate.toLocaleString("ru", dateOptions)}</span>}
                        {count && <span className="stock__count">{count}шт</span>}
                    </div>
                </div>

            </div>
        )


    }
}

export default Stock;
