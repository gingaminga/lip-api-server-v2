import AddToDoResponseDTO from "@dto/responses/to-do/add-to-do.response.dto";
import CheckToDoResponseDTO from "@dto/responses/to-do/check-to-do.response.dto";
import GetToDoResponseDTO from "@dto/responses/to-do/get-to-do.response.dto";
import ModifyContentResponseDTO from "@dto/responses/to-do/modify-content.response.dto";
import RemoveToDoResponseDTO from "@dto/responses/to-do/remove-to-do.response.dto";
import ToDo from "@my-rdb/entities/to-do.entity";
import User from "@my-rdb/entities/user.entity";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import INVERSIFY_TYPES from "@utils/invesify-type";
import { inject, injectable } from "inversify";

export interface IToDoService {
  add(content: string, date: string, userInfo: User): Promise<AddToDoResponseDTO>;
  get(startDate: string, endDate: string, userInfo: User): Promise<GetToDoResponseDTO>;
  modifyContent(id: number, content: string, userInfo: User): Promise<ModifyContentResponseDTO>;
  remove(id: number, userInfo: User): Promise<RemoveToDoResponseDTO>;
  yn(toDoID: number, isChecked: boolean, userInfo: User): Promise<CheckToDoResponseDTO>;
}

@injectable()
export class ToDoService implements IToDoService {
  private toDoRepository;

  constructor(@inject(INVERSIFY_TYPES.ToDoRepository) toDoRepository: typeof ToDoRepository) {
    this.toDoRepository = toDoRepository;
  }

  /**
   * @description 할 일 추가하기
   * @param content 내용
   * @param date 날짜
   * @param userInfo 유저 정보
   */
  async add(content: string, date: string, userInfo: User) {
    const toDo = new ToDo();
    toDo.content = content;
    toDo.date = date;
    toDo.user = userInfo;

    const newToDo = await this.toDoRepository.save(toDo, {
      transaction: false,
    });

    const dto = new AddToDoResponseDTO(newToDo);

    return dto;
  }

  /**
   * @description 할 일 가져오기
   * @param startDate 시작 날짜
   * @param endDate 끝 날짜
   * @param userInfo 유저 정보
   */
  async get(startDate: string, endDate: string, userInfo: User) {
    const toDos = await this.toDoRepository.getToDo(startDate, endDate, userInfo.id, {
      user: false,
    });

    const dto = new GetToDoResponseDTO(toDos);

    return dto;
  }

  /**
   * @description 할 일 수정하기
   * @param toDoID
   * @param content 내용
   * @param userInfo 유저 정보
   */
  async modifyContent(toDoID: number, content: string, userInfo: User) {
    await this.toDoRepository.modifyContent(toDoID, content, userInfo.id);

    const todo = await this.toDoRepository.findOneByOrFail({
      id: toDoID,
      user: {
        id: userInfo.id,
      },
    });

    const dto = new ModifyContentResponseDTO(todo);

    return dto;
  }

  /**
   * @description 할 일 삭제하기
   * @param toDoID
   * @param userInfo 유저 정보
   */
  async remove(toDoID: number, userInfo: User) {
    const isSuccess = await this.toDoRepository.remove(toDoID, userInfo.id);
    const removeId = isSuccess ? toDoID : -1;

    const dto = new RemoveToDoResponseDTO(removeId);

    return dto;
  }

  /**
   * @description 할 일 완료 여부 처리하기
   * @param toDoID
   * @param isChecked 완료 여부
   * @param userInfo 유저 정보
   */
  async yn(toDoID: number, isChecked: boolean, userInfo: User) {
    await this.toDoRepository.modifyChecked(toDoID, isChecked, userInfo.id);

    const todo = await this.toDoRepository.findOneByOrFail({
      id: toDoID,
      user: {
        id: userInfo.id,
      },
    });

    const dto = new CheckToDoResponseDTO(todo);

    return dto;
  }
}
