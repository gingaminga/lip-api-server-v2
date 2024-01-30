import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { ToDoService } from "@services/to-do.service";

jest.mock("@my-rdb/repositories/to-do.repository");
const mockedToDoRepository = jest.mocked(ToDoRepository);

describe(`[ToDo service] getAll method test :)`, () => {
  const toDoService = new ToDoService();

  it(`should be error by find method of toDoRepository.`, async () => {
    // given
    const error = new Error("Find error..");
    mockedToDoRepository.find.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await toDoService.getAll();
    }).rejects.toThrow(error);
  });

  it(`should be return todo array.`, async () => {
    // given
    mockedToDoRepository.find.mockResolvedValue([]);

    // when
    const todos = await toDoService.getAll();

    // then
    expect(todos).toEqual([]);
  });
});
