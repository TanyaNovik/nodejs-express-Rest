declare global{
  namespace NodeJS{
    interface ProcessEnv{
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      JWT_SECRET_KEY: string;
      MONGO_CONNECTION_STRING: string;
      AUTH_MODE:'true'|'false';
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      POSTGRES_PORT: number;
      POSTGRES_HOST: string;
    }
  }
}
export{};