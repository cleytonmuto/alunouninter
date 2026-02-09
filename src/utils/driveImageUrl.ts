/**
 * Rewrites Google Drive image URLs in HTML so they load in <img> tags.
 *
 * Since ~Jan 2024, the classic "uc?export=view" URL returns 403 when used as
 * img src (third-party cookie changes). The thumbnail API URL still works for
 * embedding and is used here so existing post content with Drive links displays.
 *
 * Supported patterns:
 * - https://drive.google.com/uc?export=view&id=FILE_ID
 * - https://drive.google.com/uc?export=view&id=FILE_ID&other=params
 * - https://drive.google.com/file/d/FILE_ID/view (less common in img src)
 */

const DRIVE_UC_PATTERN =
  /https:\/\/drive\.google\.com\/uc\?export=view&id=([a-zA-Z0-9_-]+)/g;
const DRIVE_FILE_VIEW_PATTERN =
  /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/g;

const THUMBNAIL_BASE = 'https://drive.google.com/thumbnail?id=';
const THUMBNAIL_SIZE = '&sz=w1920'; // width 1920; good for in-content images

/**
 * Rewrites Google Drive image URLs in HTML to the thumbnail API format
 * so they load when used in <img src="...">.
 */
export function rewriteGoogleDriveUrlsInHtml(html: string): string {
  if (!html || typeof html !== 'string') return html;

  return html
    .replace(DRIVE_UC_PATTERN, (_match, id) => `${THUMBNAIL_BASE}${id}${THUMBNAIL_SIZE}`)
    .replace(DRIVE_FILE_VIEW_PATTERN, (_match, id) => `${THUMBNAIL_BASE}${id}${THUMBNAIL_SIZE}`);
}
