import React from 'react';
import ReactDOM from 'react-dom';

global.React = React;
global.ReactDOM = ReactDOM;

if (!global.process) {
  global.process = { env: { NODE_ENV: 'production' } };
}

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}