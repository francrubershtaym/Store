import { createRoot } from 'react-dom/client';
import App from './App';
import './sass/main.scss';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <LanguageProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </LanguageProvider>
    </ThemeProvider>
)
