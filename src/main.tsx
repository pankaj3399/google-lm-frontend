// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';

const clerk_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if(!clerk_key){
  throw new Error('Missing Clerk Key');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerk_key}>
      <App />
      <Toaster/>
    </ClerkProvider>
    
  </StrictMode>,
);
