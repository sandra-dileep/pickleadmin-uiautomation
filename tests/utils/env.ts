import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing env var "${name}". Copy .env.example to .env and fill in real values.`
    );
  }
  return value;
}

export const env = {
  baseURL: required('BASE_URL'),
  username: required('LOGIN_USERNAME'),
  password: required('LOGIN_PASSWORD'),
};
