import angular from 'angular';

export const EventEmitterModule = angular
  .module('event.emitter.module', [])
  .value('EventEmitter', payload => ({ $event: payload }))
  .name;
