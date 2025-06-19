/**
 * Type representing an item in a lightbox.
 *
 * It can either be an object with properties `src`, `alt`, and `caption` or a `string` representing the source of the image.
 */
export type LightboxItem =
  | {
      /** The image source URL */
      src: string;
      /** Optional alternative text for the image */
      alt?: string;
      /** Optional caption for the image */
      caption?: string;
    }
  | string;
