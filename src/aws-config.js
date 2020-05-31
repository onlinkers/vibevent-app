// Figure out if in production
const isProduction = process.env.NODE_ENV === "production" ? true : false;

// Determine variables that depend on app stage
const COGNITO_POOLS_ID = (isProduction && process.env.REACT_APP_USER_POOLS_ID_PROD) // if "production" stage and exists
  || process.env.REACT_APP_USER_POOLS_ID; // fallback (or if not "production")

const COGNITO_WEB_CLIENT_ID = (isProduction && process.env.REACT_APP_USER_POOLS_WEB_CLIENT_ID_PROD) // if "production" stage and exists
  || process.env.REACT_APP_USER_POOLS_WEB_CLIENT_ID; // fallback (or if not "production")

const config = {
  "aws_project_region": process.env.REACT_APP_PROJECT_REGION,
  "aws_cognito_region": process.env.REACT_APP_COGNITO_REGION,
  "aws_user_pools_id": COGNITO_POOLS_ID,
  "aws_user_pools_web_client_id": COGNITO_WEB_CLIENT_ID,
  "federationTarget": process.env.REACT_APP_FEDERATION_TARGET
};

export default config;