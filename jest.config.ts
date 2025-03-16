import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', 
  testEnvironment: 'jsdom', 
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', 
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'], 
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', 
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
  },
};

export default config;