import { createContext, useEffect, useMemo, useReducer } from 'react' 
import ThemeReducer from './ThemeReducer';

const CustomThemeContext = createContext();

const INITIAL_STATE = {
    currentTheme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
}

export const CustomThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ThemeReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem('theme', state.currentTheme)
        console.log('theme', state.currentTheme)
    }, [state.currentTheme])

    const MemoizedValue = useMemo (
        () => ({
            currentTheme: state.currentTheme,
        }),
        [state.currentTheme]
    )

    return <CustomThemeContext.Provider value={{ ...MemoizedValue, dispatch }}>{children}</CustomThemeContext.Provider>
}

export default CustomThemeContext;