import ToDo from "@my-rdb/entities/to-do.entity";
import User from "@my-rdb/entities/user.entity";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { ToDoService } from "@services/to-do.service";

jest.mock("@my-rdb/repositories/to-do.repository");
const mockedToDoRepository = jest.mocked(ToDoRepository);

describe(`[ToDo service] modifyMemo method test :)`, () => {
  const toDoService = new ToDoService(mockedToDoRepository);
  const id = 1;
  const memo = "new memo";
  const mockedUser = new User();
  mockedUser.id = 1;
  mockedUser.email = "test@test.com";
  mockedUser.nickname = "test";
  mockedUser.createdAt = new Date();
  mockedUser.socialKey = "test-1234";
  mockedUser.socialType = "kakao";

  it(`should be error by modifyMemo method of toDoRepository.`, async () => {
    // given
    const error = new Error("Modify content error..");
    mockedToDoRepository.modifyMemo.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await toDoService.modifyMemo(id, memo, mockedUser);
    }).rejects.toThrow(error);
    expect(mockedToDoRepository.findOneByOrFail).not.toHaveBeenCalled();
  });

  it(`should be error by findOneByOrFail method of toDoRepository.`, async () => {
    // given
    mockedToDoRepository.modifyMemo.mockResolvedValue(true);

    const error = new Error("Find error..");
    mockedToDoRepository.findOneByOrFail.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await toDoService.modifyMemo(id, memo, mockedUser);
    }).rejects.toThrow(error);
  });

  it(`should be return todo array.`, async () => {
    // given
    const toDo = new ToDo();
    toDo.memo = memo;
    toDo.id = id;
    mockedToDoRepository.modifyMemo.mockResolvedValue(true);
    mockedToDoRepository.findOneByOrFail.mockResolvedValue(toDo);

    // when
    const newToDo = await toDoService.modifyMemo(id, memo, mockedUser);

    // then
    expect(newToDo.toDoInfo).toEqual(toDo);
  });
});
