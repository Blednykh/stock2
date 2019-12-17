import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/root/root";

import StocksProvider from "./contexts/stocks-context";

const rootElement = document.querySelector('#root');



ReactDOM.render(
    <StocksProvider>
        <Root/>
    </StocksProvider>

    , rootElement);
