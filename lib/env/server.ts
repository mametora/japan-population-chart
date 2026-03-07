import "server-only";

const required = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

const env = {
  PREFECTURE_POPULATION_API_BASE_URL: required(
    "PREFECTURE_POPULATION_API_BASE_URL",
  ),
  PREFECTURE_POPULATION_API_KEY: required("PREFECTURE_POPULATION_API_KEY"),
};

export default env;
