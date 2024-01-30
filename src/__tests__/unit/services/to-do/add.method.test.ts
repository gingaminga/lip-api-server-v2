import ToDo from "@my-rdb/entities/to-do.entity";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { ToDoService } from "@services/to-do.service";

jest.mock("@my-rdb/repositories/to-do.repository");
const mockedToDoRepository = jest.mocked(ToDoRepository);

describe(`[ToDo service] add method test :)`, () => {
  const toDoService = new ToDoService();
  const content = "test";
  const date = "20240101";

  it(`should be error by save method of toDoRepository.`, async () => {
    // given
    const error = new Error("Save error..");
    mockedToDoRepository.save.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await toDoService.add(content, date);
    }).rejects.toThrow(error);
  });

  it(`should be return new todo.`, async () => {
    // given
    const toDo = new ToDo();
    toDo.content = content;
    toDo.date = date;
    mockedToDoRepository.save.mockResolvedValue(toDo);

    // when
    const newToDo = await toDoService.add(content, date);

    // then
    expect(newToDo).toEqual(toDo);
  });
});
