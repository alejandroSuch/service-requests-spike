import { EventEmitterModule } from "./event-emitter.module";

describe('Value: EventEmitter', function () {
  let eventEmitter = null;

  beforeEach(angular.mock.module(EventEmitterModule));
  beforeEach(inject(_EventEmitter_ => {
    eventEmitter = _EventEmitter_;
  }));

  it('Creates an $event object', function () {
    let event = eventEmitter(1);
    expect(event).toEqual({ $event: 1 });
  });
});