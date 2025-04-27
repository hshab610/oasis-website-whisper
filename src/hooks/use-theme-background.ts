
import { useEffect } from 'react';

export const useThemeBackground = () => {
  useEffect(() => {
    // Apply Nile theme by default
    document.body.classList.add("nile-theme");
    localStorage.setItem("nile-theme-enabled", "true");
    
    // Ensure background image is properly loaded
    const ensureBackgroundVisibility = () => {
      // Apply a direct style to force the background image if needed
      const style = document.createElement('style');
      style.textContent = `
        body::before {
          content: "" !important;
          background-image: url('/lovable-uploads/d9454fb5-aa86-4aeb-88fe-1f48b1375dcc.png') !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          background-size: cover !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          background-attachment: fixed !important;
          opacity: 0.15 !important;
          z-index: -1 !important;
          pointer-events: none !important;
          filter: contrast(1.1) brightness(1.05) !important;
        }
        
        html, body, #root {
          background: transparent !important;
        }
        
        main, .content-visibility-auto {
          background: transparent !important;
        }
        
        /* Add Nile wave animation */
        .nile-wave {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 15vh;
          background: linear-gradient(to top, rgba(0, 119, 145, 0.15), transparent);
          z-index: -1;
          animation: nileWave 15s infinite ease-in-out;
        }
        
        @keyframes nileWave {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        
        /* Fix mobile layout issues */
        @media (max-width: 640px) {
          body {
            overflow-x: hidden;
          }
          
          .container {
            width: 90% !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `;
      document.head.appendChild(style);
      
      // Add the wave element to the DOM
      if (!document.querySelector('.nile-wave')) {
        const waveElement = document.createElement('div');
        waveElement.className = 'nile-wave';
        document.body.appendChild(waveElement);
      }
      
      // Remove any potential background color blockers
      document.querySelectorAll('main, div, section').forEach(el => {
        const element = el as HTMLElement;
        
        // Skip elements that need background (like cards, etc)
        if (element.classList.contains('card') || 
            element.classList.contains('nile-card') || 
            element.classList.contains('content-overlay') ||
            element.classList.contains('bg-white') ||
            element.classList.contains('content-card')) {
          return;
        }
        
        // Check if the element has a non-transparent background
        if (window.getComputedStyle(element).backgroundColor !== 'transparent' &&
            window.getComputedStyle(element).backgroundColor !== 'rgba(0, 0, 0, 0)') {
          element.style.backgroundColor = 'transparent';
        }
      });
    };
    
    // Run immediately and after short delays to catch any elements that might load later
    ensureBackgroundVisibility();
    setTimeout(ensureBackgroundVisibility, 500);
    setTimeout(ensureBackgroundVisibility, 1500);
    
    // Add interval to ensure background stays visible even after dynamic content loads
    const interval = setInterval(ensureBackgroundVisibility, 5000);
    return () => clearInterval(interval);
    
  }, []);
};
