import { HomeIcon as HomeSolid , PhotoIcon } from "@heroicons/react/20/solid";
import { HomeIcon as HomeOutline } from "@heroicons/react/24/outline";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { PATH_MAIN } from "../../route/paths";

export const UserNav =({role ,focus, isDesktop}) => {
    
    let iconStyle

    if(isDesktop){
        iconStyle = {
            width: '3rem',
            height: '3rem'
        }    
    } else {
        iconStyle = {
            width: '1.5rem',
            height: '1.5rem'
        }
    }
    

    const menuItems = [
        {
            role: 'user' , //visitor or guest can access this navmenu
            children : [
                {
                    title: 'Home',
                    icon: focus === PATH_MAIN.HOME ?  <HomeSolid style={iconStyle} /> : <HomeOutline style={iconStyle} />,
                    path: PATH_MAIN.HOME,
                },
            ]
        },
        {
            role: 'user' , //visitor or guest can access this navmenu
            children : [
                {
                    title: 'Home',
                    icon: focus === PATH_MAIN.HOME ?  <HomeSolid style={iconStyle} /> : <HomeOutline style={iconStyle} />,
                    path: PATH_MAIN.HOME,
                },
            ]
        },
        {
            role: 'user' , //visitor or guest can access this navmenu
            children : [
                {
                    title: 'Home',
                    icon: focus === PATH_MAIN.HOME ?  <HomeSolid style={iconStyle} /> : <HomeOutline style={iconStyle} />,
                    path: PATH_MAIN.HOME,
                },
            ]
        },
        {
            role: 'admin' , // what admin will see
            children : [
                {
                    title: 'Home',
                    icon: focus === PATH_MAIN.HOME ?  <HomeSolid style={iconStyle} /> : <HomeOutline style={iconStyle} />,
                    path: PATH_MAIN.HOME,
                },
            ]
        }
    ]

    const filteredMenu = menuItems
    .filter(item => item.role.includes(role))
    .flatMap(item => item.children);

    if(isDesktop){
        return (
            <nav>
                {filteredMenu.map((item, index) => (
                    <Stack direction='column' spacing={2} sx={{display:'flex', justifyContent:'center', alignItems:'center', bgcolor:'red', height:'5rem'}}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    {item.icon}
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display:'flex', justifyContent:'flex-start', alignItems:'center' }}>
                                <NavLink to={item.path} key={index} className="nav-link">    
                                    <Typography variant="h6" >{item.title}</Typography>
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Stack>
                ))}
            </nav>
        )
    }
    
    return (
        <nav>
            {filteredMenu.map((item, index) => (
                <Stack direction='column' spacing={2} sx={{display:'flex', justifyContent:'center', alignItems:'center', bgcolor:'red', height:'5rem'}}>
                    {/* <Grid container>
                        <Grid item xs={12} md={6}>
                            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                {item.icon}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{display:'flex', justifyContent:'flex-start', alignItems:'center' }}>
                            <NavLink to={item.path} key={index} className="nav-link">    
                                <Typography variant="h6" >{item.title}</Typography>
                            </NavLink>
                        </Grid>
                    </Grid> */}
                    <Stack direction='row' sx={{display:'flex', justifyContent:'space-between', alignItems:'center', bgcolor:'purple', width:'70%'}}>
                        <Box>
                            {item.icon}
                        </Box>
                        <NavLink to={item.path} key={index} className="nav-link">    
                            <Typography variant= {isDesktop ? "h6" : 'body1'} >{item.title}</Typography>
                        </NavLink>
                    </Stack>
                </Stack>
            ))}
        </nav>
    )

}