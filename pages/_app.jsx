import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactJSXRuntime from 'react/jsx-runtime';

global.React = React;
global.ReactDOM = ReactDOM;
global.ReactJSXRuntime = ReactJSXRuntime;

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}