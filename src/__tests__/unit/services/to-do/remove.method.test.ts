import RemoveToDoDTO from "@dto/remove-to-do.dto";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { ToDoService } from "@services/to-do.service";

jest.mock("@my-rdb/repositories/to-do.repository");
const mockedToDoRepository = jest.mocked(ToDoRepository);

describe(`[ToDo service] remove method test :)`, () => {
  const toDoService = new ToDoService();
  const id = 1;

  it(`should be error by modifyContent method of toDoRepository.`, async () => {
    // given
    const error = new Error("Remove error..");
    mockedToDoRepository.remove.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await toDoService.remove(id);
    }).rejects.toThrow(error);
  });

  it(`should be return todo array.`, async () => {
    // given
    const dto = new RemoveToDoDTO(id);
    mockedToDoRepository.remove.mockResolvedValue(true);

    // when
    const result = await toDoService.remove(id);

    // then
    expect(result).toEqual(dto);
  });
});
