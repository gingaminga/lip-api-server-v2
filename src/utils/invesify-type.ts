const INVERSIFY_TYPES = {
  AuthService: Symbol.for("AuthService"),
  RedisClient: Symbol.for("RedisClient"),
  ToDoRepository: Symbol.for("ToDoRepository"),
  ToDoService: Symbol.for("ToDoService"),
  UserRepository: Symbol.for("UserRepository"),
};

export default INVERSIFY_TYPES;
