import ToDo from "@my-rdb/entities/to-do.entity";
import User from "@my-rdb/entities/user.entity";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { ToDoService } from "@services/to-do.service";

jest.mock("@my-rdb/repositories/to-do.repository");
const mockedToDoRepository = jest.mocked(ToDoRepository);

describe(`[ToDo service] yn method test :)`, () => {
  const toDoService = new ToDoService(mockedToDoRepository);
  const id = 1;
  const isChecked = true;
  const mockedUser = new User();
  mockedUser.id = 1;
  mockedUser.email = "test@test.com";
  mockedUser.nickname = "test";
  mockedUser.createdAt = new Date();
  mockedUser.socialKey = "test-1234";
  mockedUser.socialType = "kakao";

  it(`should be error by yn method of toDoRepository.`, async () => {
    // given
    const error = new Error("Change checked error..");
    mockedToDoRepository.modifyChecked.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await toDoService.yn(id, isChecked, mockedUser);
    }).rejects.toThrow(error);
    expect(mockedToDoRepository.findOneByOrFail).not.toHaveBeenCalled();
  });

  it(`should be error by findOneByOrFail method of toDoRepository.`, async () => {
    // given
    mockedToDoRepository.modifyChecked.mockResolvedValue(true);

    const error = new Error("Find error..");
    mockedToDoRepository.findOneByOrFail.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await toDoService.yn(id, isChecked, mockedUser);
    }).rejects.toThrow(error);
  });

  it(`should be return todo.`, async () => {
    // given
    const toDo = new ToDo();
    toDo.checked = isChecked ? "Y" : "N";
    toDo.id = id;
    mockedToDoRepository.modifyChecked.mockResolvedValue(true);
    mockedToDoRepository.findOneByOrFail.mockResolvedValue(toDo);

    // when
    const newToDo = await toDoService.yn(id, isChecked, mockedUser);

    // then
    expect(newToDo.toDoInfo).toEqual(toDo);
  });
});
