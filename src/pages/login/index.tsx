import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {useSessionContext} from "../../providers/SessionProvider";
import {Copyright} from "../../components/templates/Dashboard/Copyright";
import {useRouter} from "next/router";
import login from "../../../assets/animations/login.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });


export default function LoginScreen() {
    const router = useRouter();
    const sessionContext = useSessionContext();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await sessionContext.login(data.get('email') as string, data.get('password') as string)
    };


    const handleRegisterClick = async () => {
        await router.push('/register');
    }

    return (
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))'}}
                    item
                    sm={4}
                    md={7}
                    xs={false}
                >
                    <Lottie style={{width: '100%', height: '100%'}}  animationData={login} loop={true} autoplay={true}/>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Button href="login#" onClick={handleRegisterClick}>
                                        Forgot your password?
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button href="/register" onClick={handleRegisterClick}>
                                        {"Register"}
                                    </Button>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
    );
}
