import React from 'react'
import { SocketProvider } from './context/SocketContext.js'
import { UIProvider } from './context/UIContext.jsx'

import { RouterPage } from './pages/RouterPage.jsx'

export const TicketApp = () => {
    return (
        <SocketProvider>
            <UIProvider>
                <RouterPage />
            </UIProvider>
        </SocketProvider>
    )
}
