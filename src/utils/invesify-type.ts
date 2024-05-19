const INVERSIFY_TYPES = {
  AuthService: Symbol.for("AuthService"),
  RedisClient: Symbol.for("RedisClient"),
  RoutineCycleDaysRepository: Symbol.for("RoutineCycleDaysRepository"),
  RoutineCycleEveryRepository: Symbol.for("RoutineCycleEveryRepository"),
  RoutineRepository: Symbol.for("RoutineRepository"),
  RoutineService: Symbol.for("RoutineService"),
  ToDoRepository: Symbol.for("ToDoRepository"),
  ToDoService: Symbol.for("ToDoService"),
  UserRepository: Symbol.for("UserRepository"),
};

export default INVERSIFY_TYPES;
