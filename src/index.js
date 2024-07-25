import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './page/AuthGuard/AuthProvider';
import './index.css';
import { CustomThemeProvider } from './page/ThemeContext/ThemeProvider';
import { MediaProvider } from './page/MediaContext/MediaProvider';

const root =  ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <MediaProvider>
                <CustomThemeProvider>
                    <App />
                </CustomThemeProvider>
            </MediaProvider>        
        </AuthProvider>
    </React.StrictMode>
)