import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import ReactGA from 'react-ga4';

const clerk_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const measurementId = import.meta.env.VITE_API_MESUREMENT_ID;

if(!clerk_key){
  throw new Error('Missing Clerk Key');
}

ReactGA.initialize(measurementId);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerk_key} afterSignOutUrl="/">
      <App />
      <Toaster/>
    </ClerkProvider>
  </StrictMode>,
);
