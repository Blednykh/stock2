import React from "react";

import "./stock.scss";


class Stock extends React.Component {


    render() {
        let dateOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        const {
            stock: {
                profile,
                transactionCount,
                middlePrice,
                count,
                date,
                symbol,
                type
            },
            page,
            renderStockInfo
        } = this.props;

        const trueDate = date ? new Date(date) : undefined;

        return (
            <div
                onClick={renderStockInfo(this.props.stock)}
                className={`stock${
                    type ?
                        (type === "sell" ? ' stock_color_red' : ' stock_color_green')
                        :
                        ""
                }`}>
                <div className="stock__img-container">
                    <img className="stock__img" src={profile.image} alt={symbol}/>
                </div>
                <div className="stock__content-box">
                    <div className="stock__row stock__top">
                        <span className="stock__title">{profile.companyName}</span>
                        <span className="stock__price">{profile.price}$</span>
                        <span className="stock__changes">{profile.changes}</span>
                        <span className="stock__percentage">{profile.changesPercentage}</span>
                    </div>
                    <div className="stock__row stock__bottom">
                        {trueDate && <span className="stock__date">{trueDate.toLocaleString("ru", dateOptions)}</span>}
                        {count && <span className="stock__count">{count} item(s)</span>}
                    </div>
                </div>

            </div>
        )


    }
}

export default Stock;
