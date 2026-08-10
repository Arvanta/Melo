// Desktop (Tauri) builds read audio metadata natively via Rust (lofty).
// This stub replaces music-metadata-browser in desktop bundles to keep them
// lean and free of the file-type eval warning.
export async function parseBlob(): Promise<any> { throw new Error("metadata handled by native layer"); }
export async function parseBuffer(): Promise<any> { throw new Error("metadata handled by native layer"); }
export default { parseBlob, parseBuffer };
