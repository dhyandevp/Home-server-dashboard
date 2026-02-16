import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  fileRoot: process.env.FILE_MANAGER_ROOT ?? '/workspace',
  dockerSocketPath: process.env.DOCKER_SOCKET_PATH ?? '/var/run/docker.sock'
};
