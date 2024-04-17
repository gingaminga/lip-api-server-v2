import ToDo from "@my-rdb/entities/to-do.entity";
import User from "@my-rdb/entities/user.entity";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { ToDoService } from "@services/to-do.service";

jest.mock("@my-rdb/repositories/to-do.repository");
const mockedToDoRepository = jest.mocked(ToDoRepository);

describe(`[ToDo service] add method test :)`, () => {
  const toDoService = new ToDoService(mockedToDoRepository);
  const content = "test";
  const date = "20240101";
  const mockedUser = new User();
  mockedUser.id = 1;
  mockedUser.email = "test@test.com";
  mockedUser.nickname = "test";
  mockedUser.createdAt = new Date();
  mockedUser.socialKey = "test-1234";
  mockedUser.socialType = "kakao";

  it(`should be error by save method of toDoRepository.`, async () => {
    // given
    const error = new Error("Save error..");
    mockedToDoRepository.save.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await toDoService.add(content, date, mockedUser);
    }).rejects.toThrow(error);
  });

  it(`should be return new todo.`, async () => {
    // given
    const toDo = new ToDo();
    toDo.content = content;
    toDo.date = date;
    toDo.createdAt = new Date();
    mockedToDoRepository.save.mockResolvedValue(toDo);

    // when
    const newToDo = await toDoService.add(content, date, mockedUser);

    // then
    expect(newToDo.toDoInfo).toEqual(toDo);
  });
});
