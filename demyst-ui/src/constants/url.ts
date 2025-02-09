const ENV = process.env.REACT_APP_ENV ? process.env.REACT_APP_ENV : "local"
const urls = { local: "http://localhost:5000" }

export const API_URL = urls[ENV]