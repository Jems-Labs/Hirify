const isBackendDeployed = false;

export const BACKEND_URL = isBackendDeployed 
  ? "" 
  : "http://localhost:8787";