import React from 'react';
import ReactDOM from 'react-dom';
import ReactJSXRuntime from 'react/jsx-runtime';

global.React = React;
global.ReactDOM = ReactDOM;
global.ReactJSXRuntime = ReactJSXRuntime;

if (!global.process) {
  global.process = { env: { NODE_ENV: 'production' } };
}

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}