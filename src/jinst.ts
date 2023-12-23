import { EventEmitter } from 'events';
import winston from 'winston';
// import { onJvmCreated, options, classpath, newInstanceSync } from 'java';
import * as java from 'java';

const { error } = winston;

export function isJvmCreated() {
  return typeof java.onJvmCreated !== 'function';
}

export function addOption(option) {
  if (!isJvmCreated() && option) {
    java.options.push(option);
  } else if (isJvmCreated()) {
    error("You've tried to add an option to an already running JVM!");
    error(
      "This isn't currently supported.  Please add all option entries before calling any java methods",
    );
    error('You can test for a running JVM with the isJvmCreated funtion.');
  }
}

export function setupClasspath(dependencyArr) {
  if (!isJvmCreated() && dependencyArr) {
    java.classpath.push(...dependencyArr);
  } else if (isJvmCreated()) {
    error(
      "You've tried to add an entry to the classpath of an already running JVM!",
    );
    error(
      "This isn't currently supported.  Please add all classpath entries before calling any java methods",
    );
    error('You can test for a running JVM with the isJvmCreated funtion.');
  }
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
