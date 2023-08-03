import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {createTheme} from '@mui/material/styles';
import {useSessionContext} from "../../providers/SessionProvider";
import {Card, CardContent} from "@mui/material";
import Lottie, {LottieRef} from "lottie-react";
import moneyBackground from './../../../assets/animations/money-background2.json'
import {useEffect, useRef} from "react";
import Typography from "@mui/material/Typography";
import {FormProvider} from "../../providers/FormProvider";
import {RegisterDTO} from "../../validators/RegisterUserDTO";
import RegistrationProvider, {useRegistrationContext} from "../../providers/RegistrationProvider";
import ControlledTextField from "../../components/ControlledTextField";
import ControlledSubmitButton from "../../components/ControlledSubmitButton";


const theme = createTheme();

export default function RegisterScreen() {
    return (
        <FormProvider validationSchema={RegisterDTO}>

            <RegistrationProvider>
                <RegisterScreenContent/>
            </RegistrationProvider>
        </FormProvider>

    )
}

export function RegisterScreenContent() {
    const registerContext = useRegistrationContext();
    const sessionContext = useSessionContext();
    const lottieRef: LottieRef = useRef();
    const lottieRef2: LottieRef = useRef();
    const lottieRef3: LottieRef = useRef();

    useEffect(() => {
        lottieRef.current.setSpeed(0.5);
        lottieRef2.current.setSpeed(0.5);
        lottieRef3.current.setSpeed(0.5);
    }, [])

    const handleSubmit = async (data: RegisterDTO) => {
        // console.log("HANDLE SUBMIT", data)
        await registerContext.registerUser(data);
        await sessionContext.login(data.email, data.password);
    };

    return (
        <Box sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: "100vh",
            background: 'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))',
            backgroundColor: theme.palette.primary.dark /*this your primary color*/
        }}>
            <Lottie autoplay={true} lottieRef={lottieRef}
                    style={{position: 'absolute', left: -20, height: '100%', width: '40%'}}
                    animationData={moneyBackground} loop={true}/>
            <Lottie autoplay={true} lottieRef={lottieRef2} style={{position: 'absolute', height: '100%', width: '40%'}}
                    animationData={moneyBackground} loop={true}/>
            <Lottie autoplay={true} lottieRef={lottieRef3}
                    style={{position: 'absolute', right: -20, height: '100%', width: '40%'}}
                    animationData={moneyBackground} loop={true}/>
            <Card style={{width: '40em', height: '35em'}}>
                <CardContent>

                    <Box sx={{mt: 1, margin: 5}}>
                        <Typography variant={'h4'}>Sign in</Typography>

                        <Box style={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: 10
                        }}>
                            <ControlledTextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Primeiro nome"
                                name="name"
                                type={"text"}
                                autoComplete="name"
                                autoFocus
                            />
                            <ControlledTextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Ultimo nome"
                                name="lastName"
                                type={"text"}
                                autoComplete="name"
                                autoFocus
                            />
                        </Box>
                        <ControlledTextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email"
                            type="email"
                            id="email"
                            autoComplete="current-password"
                        />
                        <ControlledTextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <ControlledTextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirmar senha"
                            type="password"
                            id="confirmPassword"
                            autoComplete="current-password"
                        />
                        <ControlledSubmitButton
                            fullWidth
                            variant="contained"
                            onSubmit={(data) => handleSubmit(data)}
                            sx={{mt: 3, mb: 2}}
                        >
                            Cadastrar
                        </ControlledSubmitButton>
                        <Grid container>
                            <Grid item>
                                <Button href="/login">
                                    {"Já possui uma conta? Ir para o Login"}
                                </Button>
                            </Grid>
                        </Grid>
                        {/*<Copyright sx={{ mt: 5 }} />*/}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
