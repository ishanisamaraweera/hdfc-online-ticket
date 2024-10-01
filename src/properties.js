export const BE_API_URL = "http://localhost:8080"
export const FE_API_URL = "http://localhost:3000"
export const IMAGE_PATH = process.env.REACT_APP_IMAGEKIT_URL;

export const BASE_API_URL = `${BE_API_URL}`;
export const BASE_FE_URL = `${FE_API_URL}`;

export const apis = {
  FUNCTION_DATA: `${BASE_API_URL}/deleteFunction`,
  DELETE_TICKET: `${BASE_API_URL}/deleteTicket`,
  CLOSE_TICKET: `${BASE_API_URL}/closeTicket`,
  CHECK_INITIAL_LOGIN_STATUS: `${BASE_API_URL}/checkInitialLoginStatus`,
  NEW_TICKET_COUNT: `${BASE_API_URL}/getNewTicketCount`,
  ASSIGNED_TICKET_COUNT: `${BASE_API_URL}/getAssignedTicketCount`,
  ACTIVE_TICKET_COUNT: `${BASE_API_URL}/getActiveTicketCount`,
  COMPLETED_TICKET_COUNT: `${BASE_API_URL}/getCompletedTicketCount`,
  CLOSED_TICKET_COUNT: `${BASE_API_URL}/getClosedTicketCount`,
  TOTAL_TICKET_COUNT: `${BASE_API_URL}/getTotalTicketCount`,
  PAGE_PRIVILEGES: `${BASE_API_URL}/getPagePrivileges`,
  FUNCTION_PRIVILEGES: `${BASE_API_URL}/getFunctionPrivileges`,
  CHANGE_PASSWORD: `${BASE_API_URL}/changePassword`,
  GET_STATUSES: `${BASE_API_URL}/getStatuses`,
  GET_ISSUE_TYPES: `${BASE_API_URL}/getIssueTypes`,
  GET_ALL_USER_DETAILS: `${BASE_API_URL}/getAllUserDetails`,
  ADD_ISSUES_CATEGORY: `${BASE_API_URL}/addIssueCategory`,
  DELETE_ISSUE_CATEGORY: `${BASE_API_URL}/deleteIssueCategory`,
  GET_ISSUE_CATEGORY_DETAILS_BY_ID: `${BASE_API_URL}/getIssueCategoryDetailsById`,
  UPDATE_ISSUE_CATEGORY: `${BASE_API_URL}/updateIssueCategory`,
  AUTHENTICATE_USER: `${BASE_API_URL}/authenticateUser`,
  EXPORT_TICKETS: `${BASE_API_URL}/exportTickets`,
  GET_ALL_USER_ROLES: `${BASE_API_URL}/getAllUserRoles`,


  
  ISSUE_CATEGORY: `${BASE_FE_URL}/issue-category`,


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
