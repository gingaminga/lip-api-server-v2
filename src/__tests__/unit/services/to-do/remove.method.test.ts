import RemoveToDoResponseDTO from "@dto/responses/to-do/remove-to-do.response.dto";
import User from "@my-rdb/entities/user.entity";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { ToDoService } from "@services/to-do.service";

jest.mock("@my-rdb/repositories/to-do.repository");
const mockedToDoRepository = jest.mocked(ToDoRepository);

describe(`[ToDo service] remove method test :)`, () => {
  const toDoService = new ToDoService(mockedToDoRepository);
  const id = 1;
  const mockedUser = new User();
  mockedUser.id = 1;
  mockedUser.email = "test@test.com";
  mockedUser.nickname = "test";
  mockedUser.createdAt = new Date();
  mockedUser.socialKey = "test-1234";
  mockedUser.socialType = "kakao";

  it(`should be error by modifyContent method of toDoRepository.`, async () => {
    // given
    const error = new Error("Remove error..");
    mockedToDoRepository.remove.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await toDoService.remove(id, mockedUser);
    }).rejects.toThrow(error);
  });

  it(`should be return todo array.`, async () => {
    // given
    const dto = new RemoveToDoResponseDTO(id);
    mockedToDoRepository.remove.mockResolvedValue(true);

    // when
    const result = await toDoService.remove(id, mockedUser);

    // then
    expect(result).toEqual(dto);
  });
});
