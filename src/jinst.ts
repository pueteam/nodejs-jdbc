import { EventEmitter } from 'node:events';
import * as java from 'java';
import { logger } from './Helper';

export function isJvmCreated() {
  return typeof java.onJvmCreated !== 'function';
}

export function addOption(option) {
  if (!isJvmCreated() && option) {
    java.asyncOptions = {
      asyncSuffix: undefined, // Don't generate node-style methods taking callbacks
      syncSuffix: 'Sync', // Sync methods use the base name(!!)
      promiseSuffix: 'Promise', // Generate methods returning promises, using the suffix Promise.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      promisify: require('util').promisify, // Needs Node.js version 8 or greater, see comment below
    };
    java.options.push(option);
  } else if (isJvmCreated()) {
    logger.error("You've tried to add an option to an already running JVM!");
    logger.error(
      "This isn't currently supported.  Please add all option entries before calling any java methods",
    );
    logger.error(
      'You can test for a running JVM with the isJvmCreated funtion.',
    );
  }
}

export function setupClasspath(dependencyArr) {
  if (!isJvmCreated() && dependencyArr) {
    java.classpath.push(...dependencyArr);
  } else if (isJvmCreated()) {
    logger.error(
      "You've tried to add an entry to the classpath of an already running JVM!",
    );
    logger.error(
      "This isn't currently supported.  Please add all classpath entries before calling any java methods",
    );
    logger.error(
      'You can test for a running JVM with the isJvmCreated funtion.',
    );
  }
}

export async function shutdownJVM() {
  await java.callStaticMethodSync('java.lang.System', 'exit', 0);
}

export function getInstance() {
  return java;
}

export function getClasspath() {
  return java.classpath;
}

export function getOptions() {
  return java.options;
}

export function getOnJvmCreated() {
  return java.onJvmCreated;
}

export const events = new EventEmitter();
