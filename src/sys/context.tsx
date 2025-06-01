import React from 'react';
import { Provider } from "@/components/ui/provider"
import {MathJaxContext} from 'better-react-mathjax';

interface AppContextProps {
    children: React.ReactNode

}

export default function AppContext({children}: AppContextProps) {
    return (
        //@ts-ignore
        <Provider>
            <MathJaxContext>
                {children}    
            </MathJaxContext>
        </Provider>
    )
}