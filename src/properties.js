export const LIVE_MAIN_API_URL = process.env.REACT_APP_API_URL;
export const IMAGE_PATH = process.env.REACT_APP_IMAGEKIT_URL;

export const BASE_API_URL = `${LIVE_MAIN_API_URL}`;

export const apis = {
  ADMIN_LOGIN: `${BASE_API_URL}api/v1/admin/login`,

  FILE_UPLOAD: `${BASE_API_URL}api/file-upload`,
  FILE_DELETE: `${BASE_API_URL}api/file-delete`,
  CKEDITOR_UPLOAD: `${BASE_API_URL}api/ckeditor-upload`,

  GEMSTONE_SHAPE: `/api/v1/categories/gemstone-shapes`,
  GEMSTONE_TYPE: `/api/v1/categories/gemstone-types`,
  GEMSTONE_TREATMENT: `/api/v1/categories/gemstone-treatments`,
  GEMSTONE_ORIGIN: `/api/v1/categories/gemstone-origins`,
  GEMSTONE_COLOR: `/api/v1/categories/gemstone-colors`,
  GEMSTONE_CERTIFICATION: `/api/v1/categories/gemstone-certificates`,
  RING_SIZE: `/api/v1/categories/ring-sizes`,
  RING_METAL: `/api/v1/categories/ring-metals`,

  GEMSTONE: `api/v1/gemstone`,
};

export const ckeditorConfig = {
  toolbar: [
    "heading",
    "|",
    "fontColor",
    "fontBackgroundColor",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
    "|",
    "insertTable",
    "mediaEmbed",
    "|",
    "undo",
    "redo",
    "|",
    "imageUpload",
    "imageStyle:full",
    "imageStyle:side",
    "|",
    "code",
    "CodeBlock",
    "|",
  ],
};
