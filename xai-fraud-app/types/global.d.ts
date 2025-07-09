declare module 'html2canvas';
declare module 'jspdf';

// NodeJS process types fallback (for editor that fails to pick up @types/node)
declare var process: {
  env: Record<string, string | undefined>;
};