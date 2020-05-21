import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Layout />, document.body);

serviceWorker.unregister()