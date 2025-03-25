'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import { ContentfulLivePreview } from '@contentful/live-preview';

interface ContentfulPreviewProps {
  children: ReactNode;
  isPreviewMode?: boolean;
}

/**
 * ContentfulPreviewProvider component
 * Wraps the application with the Contentful Live Preview provider
 * Only activates when in preview mode
 */
export function ContentfulPreviewProvider({ 
  children,
  isPreviewMode = false
}: ContentfulPreviewProps) {
  const [isClient, setIsClient] = useState(false);
  const [showStatus, setShowStatus] = useState(true);
  const [liveUpdatesEnabled, setLiveUpdatesEnabled] = useState(false);
  const [inspectorMode, setInspectorMode] = useState(false);
  
  // Check if we're in preview mode by examining URL parameters
  const [isContentfulPreview, setIsContentfulPreview] = useState(false);
  
  // Effect to mark client-side rendering and initialize SDK
  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      // Check for Contentful preview URL parameters
      const url = new URL(window.location.href);
      const hasPreviewParam = url.searchParams.has('preview');
      const hasSpaceId = url.searchParams.has('space_id');
      const hasPreviewToken = url.searchParams.has('preview_access_token');
      
      // Consider it a preview ONLY if it has ALL required parameters
      const isPreview = hasPreviewParam && hasSpaceId && hasPreviewToken;
      setIsContentfulPreview(isPreview);
      
      // Initialize the SDK if in preview mode
      if (!ContentfulLivePreview.initialized) {
        try {
          // Get space ID and preview token from URL
          const spaceId = url.searchParams.get('space_id') ?? process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
          const previewToken = url.searchParams.get('preview_access_token') ?? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN;
          
          // Initialize the SDK with all required parameters
          // Use an async IIFE to avoid unbound method issues
          void (async () => {
            try {
              await ContentfulLivePreview.init({
                locale: 'en-US',
                enableInspectorMode: true,
                enableLiveUpdates: true,
                debugMode: true
              });
              
              // Log the space and token for debugging
              console.log('Using space ID:', spaceId);
              console.log('Preview token available:', !!previewToken);
              
              console.log('ContentfulLivePreview: SDK initialized successfully');
            } catch (error) {
              console.error('ContentfulLivePreview: Failed to initialize SDK', error);
            }
          })();
          
          // Log the space and token for debugging
          console.log('Using space ID:', spaceId);
          console.log('Preview token available:', !!previewToken);
          
          console.log('ContentfulLivePreview: SDK initialized successfully');
        } catch (error) {
          console.error('ContentfulLivePreview: Failed to initialize SDK', error);
        }
      }
    }
  }, []);
  
  // Listen for messages from Contentful
  useEffect(() => {
    if (typeof window === 'undefined' || !isContentfulPreview) return;
    
    // Define a type for the expected message structure
    type ContentfulMessage = {
      from: string;
      type: string;
      liveUpdatesEnabled?: boolean;
      inspectorMode?: boolean;
    };

    const handleMessage = (event: MessageEvent) => {
      // Only process messages with data objects
      if (!event.data || typeof event.data !== 'object') return;
      
      // Type guard to check if the message matches our expected structure
      const isContentfulMessage = (data: unknown): data is ContentfulMessage => {
        return (
          typeof data === 'object' && 
          data !== null &&
          'from' in data && 
          'type' in data
        );
      };
      
      // Check if the message is a valid Contentful message
      if (!isContentfulMessage(event.data)) return;
      
      // Check for Contentful Live Preview messages
      if (event.data.from === 'contentful' && event.data.type === 'status') {
        // Update state based on message
        if (typeof event.data.liveUpdatesEnabled === 'boolean') {
          setLiveUpdatesEnabled(event.data.liveUpdatesEnabled);
        }
        
        if (typeof event.data.inspectorMode === 'boolean') {
          setInspectorMode(event.data.inspectorMode);
        }
      }
    };
    
    // Add event listener for messages
    window.addEventListener('message', handleMessage);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isContentfulPreview]);
  
  // Toggle status visibility
  const toggleStatus = () => {
    setShowStatus(!showStatus);
    
    // Save preference in cookie
    if (typeof document !== 'undefined') {
      document.cookie = `contentful_status_hidden=${showStatus}; path=/; max-age=86400`;
    }
  };
  
  // For non-preview mode, just render the children without the provider
  if (!isPreviewMode && !isContentfulPreview) {
    return <>{children}</>;
  }
  
  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableInspectorMode={true}
      enableLiveUpdates={true}
    >
      {/* Status indicator for preview mode */}
      {isClient && showStatus && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg text-sm border max-w-xs w-full bg-green-100 border-green-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${liveUpdatesEnabled ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="font-medium">
                {liveUpdatesEnabled 
                  ? 'Live Updates: Active' 
                  : 'Live Updates: Connecting...'}
              </span>
            </div>
            <button 
              onClick={toggleStatus}
              className="ml-2 text-gray-500 hover:text-gray-700"
              aria-label="Close status indicator"
            >
              ×
            </button>
          </div>
          
          <div className="mt-2 text-xs">
            <div className="flex items-center">
              <span className="font-medium mr-2">Inspector Mode:</span>
              <span>{inspectorMode ? 'Active' : 'Inactive'}</span>
            </div>
            <div className="mt-1">
              <span className="text-gray-600">
                You are viewing this site in Contentful Preview mode.
              </span>
            </div>
          </div>
        </div>
      )}
      
      {children}
    </ContentfulLivePreviewProvider>
  );
}

export default ContentfulPreviewProvider;
