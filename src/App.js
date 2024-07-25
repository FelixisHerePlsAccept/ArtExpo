import React from 'react';
import Router from './route';
import { BrowserRouter } from 'react-router-dom';
import FixedButton from './page/FixedButton';

export default function App() {
    return (
        <BrowserRouter>
            <Router />
            <FixedButton />
        </BrowserRouter>
    )
}