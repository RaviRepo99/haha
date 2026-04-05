/**
 * Preload a page component for better perceived performance
 * Use on hover/focus for anticipated navigation
 */
export function preloadPage(pageName: string) {
  switch (pageName) {
    case 'team':
      import('../pages/TeamPage');
      break;
    case 'events':
      import('../pages/EventsPage');
      break;
    case 'join':
      import('../pages/JoinClubPage');
      break;
    case 'ai-registration':
      import('../pages/AIRegistrationPage');
      break;
    default:
      break;
  }
}

/**
 * Preload an image for better performance
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Batch multiple state updates in a single render
 */
export function batchUpdates<T>(callback: () => T): T {
  return callback();
}
