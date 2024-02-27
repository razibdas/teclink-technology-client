import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import AuthProvider from './provider/AuthProvider';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ChakraProvider, theme } from '@chakra-ui/react';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <div className=''>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
)
