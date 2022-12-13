import { NavigationContainer } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";

export function Routes(){
    const [ loading, setLoading ] = useState(true);
    const [ user, setUser ] = useState<FirebaseAuthTypes.User>();

    useEffect(() => {
        const subscriber = auth()
            .onAuthStateChanged(response => { 
            setUser(response);
            setLoading(false);
        });

        return subscriber;
    },[]);

    if(loading) {
        return <Loading />
    }


    return(
        <NavigationContainer>
            {user ? <AppRoutes/> : <SignIn />}
        </NavigationContainer>
    )
}