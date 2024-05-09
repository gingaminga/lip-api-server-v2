import User from "@my-rdb/entities/user.entity";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { ToDoService } from "@services/to-do.service";

jest.mock("@my-rdb/repositories/to-do.repository");
const mockedToDoRepository = jest.mocked(ToDoRepository);

describe(`[ToDo service] get method test :)`, () => {
  const toDoService = new ToDoService(mockedToDoRepository);
  const startDate = "2024-04-01";
  const endDate = "2024-04-10";
  const mockedUser = new User();
  mockedUser.id = 1;
  mockedUser.email = "test@test.com";
  mockedUser.nickname = "test";
  mockedUser.createdAt = new Date();
  mockedUser.socialKey = "test-1234";
  mockedUser.socialType = "kakao";

  it(`should be error by getToDo method of toDoRepository.`, async () => {
    // given
    const error = new Error("Find error..");
    mockedToDoRepository.getToDo.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await toDoService.get(startDate, endDate, mockedUser);
    }).rejects.toThrow(error);
  });

  it(`should be return todo array.`, async () => {
    // given
    mockedToDoRepository.getToDo.mockResolvedValue([]);

    // when
    const dto = await toDoService.get(startDate, endDate, mockedUser);

    // then
    expect(dto.toDos).toEqual([]);
  });
});
