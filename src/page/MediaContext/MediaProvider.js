import { createContext } from "react";
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from "@mui/system";


const MediaQueryContext = createContext();

export const MediaProvider = ({ children }) => {
    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    return <MediaQueryContext.Provider value={{isDesktop}}>{children}</MediaQueryContext.Provider>
}

export default MediaQueryContext