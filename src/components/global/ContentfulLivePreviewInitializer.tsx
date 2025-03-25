'use client';

import { useEffect } from 'react';
import { ContentfulLivePreview } from '@contentful/live-preview';

/**
 * Client component that initializes the Contentful Live Preview SDK
 * This ensures the SDK is initialized before any components try to use it
 */
export function ContentfulLivePreviewInitializer() {
  useEffect(() => {
    // Only initialize on the client side
    if (typeof window !== 'undefined') {
      try {
        // Check if already initialized to avoid duplicate initialization
        if (!ContentfulLivePreview.initialized) {
          console.log('Initializing Contentful Live Preview SDK');
          
          // Use an async IIFE to avoid unbound method issues
          void (async () => {
            try {
              await ContentfulLivePreview.init({
                locale: 'en-US',
                enableInspectorMode: true,
                enableLiveUpdates: true,
                debugMode: true
              });
              console.log('Contentful Live Preview SDK initialized successfully');
            } catch (error) {
              console.error('Failed to initialize Contentful Live Preview SDK:', error);
            }
          })();
        } else {
          console.log('Contentful Live Preview SDK already initialized');
        }
      } catch (error) {
        console.error('Failed to initialize Contentful Live Preview SDK:', error);
      }
    }
  }, []);

  // This component doesn't render anything
  return null;
}

export default ContentfulLivePreviewInitializer;
