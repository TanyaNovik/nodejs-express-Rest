declare global{
  namespace NodeJS{
    interface ProcessEnv{
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      JWT_SECRET_KEY: string;
      MONGO_CONNECTION_STRING: string;
      AUTH_MODE:'true'|'false';
    }
  }
}
export{};