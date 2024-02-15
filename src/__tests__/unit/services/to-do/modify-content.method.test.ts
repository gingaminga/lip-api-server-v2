import ToDo from "@my-rdb/entities/to-do.entity";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { ToDoService } from "@services/to-do.service";

jest.mock("@my-rdb/repositories/to-do.repository");
const mockedToDoRepository = jest.mocked(ToDoRepository);

describe(`[ToDo service] modifyContent method test :)`, () => {
  const toDoService = new ToDoService(mockedToDoRepository);
  const id = 1;
  const content = "new content";

  it(`should be error by modifyContent method of toDoRepository.`, async () => {
    // given
    const error = new Error("Modify content error..");
    mockedToDoRepository.modifyContent.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await toDoService.modifyContent(id, content);
    }).rejects.toThrow(error);
    expect(mockedToDoRepository.findOneByOrFail).not.toHaveBeenCalled();
  });

  it(`should be error by findOneByOrFail method of toDoRepository.`, async () => {
    // given
    mockedToDoRepository.modifyContent.mockResolvedValue(true);

    const error = new Error("Find error..");
    mockedToDoRepository.findOneByOrFail.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await toDoService.modifyContent(id, content);
    }).rejects.toThrow(error);
  });

  it(`should be return todo array.`, async () => {
    // given
    const toDo = new ToDo();
    toDo.content = content;
    toDo.id = id;
    mockedToDoRepository.modifyContent.mockResolvedValue(true);
    mockedToDoRepository.findOneByOrFail.mockResolvedValue(toDo);

    // when
    const newToDo = await toDoService.modifyContent(id, content);

    // then
    expect(newToDo).toEqual(toDo);
  });
});
