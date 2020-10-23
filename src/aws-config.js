const config = {
  "aws_project_region": process.env.REACT_APP_PROJECT_REGION,
  "aws_cognito_region": process.env.REACT_APP_COGNITO_REGION,
  "aws_user_pools_id": process.env.REACT_APP_USER_POOLS_ID,
  "aws_user_pools_web_client_id": process.env.REACT_APP_USER_POOLS_WEB_CLIENT_ID,
  "federationTarget": process.env.REACT_APP_FEDERATION_TARGET
};

export default config;