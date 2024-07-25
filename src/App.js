import React from 'react';
import Router from './route';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    )
}